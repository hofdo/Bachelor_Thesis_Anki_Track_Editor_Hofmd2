import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SideNavRightService} from '../services/side-nav-right.service';
import {SideNavLeftService} from '../services/side-nav-left.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';
import {TeRightSidebarContentComponent} from '../te-right-sidebar-content/te-right-sidebar-content.component';
import {FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GridItem} from '../model/grid-item';

@Component({
  selector: 'app-track-editor',
  templateUrl: './track-editor.component.html',
  styleUrls: ['./track-editor.component.css']
})
export class TrackEditorComponent implements AfterViewInit, OnInit{
  @ViewChild('sidenav_right') public sidenav_right: MatSidenav;
  @ViewChild('sidenav_left') public sidenav_left: MatSidenav;

  options: GridsterConfig;
  maxCols: number = 5; //default
  maxRows: number = 5; //default
  grid_items: {item: GridsterItem, type: string, url: string, id: number, degree: number}[] = [];
  grid_item_list: Array<GridItem> = []
  id_counter: number = 1

  constructor(public sidenavServiceRight: SideNavRightService,
              public sideNavServiceLeft: SideNavLeftService,
              public dialog: MatDialog,
              public httpClient: HttpClient) {}

  ngAfterViewInit(){
    this.sidenavServiceRight.setSidenav(this.sidenav_right);
    this.sideNavServiceLeft.setSidenav(this.sidenav_left);
  }

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

  addItem(event): void {
    let url = ""
    console.log(event)
    switch (event){
      case "add_straight":
        //url = "assets/directory/Straight_Template.png"
        url = "http://localhost:8080/image?type=straight"
        break;
      case "add_curve":
        url = "http://localhost:8080/image?type=curve"
        break;
      case "add_intersection":
        url = "http://localhost:8080/image?type=intersection"
        break;
    }
    this.grid_items.push({"item": {x: 0, y: 0, cols: 1, rows: 1, id: this.grid_items.length}, "type": event, "url": url, "id": this.id_counter, "degree": 0})
    this.id_counter++
  }

  rotateItem(id){
    let item
    console.log(id)
    item = this.grid_items.find(i => i.id === id)
    item.degree += 90
    if (item.degree >= 360){
      item.degree = 0
    }
    console.log("cols: " + item.item.cols)
    console.log("rows: " + item.item.rows)
    console.log("x: " + item.item.x)
    console.log("y: " + item.item.y)
    document.getElementById('gridster-item-image' + id).style.transform = `rotate(${item.degree}deg)`;
  }

  removeItem($event: MouseEvent | TouchEvent, item){
    $event.preventDefault();
    $event.stopPropagation();
    this.grid_items.splice(this.grid_items.indexOf(item), 1)
  }

  openDialog() {
    const dialogRef = this.dialog.open(TrackEditorSettingsContentDialog, {
      data: {maxRows: this.maxRows, maxCols: this.maxCols}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.options.maxRows = result.maxRows;
      this.options.maxCols = result.maxCols;
      this.options.api.optionsChanged();
    });
  }

  exportAsSingle() {
    let counter: number
    this.grid_items.forEach((value, index) => {
      let grid_item: GridItem = new GridItem(value.type, value.url, value.id, value.degree, value.item.x, value.item.y, value.item.cols, value.item.rows)
      this.grid_item_list.push(grid_item)
      console.log(counter++)
    })
    this.httpClient.post("http://localhost:8080/export", this.grid_item_list,{
      'responseType': 'text',
      'params': new HttpParams().set("maxRows", this.options.maxRows.toString()).set("maxCols", this.options.maxCols.toString()),
      'headers': new HttpHeaders().set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
        .set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    }).subscribe(data => {
      console.log(data)
      this.grid_item_list.splice(0,this.grid_item_list.length)
    })
  }
}

@Component({
  selector: 'settings-content-dialog',
  templateUrl: 'te-settings-content-dialog.html',
})
export class TrackEditorSettingsContentDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {maxRows: number, maxCols: number}) { }
}
