import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SideNavRightService} from '../services/side-nav-right.service';
import {SideNavLeftService} from '../services/side-nav-left.service';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {GridsterConfig, GridsterItem} from 'angular-gridster2';
import {Subject, Subscription} from 'rxjs';
import {environment as env} from '../../environments/environment.prod';
import {ExportService} from '../services/export.service';
import {Car} from '../model/car';
import {DtCarListSharingService} from '../services/dt-car-list-sharing.service';
import {IMqttMessage, MqttService} from 'ngx-mqtt';

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
  public grid_items: { item: GridsterItem, type: string, url: string, id: number }[] = [];
  public cars: Map<string, Car> = new Map<string, Car>();
  public car_ids: string[] = [];
  public transmit_data: Map<String, any> = new Map<String, any>();

  public car_event_subscription: Subscription;
  public car_status_subscription: Subscription;
  public host_event_subscription: Subscription;
  public host_status_subscription: Subscription;
  public message: String;
  public topic: string = '/test';

  constructor(public sidenavServiceRight: SideNavRightService,
              public sideNavServiceLeft: SideNavLeftService,
              public dialog: MatDialog,
              public exportService: ExportService,
              public cookieService: CookieService,
              public dataService: DtCarListSharingService,
              public ngZone: NgZone,
              private _mqttService: MqttService) {

    this.car_event_subscription = this._mqttService.observe('Anki/Car/+/E/Messages/#').subscribe((message: IMqttMessage) => this.handleMsg(message));
    this.car_status_subscription = this._mqttService.observe('Anki/Car/+/S/Information').subscribe((message: IMqttMessage) => this.handleMsg(message));
    this.host_event_subscription = this._mqttService.observe('Anki/Host/+/E/#').subscribe((message: IMqttMessage) => this.handleMsg(message));
    this.host_status_subscription = this._mqttService.observe('Anki/Host/+/S/#').subscribe((message: IMqttMessage) => this.handleMsg(message));
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.car_event_subscription.unsubscribe();
    this.car_status_subscription.unsubscribe();
    this.host_event_subscription.unsubscribe();
    this.host_status_subscription.unsubscribe();
    cancelAnimationFrame(this.requestId);
  }

  ngAfterViewInit() {
    this.sidenavServiceRight.setSidenav(this.sidenav_right);
    this.sideNavServiceLeft.setSidenav(this.sidenav_left);
  }

  ngOnInit(): void {

    if (this.cookieService.check('grid_options')) {
      let json = JSON.parse(this.cookieService.get('grid_options'));
      this.Rows = json.rows;
      this.Cols = json.cols;
    }
    if (localStorage.getItem('dt_grid_list') !== null) {
      this.grid_items = JSON.parse(localStorage.getItem('dt_grid_list'));
      this.exportService.exportSingle(this.grid_items, this.Rows, this.Cols, 'png').subscribe(data => {
        this.img.src = URL.createObjectURL(data);
      });
    }
    //Draw Background to scale with canvas
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.ctx.strokeStyle = 'green';
    this.ctx.lineWidth = 4;

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
      this.ctx.drawImage(this.img, 0, 0, this.imgWidth, this.imgHeight);

      this.colImgWidth = this.imgWidth / this.Rows;
      this.colImgHeight = this.imgHeight / this.Cols;

      this.img_car.src = 'https://i.ebayimg.com/images/g/NYEAAOSw061fm-A~/s-l640.jpg';

      this.ngZone.runOutsideAngular(() => this.tick());
      this.interval = setInterval(() => {
        this.tick();
      }, 100);

      console.log('cols: ' + this.Cols);
      console.log('rows: ' + this.Rows);
      console.log('ratio: ' + wrh);
      console.log('old width: ' + this.img.height);
      console.log('new width: ' + this.imgWidth);
      console.log('old height: ' + this.img.height);
      console.log('new height: ' + this.imgHeight);
      console.log('Col width: ' + this.colImgWidth);
      console.log('Col height: ' + this.colImgHeight);
    };
  }

  loadImage() {
    return this.exportService.exportSingle(this.grid_items, this.Rows, this.Cols, 'png').toPromise().then(data => {
      this.img.src = URL.createObjectURL(data);
    });
  }

  private tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    if (this.grid_items.length > 0) {
      this.ctx.drawImage(this.img, 0, 0, this.imgWidth, this.imgHeight);
      if (this.cars.size > 0) {
        this.cars.forEach(car => {
          let grid = this.grid_items.find(grid => {
            return grid.id == car.currentTrackPieceID;
          });
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
        });
      }
    }

    this.requestId = requestAnimationFrame(() => this.tick);
  }

  private handleMsg(msg) {

    let topic = msg.topic;
    let payload = JSON.parse(msg.payload.toString());

    //console.log("Topic: " + topic + ", eventID: " + payload)

    if (RegExp('Anki[\/]Car[\/].*[\/]E[\/]Messages[\/].*').test(topic)) {
      let carID = topic.split('/')[2];
      let eventID = topic.split('/')[5];
      switch (eventID) {
        case 'ANKI_VEHICLE_MSG_V2C_PING_RESPONSE':
          //TODO TBD
          break;
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
    } else if (RegExp('Anki[\/]Host[\/].*[\/]S[\/]Cars').test(topic)) {
      if (payload.length !== undefined) {
        payload.forEach(val => {
          this.addCar(val);
          this.addDisplayCar(val);
        });
      }
    } else if (RegExp('Anki[\/]Host[\/].*[\/]E[\/]CarConnected').test(topic)) {
      let carID = payload['Car'];
      this.addCar(carID);
      this.addDisplayCar(carID);
    } else if (RegExp('Anki[\/]Host[\/].*[\/]E[\/]CarDisconnected').test(topic)) {
      let carID = payload['Car'];
      this.removeCar(carID);
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

    this.transmit_data.set('car_list', this.cars);
    this.transmit_data.set('car_ids', this.car_ids);
    this.dataService.changeMessage(this.transmit_data);

  }

  addCar(car_id) {
    if (!(this.cars.has(car_id))) {
      let car = new Car();
      car.identifier = car_id;
      car.isDelocalized = false;
      this.cars.set(car_id, car);
    }
  }

  addDisplayCar(car_id) {
    if (!(this.car_ids.some(car => {
      return car === car_id;
    }))) {
      this.car_ids.push(car_id);
    }
  }

  removeCar(car_id) {
    this.cars.delete(car_id);
    this.car_ids.forEach(((value, index) => {
      if (value === car_id) {
        this.car_ids.splice(index, 1);
      }
    }));
  }

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

  openDialog() {
    const dialogRef = this.dialog.open(DigitalTwinSettingsContentDialog);

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  openDialogImport() {
    const dialogRef = this.dialog.open(DigitalTwinImportContentDialog, {
      panelClass: 'dt-import-dialog-custom'
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(_import => {
      this.grid_items.splice(0, this.grid_items.length);
      if (_import.value) {
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

// @ts-ignore
@Component({
  selector: 'dt-settings-content-dialog',
  templateUrl: 'dt-settings-content-dialog.html',
})
export class DigitalTwinSettingsContentDialog {
}

// @ts-ignore
@Component({
  selector: 'dt-import-content-dialog',
  templateUrl: 'dt-import-content-dialog.html',
})
export class DigitalTwinImportContentDialog {
  fileContent = '';
  fileName = '';

  constructor() {
  }

  onFileSelected(event) {

    let fileReader = new FileReader();
    const file: File = event.target.files[0];
    this.fileName = file.name;

    if (file) {
      fileReader.onload = ev => {
        this.fileContent = ev.target.result.toString();
      };
      fileReader.readAsText(file);
    }
  }

}
