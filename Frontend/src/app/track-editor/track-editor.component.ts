/**
 *
 * The MIT License

 Copyright (c) 2010-2021 Google LLC. http://angular.io/license

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import {AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SideNavRightService} from '../services/side-nav-right.service';
import {SideNavLeftService} from '../services/side-nav-left.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';
import {FileSaverService} from 'ngx-filesaver';
import {ExportService} from '../services/export.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CookieService} from 'ngx-cookie-service';
import {Router, UrlSerializer} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

/**
 * Main Component for the Track Editor
 * Here is the logic and the functions used in the track editor
 */

@Component({
  selector: 'app-track-editor',
  templateUrl: './track-editor.component.html',
  styleUrls: ['./track-editor.component.css']
})
export class TrackEditorComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('sidenav_right') public sidenav_right: MatSidenav;
  @ViewChild('sidenav_left') public sidenav_left: MatSidenav;

  options: GridsterConfig;
  maxCols: number = 5; //default
  maxRows: number = 5; //default
  exportImage;
  exportImageFormat;
  interval;
  public grid_items: { item: GridsterItem, type: string, url: string, id: number }[] = [];
  id_counter: number = 1;

  /**
   *
   * @param sidenavServiceRight: Service for the right Sidenav
   * @param sideNavServiceLeft: Service for the left Sidenav
   * @param dialog: Dialog Element for the dialog windows
   * @param exportService: Export service for the communication via a REST-API
   * @param fileSaverService: Service for saving files on the client side
   * @param snackBar: Snackbar element
   * @param cookieService: Cookie service for saving data in cookies
   * @param router
   * @param serializer
   */
  constructor(public sidenavServiceRight: SideNavRightService,
              public sideNavServiceLeft: SideNavLeftService,
              public dialog: MatDialog,
              public exportService: ExportService,
              public fileSaverService: FileSaverService,
              public snackBar: MatSnackBar,
              public cookieService: CookieService,
              public router: Router,
              public serializer: UrlSerializer) {


    /**
     * Getting the last Track vom the LocalStorage so that it can be shown to the user when he opens the web interface
      */
    if (localStorage.getItem("dt_grid_list") !== null){
      this.grid_items = JSON.parse(localStorage.getItem('dt_grid_list'));
      this.id_counter = Math.max.apply(Math, this.grid_items.map(v => {
        return v.item.id;
      })) + 1;
      if (!isFinite(this.id_counter)) {
        this.id_counter = 1;
      }
    }
  }

  /**
   * Here the Sidenav elements are passed to the services
   */
  ngAfterViewInit() {
    this.sidenavServiceRight.setSidenav(this.sidenav_right);
    this.sideNavServiceLeft.setSidenav(this.sidenav_left);
  }

  /**
   * Here the parameters of the configuration for the grid system are defined and transferred
   */
  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fixed,
      displayGrid: DisplayGrid.Always,
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

  /**
   * When the user leaves the track-editor the last state of the track is saved
   * Also all the intervals are cleared
   */
  ngOnDestroy() {
    localStorage.setItem("dt_grid_list", JSON.stringify(this.grid_items))
    clearInterval(this.interval);
  }

  /**
   * This function adds a track piece to the grid system as a grid item
   * @param event In this parameter the data from the click-event is passed on and has the information needed to create the track piece
   */
  addItem(event): void {
    //ToDo replace with env-var
    console.log(event);
    let param
    let item
    //let url = 'http://localhost:8081/image?type=straight&lanes=16&track_id=0';
    switch (event.type) {
      case 'straight':
        param = new HttpParams().set("type", "straight")
          .set("lanes", event.lanes)
          .set("track_id", event.track_id);
        item = {x: 0, y: 0, cols: 1, rows: 1, id: this.id_counter, degree: 0, lanes: event.lanes, track_id: event.track_id}
        break;
      case 'curve':
        param = new HttpParams().set("type", "curve")
          .set("lanes", event.lanes)
          .set("track_id", event.track_id);
        item = {x: 0, y: 0, cols: 1, rows: 1, id: this.id_counter, degree: 0, lanes: event.lanes, track_id: event.track_id}
        break;
      case 'intersection':
        param = new HttpParams().set("type", "intersection")
          .set("lanes", event.lanes);
        item = {x: 0, y: 0, cols: 1, rows: 1, id: this.id_counter, degree: 0, lanes: event.lanes}
        break;
      case "junction":
        param = new HttpParams().set("type", "junction")
          .set("lanes", event.lanes)
          .set("track_id", event.track_id)
          .set("left", event.left)
          .set("right", event.right);
        item = {x: 0, y: 0, cols: 1, rows: 1, id: this.id_counter, degree: 0, lanes: event.lanes, track_id: event.track_id, left: event.left, right: event.right}
        break;
    }
    let url = 'http://'+ environment.Rest.server +':' + environment.Rest.port.toString() + '/image?' + param.toString();
    this.grid_items.push({
      'item': item,
      'type': event.type,
      'url': url,
      'id': this.id_counter
    });
    this.id_counter++;
  }

  /**
   * In this function the grid-item with the track piece will rotated by 90 degree
   * @param event In this parameter the data from the click-event is passed on and has the information to rotate the grid-element
   */
  rotateItem(event) {
    let id = event.id;
    let state = event.degree;
    this.grid_items.map(value => {
      if (value.id === id) {
        value.item.degree = state;
        console.log(state)
        console.log(value.item.degree)
      }
    });

  }

  /**
   * This function removes a grid-element from the grid-system
   * @param event In this parameter the data from the click-event is passed on and has the information to delete the grid-element
   */
  removeItem(event) {
    event.event.preventDefault();
    event.event.stopPropagation();
    this.grid_items.splice(this.grid_items.indexOf(event.item), 1);
  }

  /**
   * This function removes the empty grid-elements before the track can be exported as a picture
   * Otherwise the empty grid-elements would also be visible on the exported picture
   * @param rows The current amount of rows in the grid-system
   * @param cols The current amount of columns in the grid-system
   * @param grid_list The list with all the grid-elements that currently are in the grid-system
   */
  removeEmptyGrids(rows, cols, grid_list) {
    let removeCounter_x = 0;
    let removeCounter_y = 0;

    //Remove Empty Cells
    for (let x = 0; x < rows; x++) {
      if (grid_list.some(value => {
        return value.item.x === x;
      })) {
        break;
      } else {
        removeCounter_x++;
      }
    }
    for (let y = 0; y < cols; y++) {
      if (grid_list.some(value => {
        return value.item.y === y;
      })) {
        break;
      } else {
        removeCounter_y++;
      }
    }
    grid_list.map(value => {
      value.item.x -= removeCounter_x;
      value.item.y -= removeCounter_y;
    });
    rows = Math.max.apply(Math, grid_list.map(value => {
      return value.item.x;
    })) + 1;
    cols = Math.max.apply(Math, grid_list.map(value => {
      return value.item.y;
    })) + 1;

    return {
      rows: rows,
      cols: cols,
      list: grid_list
    };
  }


  /**
   * This function opens the dialog window to change the settings and saves the data after the window is closed
   */
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

  /**
   * This function opens the dialog window to export the track
   * It also calls the export-service depending on the choices that were made during the selection
   * and delivers the data from the export-service back, by allowing the user to download it.
   */
  openDialogExport() {
    const dialogRef = this.dialog.open(TrackEditorExportContentDialog, {
        panelClass: 'te-export-dialog-custom',
      }
    );

    dialogRef.afterClosed().subscribe(form => {
      let format = form.get('format').value;
      let fileFormat = form.get('fileFormat').value;
      switch (format) {
        case 'multi':
          //Export each grid tile as a single image
          if (this.grid_items.length !== 0) {

            this.grid_items.forEach(value => {
              let snackbarRef = this.snackBar.openFromComponent(TrackEditorSnackBar, {
                panelClass: "te-snackbar-loading",
                verticalPosition: 'bottom',
                horizontalPosition: 'start'
              })
              this.exportService.exportEach(value.type, value.item.lanes, value.item.track_id, value.item.left, value.item.right).subscribe(data => {
                this.fileSaverService.save(data, value.type + '.' + fileFormat);
                snackbarRef.dismiss()
              });
            });
          } else {
            this.snackBar.open('Export failed! No track pieces detected.', null, {
              duration: 2000
            });
          }
          break;
        case 'single':
          let rows = this.maxRows;
          let cols = this.maxCols;

          //Export the whole track as one image
          if (this.grid_items.length !== 0) {
            let snackbarRef = this.snackBar.openFromComponent(TrackEditorSnackBar, {
              panelClass: "te-snackbar-loading",
              verticalPosition: 'bottom',
              horizontalPosition: 'start'
            })
            let res = this.removeEmptyGrids(rows, cols, this.grid_items);
            rows = res.rows;
            cols = res.cols;
            this.grid_items = res.list;
            this.cookieService.set('grid_options', JSON.stringify({
              rows: rows,
              cols: cols
            }));
            this.exportService.exportSingle(this.grid_items, rows, cols, fileFormat).subscribe(data => {
              this.fileSaverService.save(data, 'test.' + fileFormat);
              snackbarRef.dismiss()
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

  /**
   * This function opens the dialog window to import a configuration-file
   * The function then opens the file and extracts the information of the track that should be imported
   * It also injects the data into the grid-system
   */
  openDialogImport() {
    const dialogRef = this.dialog.open(TrackEditorImportContentDialog, {
      panelClass: 'te-import-dialog-custom'
    });

    dialogRef.disableClose = true

    //Importing the grid items
    dialogRef.afterClosed().subscribe(_import => {
      if (_import.value) {
      this.grid_items.splice(0, this.grid_items.length);
      let imported_grid_items = JSON.parse(_import.file);
      this.id_counter = Math.max.apply(Math, imported_grid_items.map(v => {
        return v.item.id;
      })) + 1;
      imported_grid_items.forEach(v => {
        this.grid_items.push(v);
      });
    }
    });
  }

  /**
   * Guard implemented to ask the user if he wishes to transport the current track to the digital twin view or not
   */
  async canDeactivate() {
    if (this.grid_items.length > 0) {
      const dialogRef = this.dialog.open(TrackEditorLeaveSiteDialog, {
        panelClass: 'te-leave-site-dialog-custom'
      });
      dialogRef.disableClose = true
      const resp = await dialogRef.afterClosed().toPromise();
      if (resp) {
        localStorage.setItem('dt_grid_list', JSON.stringify(this.grid_items));
        let rows = this.maxRows;
        let cols = this.maxCols;
        let res = this.removeEmptyGrids(rows, cols, this.grid_items);
        rows = res.rows;
        cols = res.cols;
        this.cookieService.set('grid_options', JSON.stringify({
          rows: rows,
          cols: cols
        }));
      } else {
        localStorage.removeItem('dt_grid_list');
      }
      return true;
    } else {
      return true;
    }

  }

  /**
   * This function resets the grid and deletes all the grid-elements
   */
  resetGrid() {
    this.grid_items = [];
    this.id_counter = 1;
  }
}

/**
 * Component for the Setting Dialog Window
 */
@Component({
  selector: 'settings-content-dialog',
  templateUrl: 'dialog/te-settings-content-dialog.html',
})
export class TrackEditorSettingsContentDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    maxRows: number,
    maxCols: number
  }) {
  }
}

/**
 * Component for the Import Dialog Window
 */
@Component({
  selector: 'import-content-dialog',
  templateUrl: 'dialog/te-import-content-dialog.html',
})
export class TrackEditorImportContentDialog {
  fileContent = '';
  fileName = '';
  is_file_valid = false

  constructor() {
  }

  onFileSelected(event) {
    let fileReader = new FileReader();
    const file: File = event.target.files[0];
    this.fileName = file.name;

    if (file) {
      this.is_file_valid = true
      fileReader.onload = ev => {
        this.fileContent = ev.target.result.toString();
      };
      fileReader.readAsText(file);
    }
    else {
      this.is_file_valid = false
    }
  }

}

/**
 * Component for the Export Dialog Window
 */
@Component({
  selector: 'export-content-dialog',
  templateUrl: 'dialog/te-export-content-dialog.html',
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

/**
 * Component for the Leave Site Dialog Window
 */

@Component({
  selector: 'leave-site-dialog',
  templateUrl: 'dialog/te-leave-site-dialog.html',
})
export class TrackEditorLeaveSiteDialog implements OnInit {
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

/**
 * Component for the Loading Snackbar
 */

@Component({
  selector: 'te-loading-snackbar',
  templateUrl: 'dialog/te-loading-snackbar.html',
})
export class TrackEditorSnackBar {

}
