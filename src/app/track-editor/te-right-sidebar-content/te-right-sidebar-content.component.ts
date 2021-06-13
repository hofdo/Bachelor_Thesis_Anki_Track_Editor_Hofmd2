import {Component, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import {environment} from '../../../environments/environment';

/**
 * This is the component for the content of the right sidebar of the Track Editor
 */

@Component({
  selector: 'app-te-right-sidebar-content',
  templateUrl: './te-right-sidebar-content.component.html',
  styleUrls: ['./te-right-sidebar-content.component.css']
})
export class TeRightSidebarContentComponent {

  //Eventemitter to the parent component
  @Output() button_clicked = new EventEmitter<string>();

  /**
   * @param dialog: MatDialog
   */
  constructor(public dialog: MatDialog) {
  }

  defaultElevation = 2;
  //List of all the track pieces with the necessary information to display them
  items: {type: string, iconURL: string, iconName: String, track_id: string, lanes: string, left: string, right: string}[] = [
    {"type": "straight", "iconURL": "http://"+environment.Rest.server+":"+environment.Rest.port.toString()+"/image?type=straight&lanes=16&track_id=0", iconName: "Straight Track Piece", track_id: "0", lanes: "0", left: "0", right: "0"},
    {"type": "curve", "iconURL": "http://"+environment.Rest.server+":"+environment.Rest.port.toString()+"/image?type=curve&lanes=16&track_id=0", iconName: "Curve Track Piece", track_id: "0", lanes: "0", left: "0", right: "0"},
    {"type": "intersection", "iconURL": "http://"+environment.Rest.server+":"+environment.Rest.port.toString()+"/image?type=intersection&lanes=16", iconName: "Intersection Track Piece", track_id: "0", lanes: "0", left: "0", right: "0"},
    {"type": "junction", "iconURL": "http://"+environment.Rest.server+":"+environment.Rest.port.toString()+"/image?type=junction&lanes=16&track_id=0&left=8&right=8", iconName: "Junction Track Piece", track_id: "0", lanes: "0", left: "0", right: "0"}
    ];

  /**
   * This function opens the dialog for the Detail Track Piece Dialog Window
   * @param data
   */
  openDialog(data) {
    //Passing the data to the Dialog Component
    const dialogRef = this.dialog.open(TrackEditorRightSidebarDialog, {
      width: '40%',
      panelClass: 'te-right-sidebar-dialog-custom',
      data: {
        name: data.iconName,
        url: data.iconURL,
        type: data.type,
        lanes: data.lanes,
        track_id: data.track_id,
        left: data.left,
        right: data.right
      }
    });

    //After closing the dialog window and pressing the add button the function is called
    dialogRef.afterClosed().subscribe(result => {
      this.addTrackPiece(result);
    });
  }

  /**
   * This function calls the eventemitter and send an event at the parent component to add a track piece to the grid-system
   * @param type
   */
  addTrackPiece(type){
   this.button_clicked.emit(type)
  }

}

/**
 * Component for the Detail Track Piece Dialog Window
 */
@Component({
  selector: 'te-right-sidebar-content-dialog',
  templateUrl: '../dialog/te-right-sidebar-dialog.html'
})
export class TrackEditorRightSidebarDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    name: string,
    url: string,
    type: string,
    lanes: string,
    track_id: string,
    left: number,
    right: number
  }) { }

}
