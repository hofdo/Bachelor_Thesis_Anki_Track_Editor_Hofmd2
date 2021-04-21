import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SideNavRightService} from '../services/side-nav-right.service';
import {SideNavLeftService} from '../services/side-nav-left.service';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {GridsterConfig, GridsterItem} from 'angular-gridster2';
import {Square} from '../model/square';
import {GridItem} from '../model/grid-item';
import {Subject, Subscription} from 'rxjs';
import {webSocket} from 'rxjs/webSocket';
import {environment as env} from '../../environments/environment.prod';
import {ExportService} from '../services/export.service';

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

  subject: Subject<any> = webSocket(env.websocket.protocol + "://" + env.websocket.url + ":" + env.websocket.port);

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

  public subscription: Subscription;
  public message: String;
  public topic: string = "/test"

  constructor(public sidenavServiceRight: SideNavRightService,
              public sideNavServiceLeft: SideNavLeftService,
              public dialog: MatDialog,
              public exportService: ExportService,
              public cookieService: CookieService,
              public ngZone: NgZone) {
    if (cookieService.check('dt_grid_list')) {
      this.grid_items = JSON.parse(cookieService.get('dt_grid_list'));
    }
    if (cookieService.check('grid_options')){
      let json = JSON.parse(cookieService.get("grid_options"))
      this.Rows = json.rows
      this.Cols = json.cols
    }
    if (cookieService.check('current_grid_img_url')){
      this.img.src = cookieService.get("current_grid_img_url")
    }

    this.subject.subscribe(
      msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
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
  }

  ngOnInit(): void {

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
    this.img_car.src = 'https://i.ebayimg.com/images/g/NYEAAOSw061fm-A~/s-l640.jpg';

    this.ngZone.runOutsideAngular(() => this.tick());
    this.interval = setInterval(() => {
      this.tick();
    }, 2000);
  }


  private tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.img, 0, 0, this.imgWidth, this.imgHeight);
    this.grid_items.forEach(value => {

    })
    let thing = this.grid_items.find(value => value.item.x === 2 && value.item.y === 1);
    this.ctx.drawImage(this.img_car, thing.item.x * this.colImgHeight + (this.colImgHeight / 2), (thing.item.y) * this.colImgHeight + (this.colImgHeight / 2), 50, 50);


    this.requestId = requestAnimationFrame(() => this.tick);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DigitalTwinSettingsContentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

@Component({
  selector: 'dt-settings-content-dialog',
  templateUrl: 'dt-settings-content-dialog.html',
})
export class DigitalTwinSettingsContentDialog {
}
