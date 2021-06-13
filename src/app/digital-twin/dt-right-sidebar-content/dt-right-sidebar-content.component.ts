import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Car} from '../../model/car';
import {BehaviorSubject, Subscription} from 'rxjs';
import {DtCarListSharingService} from '../../services/dt-car-list-sharing.service';

/**
 * This is the component for the content of the right sidebar in the digital twin
 */
@Component({
  selector: 'app-dt-right-sidebar-content',
  templateUrl: './dt-right-sidebar-content.component.html',
  styleUrls: ['./dt-right-sidebar-content.component.css']
})
export class DtRightSidebarContentComponent implements OnInit, OnDestroy {

  //Eventemitter to the parent component
  @Output() console_mqtt_msg: EventEmitter<any> = new EventEmitter<any>()

  cars: Map<string, Car>;
  car_ids: String[] = [];
  //Subscription for the data exchange between the Digital Twin an this component
  subscription: Subscription;
  //BehaviourSubject for the data exchange between the Digital Twin an this component
  observable = new BehaviorSubject<String[]>([]);

  /**
   *
   * @param dialog: Dialog element
   * @param _snackBar: Snackbar element
   * @param _bottomSheet: Bottomsheet element for the console
   * @param dataService: Service for the data exchange between the Digital Twin and the
   */
  constructor(
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    public _bottomSheet: MatBottomSheet,
    public dataService: DtCarListSharingService
  ) {
  }

  defaultElevation = 2;

  /**
   * Subscribe to the data service for the list of cars and car_ids from the digital twin
   */
  ngOnInit(): void {
    this.subscription = this.dataService.currentMessage.subscribe(message => {
      if (message !== null) {
        this.cars = message.get('car_list');
        this.car_ids = message.get('car_ids');
        this.observable.next(this.car_ids);
      }
    });
  }

  /**
   * Unsubscribe from the data service
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * This function opens the bottomsheet element for the console
   * @param car_id: ID of the connected car
   */
  openBottomSheet(car_id): void {
    this._bottomSheet.open(DigitalTwinRightSidebarConsole, {
      panelClass: 'dt-bottom-sheet-console',
      data: {car: car_id, cars: this.cars}
    }).afterDismissed().subscribe(data => {
      this.console_mqtt_msg.emit(data)
    });
  }

  /**
   * This functions opens a snackbar element
   * @param message: The message that should be shown
   * @param action: The action that should be passed on to the snackbar
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /**
   * This function opens a dialog element with detailed information about the connected car
   * @param car: Which car should be shown
   */
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

/**
 * The Component for the Car Detail Dialog
 */
@Component({
  selector: 'dt-right-sidebar-content-dialog',
  templateUrl: '../dialog/dt-right-sidebar-dialog.html',
})
export class DigitalTwinRightSidebarDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cars: Map<string, Car>, car: string }) {
  }
}

/**
 * The Component for the Console BottomSheet
 */
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


