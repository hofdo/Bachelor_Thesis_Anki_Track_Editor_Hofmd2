import { Injectable } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SideNavLeftService {
  private sidenavleft: MatSidenav;


  public setSidenav(sidenav: MatSidenav) {
    this.sidenavleft = sidenav;
  }

  public open() {
    return this.sidenavleft.open();
  }


  public close() {
    return this.sidenavleft.close();
  }

  public toggle(): void {
    this.sidenavleft.toggle();
  }
}
