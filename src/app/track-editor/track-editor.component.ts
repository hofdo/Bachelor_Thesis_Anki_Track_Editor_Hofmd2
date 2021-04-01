import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SideNavRightService} from '../services/side-nav-right.service';
import {SideNavLeftService} from '../services/side-nav-left.service';
import {MatDialog} from '@angular/material/dialog';
import {DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';
import {TeRightSidebarContentComponent} from '../te-right-sidebar-content/te-right-sidebar-content.component';

@Component({
  selector: 'app-track-editor',
  templateUrl: './track-editor.component.html',
  styleUrls: ['./track-editor.component.css']
})
export class TrackEditorComponent implements AfterViewInit, OnInit{
  @ViewChild('sidenav_right') public sidenav_right: MatSidenav;
  @ViewChild('sidenav_left') public sidenav_left: MatSidenav;

  options: GridsterConfig;
  grid_items: {item: GridsterItem, type: string, url: string, id: number, degree: number}[] = [];

  constructor(public sidenavServiceRight: SideNavRightService,
              public sideNavServiceLeft: SideNavLeftService,
              public dialog: MatDialog) {

  }

  ngAfterViewInit(){
    this.sidenavServiceRight.setSidenav(this.sidenav_right);
    this.sideNavServiceLeft.setSidenav(this.sidenav_left);
  }

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fixed,
      displayGrid: DisplayGrid.Always,
      pushItems: false,
      maxCols: 6,
      maxRows: 6,
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
        url = "assets/directory/Straight_Template.png"
        break;
      case "add_curve":
        url = "assets/directory/Curve_Template.png"
        break;
      case "add_intersection":
        url = "assets/directory/Intersection_2.png"
        break;
    }
    this.grid_items.push({"item": {x: 0, y: 0, cols: 1, rows: 1, id: this.grid_items.length}, "type": event, "url": url, "id": this.grid_items.length, "degree": 0})
  }

  openDialog() {
    const dialogRef = this.dialog.open(TrackEditorSettingsContentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  rotateItem(id){
    let item = this.grid_items.find(i => i.id === id)
    item.degree += 90
    if (item.degree >= 360){
      item.degree = 0;
    }
    document.getElementById('gridster-item-image' + id).style.transform = `rotate(${item.degree}deg)`;
  }


}

@Component({
  selector: 'settings-content-dialog',
  templateUrl: 'te-settings-content-dialog.html',
})
export class TrackEditorSettingsContentDialog {}
