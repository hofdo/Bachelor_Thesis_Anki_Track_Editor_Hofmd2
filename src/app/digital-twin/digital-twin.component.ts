/**
 *
 * The MIT License

 Copyright (c) 2010-2021 Google LLC. http://angular.io/license

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */


import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SideNavRightService} from '../services/side-nav-right.service';
import {SideNavLeftService} from '../services/side-nav-left.service';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {GridsterConfig, GridsterItem} from 'angular-gridster2';
import {Subject, Subscription} from 'rxjs';
import {ExportService} from '../services/export.service';
import {Car} from '../model/car';
import {DtCarListSharingService} from '../services/dt-car-list-sharing.service';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {environment} from '../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Main Component for the Digital Twin
 * Here is the logic and the functions used in the digital twin
 */

@Component({
  selector: 'app-digital-twin',
  templateUrl: './digital-twin.component.html',
  styleUrls: ['./digital-twin.component.css']
})
export class DigitalTwinComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('sidenav_right') public sidenav_right: MatSidenav;
  @ViewChild('sidenav_left') public sidenav_left: MatSidenav;
  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  Cols: number; //default
  Rows: number; //default

  //Image for canvas
  img: HTMLImageElement = new Image();
  img_car: HTMLImageElement = new Image();

  // Image height and width
  imgWidth: number;
  imgHeight: number;
  //Grid Image height and width
  colImgWidth: number;
  colImgHeight: number;

  requestId;
  interval;

  options: GridsterConfig;

  // List of the current grid-system elementspublic
  grid_items: { item: GridsterItem, type: string, url: string, id: number }[] = [];

  //List of all the cars that are connected to the mqtt broker
  public cars: Map<string, Car> = new Map<string, Car>();
  //List of all the ids of the cars
  public car_ids: string[] = [];
  public transmit_data: Map<String, any> = new Map<String, any>();

  //All the Subscriptions for the mqtt broker
  public car_event_subscription: Subscription;
  public car_status_subscription: Subscription;
  public host_event_subscription: Subscription;
  public host_status_subscription: Subscription;
  public message: String;

  /**
   *
   * @param sidenavServiceRight: Service for the right Sidenav
   * @param sideNavServiceLeft: Service for the left Sidenav
   * @param dialog: Dialog Element for the dialog windows
   * @param exportService: Export service for the communication via a REST-API
   * @param cookieService: Cookie service for saving data in cookies
   * @param dataService: Service for sharing data with the sidenav
   * @param ngZone:
   * @param _mqttService: Service for the communication with a mqtt broker
   * @param _loadingSnackbar: Snackbar for showing the loading of the track in the background
   */
  constructor(public sidenavServiceRight: SideNavRightService,
              public sideNavServiceLeft: SideNavLeftService,
              public dialog: MatDialog,
              public exportService: ExportService,
              public cookieService: CookieService,
              public dataService: DtCarListSharingService,
              public ngZone: NgZone,
              private _mqttService: MqttService,
              private _loadingSnackbar: MatSnackBar) {

    /**
     * Subscribing on the topics from which we want to receive data from the mqtt broker
     */
    this.car_event_subscription = this._mqttService.observe('Anki/Car/+/E/Messages/#').subscribe((message: IMqttMessage) => this.handleMsg(message));
    this.car_status_subscription = this._mqttService.observe('Anki/Car/+/S/Information').subscribe((message: IMqttMessage) => this.handleMsg(message));
    this.host_event_subscription = this._mqttService.observe('Anki/Host/+/E/#').subscribe((message: IMqttMessage) => this.handleMsg(message));
    this.host_status_subscription = this._mqttService.observe('Anki/Host/+/S/#').subscribe((message: IMqttMessage) => this.handleMsg(message));
  }

  /**
   * Clear intervals, animationsframes and the subscriptions to the mqtt broker
   */
  ngOnDestroy() {
    clearInterval(this.interval);
    this.car_event_subscription.unsubscribe();
    this.car_status_subscription.unsubscribe();
    this.host_event_subscription.unsubscribe();
    this.host_status_subscription.unsubscribe();
    cancelAnimationFrame(this.requestId);
  }

  /**
   * Here the Sidenav elements are passed to the services
   */
  ngAfterViewInit() {
    this.sidenavServiceRight.setSidenav(this.sidenav_right);
    this.sideNavServiceLeft.setSidenav(this.sidenav_left);
  }

  ngOnInit(): void {
    /**
     * Getting the amount of rows and columns in the grid-system
     */
    if (this.cookieService.check('grid_options')) {
      let json = JSON.parse(this.cookieService.get('grid_options'));
      this.Rows = json.rows;
      this.Cols = json.cols;
    }

    /**
     * Getting the current list of grid-elements in the grid-system and getting a picture of the whole trac
     */
    if (localStorage.getItem('dt_grid_list') !== null) {
      this.grid_items = JSON.parse(localStorage.getItem('dt_grid_list'));
      let snackBarRef = this._loadingSnackbar.openFromComponent(DigitalTwinLoadingSnackBar, {
        panelClass: "dt-snackbar-loading",
        verticalPosition: 'bottom',
        horizontalPosition: 'start'
      })
      this.exportService.exportSingle(this.grid_items, this.Rows, this.Cols, 'png').subscribe(data => {
        this.img.src = URL.createObjectURL(data);
        snackBarRef.dismiss()
      });
    }
    //Draw Background to scale with canvas
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.ctx.strokeStyle = 'green';
    this.ctx.lineWidth = 4;

    /**
     * Calculate the scale of the track based on the amount of columns and rows
     */

    // noinspection JSSuspiciousNameCombination
    this.canvas.nativeElement.width = this.canvas.nativeElement.offsetHeight;
    this.canvas.nativeElement.height = this.canvas.nativeElement.offsetHeight;
    this.img.onload = () => {
      let wrh = this.img.width / this.img.height;
      this.imgWidth = this.canvas.nativeElement.width;
      this.imgHeight = this.imgWidth / wrh;
      if (this.imgHeight > this.canvas.nativeElement.height) {
        this.imgHeight = this.canvas.nativeElement.height;
        this.imgWidth = this.imgHeight * wrh;
      }
      //Drawing the track as a background on the canvas
      this.ctx.drawImage(this.img, 0, 0, this.imgWidth, this.imgHeight);

      this.colImgWidth = this.imgWidth / this.Rows;
      this.colImgHeight = this.imgHeight / this.Cols;

      //Getting the image of the car that will be displayed on the canvas
      this.img_car.src = 'https://i.ebayimg.com/images/g/NYEAAOSw061fm-A~/s-l640.jpg';

      /**
       * Set an interval for the function that will animate the cars on the canvas
       */
      this.ngZone.runOutsideAngular(() => this.tick());
      this.interval = setInterval(() => {
        this.tick();
      }, 100);
    };
  }

  /**
   * Function that the loads the image of the track
   */
  loadImage() {
    return this.exportService.exportSingle(this.grid_items, this.Rows, this.Cols, 'png').toPromise().then(data => {
      this.img.src = URL.createObjectURL(data);
    });
  }

  /**
   * This function draws the elements on the canvas and is called in a fixed interval
   * There for the elements are animated based in the interval
   * @private
   */
  private tick() {
    //Clearing the canvas to begin drawing the new position of the elements
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    //When the amount of grid-elements is greater zero the track is drawn
    if (this.grid_items.length > 0) {
      this.ctx.drawImage(this.img, 0, 0, this.imgWidth, this.imgHeight);
      /**
       * When the amount of cars is greater than 0 then every car is drawn on the corresponding track
       */
      if (this.cars.size > 0) {
        this.cars.forEach(car => {
          let grid = this.grid_items.find(grid => {
            return grid.item.track_id == car.currentTrackPieceID;
          });
          if (grid !== undefined){
            this.ctx.drawImage(this.img_car, grid.item.x * this.colImgHeight + (this.colImgHeight / 2), (grid.item.y) * this.colImgHeight + (this.colImgHeight / 2), 50, 50);
          }
          /*
          if (grid !== undefined) {
            let location_id_mod = car.currentTrackPieceID%3
            this.ctx.drawImage(this.img_car, grid.item.x * this.colImgHeight + (this.colImgHeight / 2), (grid.item.y) * this.colImgHeight + (this.colImgHeight / 2), 50, 50);
            switch (grid.type){
              case "straight":
                if (car.lastTrackPieceID !== 0){
                  if (car.currentTrackPieceID === 39){
                    if (car.currentTrackPieceID !== car.lastTrackPieceID){
                      car.isReverse = car.currentTrackPieceID % 2 === 1;
                    }
                  }
                  else {
                    if (car.currentTrackPieceID !== car.lastTrackPieceID){
                      car.isReverse = car.currentTrackPieceID % 3 === 2;
                    }
                  }
                }
                console.log(car.isReverse)
                switch (grid.item.degree) {
                  case "0":
                    //this.ctx.drawImage(this.img_car, grid.item.x * this.colImgHeight + (this.colImgHeight / 2), (grid.item.y) * this.colImgHeight + (this.colImgHeight / 2), 50, 50);
                    if (car.currentTrackPieceID === 39){

                    }
                    break
                  case "90":

                    if (car.currentTrackPieceID === 39){

                    }
                    break
                  case "180":

                    if (car.currentTrackPieceID === 39){

                    }
                    break
                  case "270":

                    if (car.currentTrackPieceID === 39){

                    }
                    break
                }
                break
              case "curve":
                switch (grid.item.degree) {
                  case "0":

                    break
                  case "90":

                    break
                  case "180":

                    break
                  case "270":

                    break
                }
                break
              case "intersection":

                break
            }
          }

           */
        });
      }
    }
    this.requestId = requestAnimationFrame(() => this.tick);
  }

  /**
   * This function handles the incoming messages from the mqtt broker
   * @param msg: The incoming message from the mqtt broker
   * @private
   */
  private handleMsg(msg) {

    //The name of the subscribed topic
    let topic = msg.topic;
    //The payload from the mqtt broker
    let payload = JSON.parse(msg.payload.toString());

    //This Regex matches the topics with the format Anki/Car/+/E/Messages
    if (RegExp('Anki[\/]Car[\/].*[\/]E[\/]Messages[\/].*').test(topic)) {
      let carID = topic.split('/')[2];
      let eventID = topic.split('/')[5];
      //This switch matches the different events that come from the Anki Overdrive Controller via the mqtt broker
      switch (eventID) {
        case 'ANKI_VEHICLE_MSG_V2C_VERSION_RESPONSE':
          if (this.cars.has(carID)) {
            this.cars.get(carID).version = payload['value'];
          }
          break;
        case 'ANKI_VEHICLE_MSG_V2C_BATTERY_LEVEL_RESPONSE':
          if (this.cars.has(carID)) {
            this.cars.get(carID).batteryLevel = payload['value'];
          }
          break;
        case 'ANKI_VEHICLE_MSG_V2C_LOCALIZATION_POSITION_UPDATE':
          if (this.cars.has(carID)) {
            this.cars.get(carID).speed = payload['speed'];
            this.cars.get(carID).offset = payload['offset'];
            this.cars.get(carID).lastTrackPieceID = this.cars.get(carID).currentTrackPieceID;
            this.cars.get(carID).currentTrackPieceID = payload['pieceId'];
            this.cars.get(carID).lastTrackPositionID = payload['pieceLocation'];
            this.cars.get(carID).isReverse = payload['isReverse'];
            this.cars.get(carID).isDelocalized = false;

          }
          break;
        case 'ANKI_VEHICLE_MSG_V2C_LOCALIZATION_TRANSITION_UPDATE':
          if (this.cars.has(carID)) {
            this.cars.get(carID).offset = payload['offset'];
            this.cars.get(carID).rightWheelDistance = payload['right_wheel_dist_cm'];
            this.cars.get(carID).leftWheelDistance = payload['left_wheel_dist_cm'];
            this.cars.get(carID).isDelocalized = false;
          }
          break;
        case 'ANKI_VEHICLE_MSG_V2C_LOCALIZATION_INTERSECTION_UPDATE':
          if (this.cars.has(carID)) {
            this.cars.get(carID).offset = payload['offset'];
            this.cars.get(carID).lastTrackPieceID = 128;
            this.cars.get(carID).lastTrackPositionID = payload['intersection_code'];
            this.cars.get(carID).isExiting = payload['is_exiting'];
            this.cars.get(carID).isDelocalized = false;
          }
          break;
        case 'ANKI_VEHICLE_MSG_V2C_VEHICLE_DELOCALIZED':
          if (this.cars.has(carID)) {
            this.cars.get(carID).isDelocalized = true;
          }
          break;
        case 'ANKI_VEHICLE_MSG_V2C_VEHICLE_STATUS':
          if (this.cars.has(carID)) {
            this.cars.get(carID).isCharging = payload['charging'];
            this.cars.get(carID).isOnTrack = payload['onTrack'];
          }
          break;
      }
      //This Regex matches the topics with the format Anki/Host/+/S/Cars
    } else if (RegExp('Anki[\/]Host[\/].*[\/]S[\/]Cars').test(topic)) {
      if (payload.length !== undefined) {
        payload.forEach(val => {
          this.addCar(val);
          this.addDisplayCar(val);
        });
      }
      //This Regex matches the topics with the format Anki/Host/+/E/CarConnected
    } else if (RegExp('Anki[\/]Host[\/].*[\/]E[\/]CarConnected').test(topic)) {
      let carID = payload['Car'];
      this.addCar(carID);
      this.addDisplayCar(carID);
      //This Regex matches the topics with the format Anki/Host/+/E/CarDisconnected
    } else if (RegExp('Anki[\/]Host[\/].*[\/]E[\/]CarDisconnected').test(topic)) {
      let carID = payload['Car'];
      this.removeCar(carID);
      //This Regex matches the topics with the format Anki/Car/+/S/Information
    } else if (RegExp('Anki[\/]Car[\/].*[\/]S[\/]Information').test(topic)) {
      let carID = topic.split('/')[2];
      this.addCar(carID);
      if (this.cars.has(carID)) {
        this.cars.get(carID).address = payload['address'];
        this.cars.get(carID).model = payload['model'];
        this.cars.get(carID).modelId = payload['modelId'];
        this.cars.get(carID).productId = payload['productId'];
      }
    }
    //Setting the data for the sideNav
    this.transmit_data.set('car_list', this.cars);
    this.transmit_data.set('car_ids', this.car_ids);

    //Pass the data to the service which tells the sideNav Component that the data changed based on the incoming events
    this.dataService.changeMessage(this.transmit_data);

  }

  /**
   * This function adds a connected car to the list of cars that will be displayed on the track
   * @param car_id: The ID of the car that is connected
   */
  addCar(car_id) {
    if (!(this.cars.has(car_id))) {
      let car = new Car();
      car.identifier = car_id;
      car.isDelocalized = false;
      this.cars.set(car_id, car);
    }
  }

  /**
   * This function adds a car to be displayed in the sidenav
   * @param car_id: The ID of the car that is connected
   */
  addDisplayCar(car_id) {
    if (!(this.car_ids.some(car => {
      return car === car_id;
    }))) {
      this.car_ids.push(car_id);
    }
  }

  /**
   * Removes a car form the list of cars that will be displayed on the track
   * @param car_id: The ID of the car that is connected
   */
  removeCar(car_id) {
    this.cars.delete(car_id);
    this.car_ids.forEach(((value, index) => {
      if (value === car_id) {
        this.car_ids.splice(index, 1);
      }
    }));
  }

  /**
   * This functions publishes the commands to the mqtt broker that should change the behaviour of the real cars
   * @param data: The commands that will be published to the mqtt broker
   */
  sendMQTTConsoleMsg(data) {
    let speed = data.speed;
    let accel = data.acceleration;
    let lane = data.lane;
    let id = data.id;

    if (parseInt(speed) >= 0) {
      this._mqttService.unsafePublish('Anki/Car/' + id + '/I', JSON.stringify({
        speed: speed,
        acceleration: accel
      }), {qos: 0, retain: false});
    }
    if (parseFloat(lane) >= 0) {
      this._mqttService.unsafePublish('Anki/Car/' + id + '/I', JSON.stringify({
        lane: lane
      }), {qos: 0, retain: false});
    }
  }

  /**
   * This functions opens the dialog for the Setting Dialog Window
   */
  openDialog() {
    const dialogRef = this.dialog.open(DigitalTwinSettingsContentDialog);

    dialogRef.afterClosed().subscribe(result => {
        localStorage.setItem("mqtt_broker", result)
    });
  }
  /**
   * This functions opens the dialog for the Import Dialog Window
   */
  openDialogImport() {
    const dialogRef = this.dialog.open(DigitalTwinImportContentDialog, {
      panelClass: 'dt-import-dialog-custom'
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(_import => {
      if (_import.value) {
        this.grid_items.splice(0, this.grid_items.length);
        let imported_grid_items = JSON.parse(_import.file);
        imported_grid_items.forEach(v => {
          this.grid_items.push(v);
        });
        this.exportService.exportSingle(this.grid_items, this.Rows, this.Cols, 'png').subscribe(data => {
          this.img.src = URL.createObjectURL(data);
        });
      }
    });
  }
}

/**
 * Component for the Setting Dialog Window
 */
// @ts-ignore
@Component({
  selector: 'dt-settings-content-dialog',
  templateUrl: 'dialog/dt-settings-content-dialog.html',
})
export class DigitalTwinSettingsContentDialog implements OnInit{
  settings_mqtt_broker;
  form: FormGroup;

  constructor(public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      'mqtt_setting': ['', Validators.required],
    });
  }
}

/**
 * Component for the Import Dialog Window
 */
// @ts-ignore
@Component({
  selector: 'dt-import-content-dialog',
  templateUrl: 'dialog/dt-import-content-dialog.html',
})
export class DigitalTwinImportContentDialog {
  fileContent = '';
  fileName = '';
  is_file_valid = false
  constructor() {
  }

  onFileSelected(event) {

    let fileReader = new FileReader();
    const file: File = event.target.files[0];
    this.fileName = file.name;

    if (file) {
      this.is_file_valid = true
      fileReader.onload = ev => {
        this.fileContent = ev.target.result.toString();
      };
      fileReader.readAsText(file);
    }
    else {
      this.is_file_valid = false
    }
  }

}

/**
 * Component for the Loading Snackbar
 */
@Component({
  selector: 'dt-loading-snackbar',
  templateUrl: 'dialog/dt-loading-snackbar.html',
})
export class DigitalTwinLoadingSnackBar {

}
