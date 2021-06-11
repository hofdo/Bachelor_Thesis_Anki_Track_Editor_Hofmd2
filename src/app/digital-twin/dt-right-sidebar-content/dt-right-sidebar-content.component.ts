import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Car} from '../../model/car';
import {BehaviorSubject, Subscription} from 'rxjs';
import {DtCarListSharingService} from '../../services/dt-car-list-sharing.service';

@Component({
  selector: 'app-dt-right-sidebar-content',
  templateUrl: './dt-right-sidebar-content.component.html',
  styleUrls: ['./dt-right-sidebar-content.component.css']
})
export class DtRightSidebarContentComponent implements OnInit, OnDestroy {

  @Output() console_mqtt_msg: EventEmitter<any> = new EventEmitter<any>()

  cars: Map<string, Car>;
  car_ids: String[] = [];
  subscription: Subscription;
  observable = new BehaviorSubject<String[]>([]);

  constructor(
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    public _bottomSheet: MatBottomSheet,
    public dataService: DtCarListSharingService
  ) {
  }

  defaultElevation = 2;

  ngOnInit(): void {
    this.subscription = this.dataService.currentMessage.subscribe(message => {
      if (message !== null) {
        this.cars = message.get('car_list');
        this.car_ids = message.get('car_ids');
        this.observable.next(this.car_ids);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openBottomSheet(car_id): void {
    this._bottomSheet.open(DigitalTwinRightSidebarConsole, {
      panelClass: 'dt-bottom-sheet-console',
      data: {car: car_id, cars: this.cars}
    }).afterDismissed().subscribe(data => {
      this.console_mqtt_msg.emit(data)
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
      data: {cars: this.cars, car: car}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

@Component({
  selector: 'dt-right-sidebar-content-dialog',
  templateUrl: '../dialog/dt-right-sidebar-dialog.html',
})
export class DigitalTwinRightSidebarDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cars: Map<string, Car>, car: string }) {
  }
}

@Component({
  selector: 'dt-right-sidebar-console',
  templateUrl: 'dt-right-sidebar-console.html',

})
export class DigitalTwinRightSidebarConsole {

  car: Car = this.data.cars.get(this.data.car)

  pubData = {
    speed: this.car.speed,
    acceleration: 0,
    lane: this.car.offset,
    id: this.data.car
  }

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { car: string, cars: Map<string, Car> }, private bottomSheetRef: MatBottomSheet) {
  }

  closeBottomSheet() {
    this.bottomSheetRef.dismiss(this.pubData);
  }
}


