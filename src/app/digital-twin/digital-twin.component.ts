import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SideNavRightService} from '../services/side-nav-right.service';
import {SideNavLeftService} from '../services/side-nav-left.service';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {GridsterConfig, GridsterItem} from 'angular-gridster2';
import {Square} from '../model/square';
import {Subject, Subscription} from 'rxjs';
import {webSocket} from 'rxjs/webSocket';
import {environment as env} from '../../environments/environment.prod';
import {ExportService} from '../services/export.service';
import {Car} from '../model/car';
import {DtCarListSharingService} from '../services/dt-car-list-sharing.service';

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

  subject: Subject<any> = webSocket(env.websocket.protocol + '://' + env.websocket.url + ':' + env.websocket.port);

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
  squares: Square[] = [];

  options: GridsterConfig;
  public grid_items: { item: GridsterItem, type: string, url: string, id: number }[] = [];
  public cars: Car[] = [];
  public car_ids: string[] = []
  public transmit_data: Map<String, any>

  public subscription: Subscription;
  public message: String;
  public topic: string = '/test';

  constructor(public sidenavServiceRight: SideNavRightService,
              public sideNavServiceLeft: SideNavLeftService,
              public dialog: MatDialog,
              public exportService: ExportService,
              public cookieService: CookieService,
              public dataService: DtCarListSharingService,
              public ngZone: NgZone) {
    this.subject.subscribe(
      msg => {
        this.handleMsg(msg);
      }, // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }

  ngAfterViewInit() {
    this.sidenavServiceRight.setSidenav(this.sidenav_right);
    this.sideNavServiceLeft.setSidenav(this.sidenav_left);

    //Send the backend the request to get the information about how many cars are currently connected to the controller
    this.subject.next({
      'command': 'Cars'
    });


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
      /*
      if (this.cars.length > 0) {
        this.cars.forEach(car => {
          let grid = this.grid_items.find(grid => {
            return grid.id == car.currentTrackID;
          });
          if (grid !== undefined) {
            this.ctx.drawImage(this.img_car, grid.item.x * this.colImgHeight + (this.colImgHeight / 2), (grid.item.y) * this.colImgHeight + (this.colImgHeight / 2), 50, 50);
            //console.log("car: " + car.name + ", track: " + car.currentTrackID)
          }
        });
      }
      */
      //let thing = this.grid_items.find(value => value.item.x === 2 && value.item.y === 1);
      //this.ctx.drawImage(this.img_car, thing.item.x * this.colImgHeight + (this.colImgHeight / 2), (thing.item.y) * this.colImgHeight + (this.colImgHeight / 2), 50, 50);
    }

    this.requestId = requestAnimationFrame(() => this.tick);
  }

  private handleMsg(msg) {
    let eventID = msg['eventID'];
    let data = msg['data'];
    let carID = '';
    if ('carID' in msg) {
      carID = msg['carID'];
    }
    let temp_cars = this.cars;
    let is_changed = false;

    switch (eventID) {
      case 'ANKI_CONTROLLER_MSG_CONNECTED_VEHICLES':
        data.forEach(veh => {
          if (!(this.cars.some(car => {
            return car.identifier === veh;
          }))) {
            let car = new Car();
            car.identifier = veh;
            this.cars.push(car);
            this.car_ids.push(veh)
          }
        });
        break;
      case 'ANKI_CONTROLLER_MSG_VEHICLE_CONNECTED':
        if (!(this.cars.some(car => {
          return car.identifier === data['Car'];
        }))) {
          let car = new Car();
          car.identifier = data['Car'];
          this.cars.push(car);
          this.car_ids.push(data['Car'])
        }
        break;
      case 'ANKI_CONTROLLER_MSG_VEHICLE_DISCONNECTED':
        this.cars.forEach((car, index) => {
          if (car.identifier === data['Car']) {
            this.cars.splice(index, 1);
          }
        });
        this.car_ids.forEach((id, index) => {
          if (id === data['Car']) {
            this.car_ids.splice(index, 1);
          }
        });
        break;
      case 'ANKI_VEHICLE_MSG_V2C_PING_RESPONSE':
        //TODO TBD
        break;
      case 'ANKI_VEHICLE_MSG_V2C_VERSION_RESPONSE':
        this.cars.map(car => {
          if (car.identifier === carID) {
            car.version = data['value'];
          }
        });
        break;
      case 'ANKI_VEHICLE_MSG_V2C_BATTERY_LEVEL_RESPONSE':
        this.cars.map(car => {
          if (car.identifier === carID) {
            car.batteryLevel = data['value'];
          }
        });
        break;
      case 'ANKI_VEHICLE_MSG_V2C_LOCALIZATION_POSITION_UPDATE':
        this.cars.map(car => {
          if (car.identifier === carID) {
            car.speed = data['speed'];
            car.offset = data['offset'];
            car.lastTrackPieceID = data['pieceId'];
            car.lastTrackPositionID = data['pieceLocation'];
            car.isReverse = data['isReverse'];
          }
        });
        break;
      case 'ANKI_VEHICLE_MSG_V2C_LOCALIZATION_TRANSITION_UPDATE':
        this.cars.map(car => {
          if (car.identifier === carID) {
            car.offset = data['offset'];
            car.rightWheelDistance = data['right_wheel_dist_cm'];
            car.leftWheelDistance = data['left_wheel_dist_cm'];
          }
        });
        break;
      case 'ANKI_VEHICLE_MSG_V2C_LOCALIZATION_INTERSECTION_UPDATE':
        this.cars.map(car => {
          if (car.identifier === carID) {
            car.offset = data['offset'];
            car.lastTrackPieceID = 128;
            car.lastTrackPositionID = data['intersection_code'];
            car.isExiting = data['is_exiting'];
          }
        });
        break;
      case 'ANKI_VEHICLE_MSG_V2C_VEHICLE_DELOCALIZED':
        this.cars.map(car => {
          if (car.identifier === carID) {
            car.isDelocalized = true;
          }
        });
        break;
      case 'ANKI_VEHICLE_MSG_V2C_VEHICLE_STATUS':
        this.cars.map(car => {
          if (car.identifier === carID) {
            car.isCharging = data['charging'];
            car.isOnTrack = data['onTrack'];
          }
        });
        break;
      case 'Information':
        this.cars.map(car => {
          if (car.identifier === carID) {
            //TODO Implement
          }
        });
        break;
    }
    this.transmit_data.set("car_list", this.cars)
    this.transmit_data.set("car_ids", this.car_ids)
    this.dataService.changeMessage(this.transmit_data);

  }

  openDialog() {
    const dialogRef = this.dialog.open(DigitalTwinSettingsContentDialog);

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dt-settings-content-dialog',
  templateUrl: 'dt-settings-content-dialog.html',
})
export class DigitalTwinSettingsContentDialog {
}
