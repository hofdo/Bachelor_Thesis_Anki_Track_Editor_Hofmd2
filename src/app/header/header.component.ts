import {Component, OnInit, Output} from '@angular/core';
import {SideNavRightService} from '../services/side-nav-right.service';
import {SideNavLeftService} from '../services/side-nav-left.service';

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
