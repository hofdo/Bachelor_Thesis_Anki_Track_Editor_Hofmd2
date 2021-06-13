import {ComponentFixture, TestBed} from '@angular/core/testing';

import { SideNavRightService } from './side-nav-right.service';
import {MatDrawer, MatDrawerToggleResult, MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {Component, ViewChild} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {DtCarListSharingService} from './dt-car-list-sharing.service';

describe('SideNavRightService', () => {
  let service: SideNavRightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideNavRightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe("SideNavRightService Methods", () => {

  let service: SideNavRightService;
  let component: TestBedComponent
  let fixture: ComponentFixture<TestBedComponent>
  let spy:any

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestBedComponent],
      imports: [MatSidenavModule, BrowserAnimationsModule],
      providers: [SideNavRightService]
    }).compileComponents();
    service = TestBed.inject(SideNavRightService);
    fixture = TestBed.createComponent(TestBedComponent)
    component = fixture.componentInstance; // BannerComponent test instance
  });

  it('should call methods', function() {

    let promise = new Promise<MatDrawerToggleResult>(resolve => {
      return true
    })

    spy = spyOn(service, 'setSidenav').and.callFake(function() {
      return component.componentUnderTest
    })
    service.setSidenav(component.componentUnderTest)
    const openSpy = spyOn(service, 'open').and.callFake(function() {
      return promise
    })
    const closeSpy = spyOn(service, 'close').and.callFake(function() {
      return promise
    })
    const toggleSpy = spyOn(service, 'toggle').and.callFake(function() {
      return promise
    })

    service.open()
    service.close()
    service.toggle()

    expect(spy).toHaveBeenCalled()
    expect(openSpy).toHaveBeenCalled()
    expect(closeSpy).toHaveBeenCalled()
    expect(toggleSpy).toHaveBeenCalled()

  });
})

@Component({
  selector: 'testing-component',
  template: `
        <mat-sidenav-container>

        <mat-sidenav #filtersSidenav mode="side" opened="true" position="end"></mat-sidenav>

        </mat-sidenav-container>
    `
})
class TestBedComponent {
  @ViewChild("filtersSidenav") public componentUnderTest:  MatSidenav
  constructor() {}
}
