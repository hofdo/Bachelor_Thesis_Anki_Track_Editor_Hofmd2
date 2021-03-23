import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SideNavRightService} from '../services/side-nav-right.service';
import {SideNavLeftService} from '../services/side-nav-left.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-digital-twin',
  templateUrl: './digital-twin.component.html',
  styleUrls: ['./digital-twin.component.css']
})
export class DigitalTwinComponent implements AfterViewInit{
  @ViewChild('sidenav_right') public sidenav_right: MatSidenav;
  @ViewChild('sidenav_left') public sidenav_left: MatSidenav;

  constructor(public sidenavServiceRight: SideNavRightService,
              public sideNavServiceLeft: SideNavLeftService,
              public dialog: MatDialog) {  }

  ngAfterViewInit(){
    this.sidenavServiceRight.setSidenav(this.sidenav_right);
    this.sideNavServiceLeft.setSidenav(this.sidenav_left);
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
export class DigitalTwinSettingsContentDialog {}
