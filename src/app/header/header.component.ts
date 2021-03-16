import {Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {SideNavRightService} from '../side-nav-right.service';
import {SideNavLeftService} from '../side-nav-left.service';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <span class="navbar-brand text-light">Anki Track Editor</span>
      <span class="fill-space"></span>
      <button class="rightSidenav_toggle" (click)="toggleRightNav()"> Toggle Right Sidenav</button>
      <button class="rightSidenav_toggle" (click)="toggleLeftNav()"> Toggle Left Sidenav</button>
    </nav>
  `,
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
