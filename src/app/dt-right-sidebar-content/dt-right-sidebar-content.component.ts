import { Component, OnInit } from '@angular/core';
import {DigitalTwinSettingsContentDialog} from '../digital-twin/digital-twin.component';
import {MatDialog} from '@angular/material/dialog';
import {TrackEditorRightSidebarDialog} from '../te-right-sidebar-content/te-right-sidebar-content.component';

@Component({
  selector: 'app-dt-right-sidebar-content',
  templateUrl: './dt-right-sidebar-content.component.html',
  styleUrls: ['./dt-right-sidebar-content.component.css']
})
export class DtRightSidebarContentComponent{

  constructor(public dialog: MatDialog) {
  }

  defaultElevation = 2;
  items = Array.from({length: 40}).map((_, i) => `Item #${i}`);

  openDialog() {
    const dialogRef = this.dialog.open(DigitalTwinRightSidebarDialog, {
      //width: '20%',
      panelClass: 'dt-right-sidebar-dialog-custom'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dt-right-sidebar-content-dialog',
  templateUrl: 'dt-right-sidebar-dialog.html',
})
export class DigitalTwinRightSidebarDialog {}
