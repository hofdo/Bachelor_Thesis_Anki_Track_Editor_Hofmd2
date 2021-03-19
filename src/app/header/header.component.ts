import {Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {SideNavRightService} from '../Services/side-nav-right.service';
import {SideNavLeftService} from '../Services/side-nav-left.service';

@Component({
  selector: 'app-header',
  templateUrl: `header.component.html`,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private sideNavServiceRight: SideNavRightService, private sideNavServiceLeft: SideNavLeftService) {
  }

  toggleRightNav() {
    this.sideNavServiceRight.toggle()
  }

  toggleLeftNav() {
    this.sideNavServiceLeft.toggle()
  }
}
