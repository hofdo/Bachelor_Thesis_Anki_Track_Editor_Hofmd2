import { Injectable } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

/**
 * This service allows the functions of the sidenav to be used by another component
 */

@Injectable({
  providedIn: 'root'
})
export class SideNavLeftService {
  private sidenavleft: MatSidenav;

  /**
   * In this function the sidenav is registered in the service
   * @param sidenav: The MatSideNav that should be registered
   */
  public setSidenav(sidenav: MatSidenav) {
    this.sidenavleft = sidenav;
  }

  /**
   * This function opens the sidenav
   */
  public open() {
    return this.sidenavleft.open();
  }

  /**
   * This function closed the sidenav
   */
  public close() {
    return this.sidenavleft.close();
  }

  /**
   * This function toggles the sidenav
   */
  public toggle(): void {
    this.sidenavleft.toggle();
  }
}
