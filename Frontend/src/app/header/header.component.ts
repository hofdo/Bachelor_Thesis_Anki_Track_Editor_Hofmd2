import {Component, OnInit, Output} from '@angular/core';
import {SideNavRightService} from '../services/side-nav-right.service';
import {SideNavLeftService} from '../services/side-nav-left.service';

/**
 * Component for the Header element
 */

@Component({
  selector: 'app-header',
  templateUrl: `header.component.html`,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  /**
   *
    * @param sideNavServiceRight: Service for the right sidenav
   * @param sideNavServiceLeft: Service for the left sidenav
   */
  constructor(private sideNavServiceRight: SideNavRightService, private sideNavServiceLeft: SideNavLeftService) {
  }

  /**
   * This function tells the service to toggle the right sidenav
   */
  toggleRightNav() {
    this.sideNavServiceRight.toggle()
  }

  /**
   * This function tells the service to toggle the left sidenav
   */
  toggleLeftNav() {
    this.sideNavServiceLeft.toggle()
  }
}
