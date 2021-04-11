import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SideNavRightService} from '../services/side-nav-right.service';
import {SideNavLeftService} from '../services/side-nav-left.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DisplayGrid, GridsterConfig, GridsterItem, GridsterItemComponentInterface, GridType} from 'angular-gridster2';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GridItem} from '../model/grid-item';
import {FileSaverService} from 'ngx-filesaver';
import {ExportService} from '../services/export.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-track-editor',
  templateUrl: './track-editor.component.html',
  styleUrls: ['./track-editor.component.css']
})
export class TrackEditorComponent implements AfterViewInit, OnInit {
  @ViewChild('sidenav_right') public sidenav_right: MatSidenav;
  @ViewChild('sidenav_left') public sidenav_left: MatSidenav;

  options: GridsterConfig;
  maxCols: number = 5; //default
  maxRows: number = 5; //default
  exportImage;
  exportImageFormat;
  public grid_items: { item: GridsterItem, type: string, url: string, id: number }[] = [];
  grid_item_export: Array<GridItem> = [];
  id_counter: number = 1;

  constructor(public sidenavServiceRight: SideNavRightService,
              public sideNavServiceLeft: SideNavLeftService,
              public dialog: MatDialog,
              public exportService: ExportService,
              public fileSaverService: FileSaverService,
              public snackBar: MatSnackBar) {
  }

  ngAfterViewInit() {
    this.sidenavServiceRight.setSidenav(this.sidenav_right);
    this.sideNavServiceLeft.setSidenav(this.sidenav_left);
  }

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fixed,
      displayGrid: DisplayGrid.Always,
      itemInitCallback: this.itemInit,
      margin: 2,
      outerMarginBottom: 4,
      outerMarginTop: 4,
      outerMarginLeft: 4,
      outerMarginRight: 4,
      pushItems: false,
      maxCols: this.maxCols,
      maxRows: this.maxRows,
      swap: true,
      swapWhileDragging: false,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: false
      }
    };
  }

  itemInit(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
    // tslint:disable-next-line:no-console
    console.info('itemInitialized', item.id);
    console.info('itemInitialized', item.degree);
    //Todo Workaround
    document.getElementById('gridster-item-image' + item.id).style.transform = `rotate(${item.degree}deg)`;
  }

  addItem(event): void {
    let url = 'http://localhost:8080/image?type=' + event;
    this.grid_items.push({
      'item': {x: 0, y: 0, cols: 1, rows: 1, id: this.id_counter, degree: 0},
      'type': event,
      'url': url,
      'id': this.id_counter
    });
    this.id_counter++;
  }

  rotateItem(id, degree) {
    let item;
    console.log(id);
    item = this.grid_items.find(i => i.id === id);
    item.item.degree += degree;
    if (item.item.degree >= 360) {
      item.item.degree = 0;
    }
    //ToDo Workaround --> sth ngClass*
    document.getElementById('gridster-item-image' + id).style.transform = `rotate(${item.item.degree}deg)`;
  }

  removeItem($event: MouseEvent | TouchEvent, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.grid_items.splice(this.grid_items.indexOf(item), 1);
  }

  openDialogSettings() {
    const dialogRef = this.dialog.open(TrackEditorSettingsContentDialog, {
      panelClass: 'te-settings-dialog-custom',
      data: {maxRows: this.maxRows, maxCols: this.maxCols}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.options.maxRows = result.maxRows;
      this.options.maxCols = result.maxCols;
      this.options.api.optionsChanged();
    });
  }

  openDialogExport() {
    const dialogRef = this.dialog.open(TrackEditorExportContentDialog, {
        panelClass: 'te-export-dialog-custom',
      }
    );

    dialogRef.afterClosed().subscribe(form => {
      console.log(form.get('format').value);
      let format = form.get('format').value;
      let fileFormat = form.get('fileFormat').value;
      switch (format) {
        case 'multi':
          //Export each grid tile as a single image
          if (this.grid_items.length !== 0) {
            this.grid_items.forEach(value => {
              this.exportService.exportEach(value.type).subscribe(data => {
                this.fileSaverService.save(data, value.type + '.' + fileFormat);
              });
            });
          } else {
            this.snackBar.open('Export failed! No track pieces detected.', null, {
              duration: 2000
            });
          }
          break;
        case 'single':
          //Export the whole track as one image
          if (this.grid_items.length !== 0) {
            this.grid_items.forEach((value, index) => {
              let grid_item: GridItem = new GridItem(value.type, value.url, value.id, value.item.degree, value.item.x, value.item.y, value.item.cols, value.item.rows);
              this.grid_item_export.push(grid_item);
            });
            this.exportService.exportSingle(this.grid_item_export, this.options, fileFormat).subscribe(data => {
              this.fileSaverService.save(data, 'test.' + fileFormat);
              this.grid_item_export.splice(0, this.grid_item_export.length);
            });
          } else {
            this.snackBar.open('Export failed! No track pieces detected.', null, {
              duration: 2000
            });
          }
          break;
        case 'conf':
          this.exportService.exportAsJSON(this.grid_items);
          break;
      }
    });
  }

  openDialogImport() {
    const dialogRef = this.dialog.open(TrackEditorImportContentDialog, {
      panelClass: 'te-import-dialog-custom'
    });

    //Importing the grid items
    dialogRef.afterClosed().subscribe(_import => {
      this.grid_items.splice(0, this.grid_items.length);
      let imported_grid_items = JSON.parse(_import);
      this.id_counter = Math.max.apply(Math, imported_grid_items.map(v => {
        return v.item.id;
      })) + 1;
      console.log(this.id_counter);
      imported_grid_items.forEach(v => {
        this.grid_items.push(v);
      });
    });
  }
}

@Component({
  selector: 'settings-content-dialog',
  templateUrl: 'te-settings-content-dialog.html',
})
export class TrackEditorSettingsContentDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    maxRows: number,
    maxCols: number
  }) {
  }
}

@Component({
  selector: 'import-content-dialog',
  templateUrl: 'te-import-content-dialog.html',
})
export class TrackEditorImportContentDialog {
  fileContent = '';
  fileName = '';

  constructor() {
  }

  onFileSelected(event) {

    let fileReader = new FileReader();
    const file: File = event.target.files[0];
    this.fileName = file.name;

    if (file) {
      fileReader.onload = ev => {
        this.fileContent = ev.target.result.toString();
        console.log(this.fileContent);
      };
      fileReader.readAsText(file);
    }
  }

}

@Component({
  selector: 'export-content-dialog',
  templateUrl: 'te-export-content-dialog.html',
})
export class TrackEditorExportContentDialog implements OnInit {
  form: FormGroup;
  form_2: FormGroup;

  constructor(public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      'format': ['', Validators.required],
      'fileFormat': ['', Validators.required],
    });
  }
}
