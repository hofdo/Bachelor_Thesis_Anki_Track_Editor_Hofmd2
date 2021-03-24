import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-te-right-sidebar-content',
  templateUrl: './te-right-sidebar-content.component.html',
  styleUrls: ['./te-right-sidebar-content.component.css']
})
export class TeRightSidebarContentComponent {

  constructor(public dialog: MatDialog) {
  }

  defaultElevation = 2;
  items: {id: number, name: string, url: string}[] = [
    {"id": 0, "name": "Straight Track Piece", "url": "assets/directory/Straight_Template.png"},
    {"id": 1, "name": "Curve Track Piece", "url": "assets/directory/Curve_Template.png"},
    {"id": 1, "name": "Intersection Track Piece", "url": "assets/directory/Intersection_2.png"}
    ];
  //items: string[] = ['assets/directory/Straight_Template.png', 'assets/directory/Curve_Template.png', 'assets/directory/Intersection_2.png']
  //items = Array.from({length: 3}).map((_, i) => `Item #${i}`);

  openDialog(data) {
    const dialogRef = this.dialog.open(TrackEditorRightSidebarDialog, {
      width: '40%',
      panelClass: 'te-right-sidebar-dialog-custom',
      data: {name: data.name, url: data.url}
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, url: string}) { }

}
