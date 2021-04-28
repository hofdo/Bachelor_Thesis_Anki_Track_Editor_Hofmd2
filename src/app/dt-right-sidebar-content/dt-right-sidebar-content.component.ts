import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Car} from '../model/car';
import {BehaviorSubject, Subscription} from 'rxjs';
import {DtCarListSharingService} from '../services/dt-car-list-sharing.service';

@Component({
  selector: 'app-dt-right-sidebar-content',
  templateUrl: './dt-right-sidebar-content.component.html',
  styleUrls: ['./dt-right-sidebar-content.component.css']
})
export class DtRightSidebarContentComponent implements OnInit, OnDestroy{

  cars: Car[] = []
  car_ids: String[] = []
  subscription: Subscription;
  observable = new BehaviorSubject<String[]>([])

  constructor(
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    public _bottomSheet: MatBottomSheet,
    public dataService: DtCarListSharingService
    ){
  }

  defaultElevation = 2;

  ngOnInit(): void {
    this.subscription = this.dataService.currentMessage.subscribe(message => {
      this.cars = message.get("car_list")
      this.car_ids = message.get("car_ids")

      this.observable.next(this.car_ids)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

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

  openDialog(car) {
    const dialogRef = this.dialog.open(DigitalTwinRightSidebarDialog, {
      width: '30%',
      panelClass: 'dt-right-sidebar-dialog-custom',
      data: car
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
export class DigitalTwinRightSidebarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public car:Car) {

  }
}

@Component({
  selector: 'dt-right-sidebar-console',
  templateUrl: 'dt-right-sidebar-console.html',
})
export class DigitalTwinRightSidebarConsole {}


