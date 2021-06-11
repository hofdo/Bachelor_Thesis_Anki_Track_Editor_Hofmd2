import {Component, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-te-right-sidebar-content',
  templateUrl: './te-right-sidebar-content.component.html',
  styleUrls: ['./te-right-sidebar-content.component.css']
})
export class TeRightSidebarContentComponent {

  @Output() button_clicked = new EventEmitter<string>();

  constructor(public dialog: MatDialog) {
  }

  defaultElevation = 2;
  //TODO Workaround List
  items: {type: string, iconURL: string, iconName: String, track_id: string, lanes: string, left: string, right: string}[] = [
    {"type": "straight", "iconURL": "http://localhost:8081/image?type=straight&lanes=16&track_id=0", iconName: "Straight Track Piece", track_id: "0", lanes: "0", left: "0", right: "0"},
    {"type": "curve", "iconURL": "http://localhost:8081/image?type=curve&lanes=16&track_id=0", iconName: "Curve Track Piece", track_id: "0", lanes: "0", left: "0", right: "0"},
    {"type": "intersection", "iconURL": "http://localhost:8081/image?type=intersection&lanes=16", iconName: "Intersection Track Piece", track_id: "0", lanes: "0", left: "0", right: "0"},
    {"type": "junction", "iconURL": "http://localhost:8081/image?type=junction&lanes=16&track_id=0&left=8&right=8", iconName: "Junction Track Piece", track_id: "0", lanes: "0", left: "0", right: "0"}
    ];

  openDialog(data) {
    const dialogRef = this.dialog.open(TrackEditorRightSidebarDialog, {
      width: '40%',
      panelClass: 'te-right-sidebar-dialog-custom',
      data: {name: data.iconName, url: data.iconURL, type: data.type}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addTrackPiece(result);
    });
  }

  addTrackPiece(type){
   this.button_clicked.emit(type)
  }

}

@Component({
  selector: 'te-right-sidebar-content-dialog',
  templateUrl: '../dialog/te-right-sidebar-dialog.html'
})
export class TrackEditorRightSidebarDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, url: string, type: string}) { }



}
