import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {TrackEditorComponent} from '../track-editor/track-editor.component';
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
  items: {id: number, name: string, url: string, type: string}[] = [
    {"id": 0, "name": "Straight Track Piece", "url": "http://localhost:8081/image?type=straight", "type": "straight"},
    {"id": 1, "name": "Curve Track Piece", "url": "http://localhost:8081/image?type=curve", "type": "curve"},
    {"id": 2, "name": "Intersection Track Piece", "url": "http://localhost:8081/image?type=intersection", "type": "intersection"}
    ];

  openDialog(data) {
    const dialogRef = this.dialog.open(TrackEditorRightSidebarDialog, {
      width: '40%',
      panelClass: 'te-right-sidebar-dialog-custom',
      data: {name: data.name, url: data.url, type: data.type}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addTrackPiece(result.type);
    });
  }

  addTrackPiece(type){
   this.button_clicked.emit(type)
  }

}

@Component({
  selector: 'te-right-sidebar-content-dialog',
  templateUrl: 'te-right-sidebar-dialog.html'
})
export class TrackEditorRightSidebarDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, url: string, type: string}) { }



}
