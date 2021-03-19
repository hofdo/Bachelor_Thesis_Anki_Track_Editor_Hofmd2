import { Component, OnInit } from '@angular/core';
import {DigitalTwinSettingsContentDialog} from '../digital-twin/digital-twin.component';
import {MatDialog} from '@angular/material/dialog';

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
    const dialogRef = this.dialog.open(DigitalTwinRightSidebarDialog);

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
