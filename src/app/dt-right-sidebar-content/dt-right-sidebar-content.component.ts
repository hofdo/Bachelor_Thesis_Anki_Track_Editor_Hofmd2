import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dt-right-sidebar-content',
  templateUrl: './dt-right-sidebar-content.component.html',
  styleUrls: ['./dt-right-sidebar-content.component.css']
})
export class DtRightSidebarContentComponent{

  constructor(
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    public _bottomSheet: MatBottomSheet
    ){
  }

  defaultElevation = 2;
  items = Array.from({length: 40}).map((_, i) => `Item #${i}`);

  openBottomSheet(): void {
    this._bottomSheet.open(DigitalTwinRightSidebarConsole, {
      panelClass: "dt-bottom-sheet-console"
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DigitalTwinRightSidebarDialog, {
      width: '30%',
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

@Component({
  selector: 'dt-right-sidebar-console',
  templateUrl: 'dt-right-sidebar-console.html',
})
export class DigitalTwinRightSidebarConsole {}


