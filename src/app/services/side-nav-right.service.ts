import { Injectable } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

/**
 * This service allows the functions of the sidenav to be used by another component
 */

@Injectable({
  providedIn: 'root'
})
export class SideNavRightService {
  private sidenavright: MatSidenav;

  /**
   * In this function the sidenav is registered in the service
   * @param sidenav: The MatSideNav that should be registered
   */
  public setSidenav(sidenav: MatSidenav) {
    this.sidenavright = sidenav;
  }

  /**
   * This function opens the sidenav
   */
  public open() {
    return this.sidenavright.open();
  }

  /**
   * This function closed the sidenav
   */
  public close() {
    return this.sidenavright.close();
  }

  /**
   * This function toggles the sidenav
   */
  public toggle(): void {
    this.sidenavright.toggle();
  }
}
