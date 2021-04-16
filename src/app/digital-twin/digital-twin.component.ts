import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SideNavRightService} from '../services/side-nav-right.service';
import {SideNavLeftService} from '../services/side-nav-left.service';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {DisplayGrid, GridsterConfig, GridsterItem, GridsterItemComponentInterface, GridType} from 'angular-gridster2';
import {Square} from '../model/square';
import {GridItem} from '../model/grid-item';
import {Subscription} from 'rxjs';

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
  Cols: number = 3; //default
  Rows: number = 3; //default

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
  public grid_items: Array<GridItem> = [];

  public subscription: Subscription;
  public message: String;
  public topic: string = "/test"

  constructor(public sidenavServiceRight: SideNavRightService,
              public sideNavServiceLeft: SideNavLeftService,
              public dialog: MatDialog,
              public cookieService: CookieService,
              public ngZone: NgZone) {
    if (cookieService.check('dt_grid_list')) {
      this.grid_items = JSON.parse(cookieService.get('dt_grid_list'));
    }
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

      this.colImgWidth = this.imgWidth / this.Cols;
      this.colImgHeight = this.imgHeight / this.Rows;

      console.log('ratio: ' + wrh);
      console.log('old width: ' + this.img.height);
      console.log('new width: ' + this.imgWidth);
      console.log('old height: ' + this.img.height);
      console.log('new height: ' + this.imgHeight);
      console.log('Col width: ' + this.colImgWidth);
      console.log('Col height: ' + this.colImgHeight);
    };
    this.img.src = 'http://localhost:8080/test';
    this.img_car.src = 'https://i.ebayimg.com/images/g/NYEAAOSw061fm-A~/s-l640.jpg';

    this.squares.push(new Square(this.ctx));

    this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {
      this.tick();
    }, 4000);
  }


  private tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.img, 0, 0, this.imgWidth, this.imgHeight);
    let thing = this.grid_items.find(value => value['_x_cord'] === 0 && value['_y_cord'] === 0);
    this.ctx.drawImage(this.img_car, thing['_x_cord'] * this.colImgHeight + (this.colImgHeight / 2), (thing['_y_cord']) * this.colImgHeight + (this.colImgHeight / 2), 50, 50);
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
