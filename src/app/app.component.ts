import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SideNavRightService} from './side-nav-right.service';
import {SideNavLeftService} from './side-nav-left.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('sidenav_right') public sidenav_right: MatSidenav;
  @ViewChild('sidenav_left') public sidenav_left: MatSidenav;
  title = 'bachelortrackeditor';

  constructor(public sidenavServiceRight: SideNavRightService, public sideNavServiceLeft: SideNavLeftService) {  }

  ngAfterViewInit(){
    this.sidenavServiceRight.setSidenav(this.sidenav_right);
    this.sideNavServiceLeft.setSidenav(this.sidenav_left);
  }
}
