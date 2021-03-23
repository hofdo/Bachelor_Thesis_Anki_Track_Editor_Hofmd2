import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-te-right-sidebar-content',
  templateUrl: './te-right-sidebar-content.component.html',
  styleUrls: ['./te-right-sidebar-content.component.css']
})
export class TeRightSidebarContentComponent {

  constructor(public dialog: MatDialog) {
  }

  defaultElevation = 2;
  items = Array.from({length: 40}).map((_, i) => `Item #${i}`);

  openDialog() {
    const dialogRef = this.dialog.open(TrackEditorRightSidebarDialog, {
      //width: '20%',
      panelClass: 'te-right-sidebar-dialog-custom'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'te-right-sidebar-content-dialog',
  templateUrl: 'te-right-sidebar-dialog.html'
})
export class TrackEditorRightSidebarDialog {

}
