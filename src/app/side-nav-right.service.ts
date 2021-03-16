import { Injectable } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SideNavRightService {
  private sidenavright: MatSidenav;


  public setSidenav(sidenav: MatSidenav) {
    this.sidenavright = sidenav;
  }

  public open() {
    return this.sidenavright.open();
  }


  public close() {
    return this.sidenavright.close();
  }

  public toggle(): void {
    this.sidenavright.toggle();
  }
}
