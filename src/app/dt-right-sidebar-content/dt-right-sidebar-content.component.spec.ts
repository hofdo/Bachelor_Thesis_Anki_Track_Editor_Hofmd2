import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtRightSidebarContentComponent } from './dt-right-sidebar-content.component';

describe('DtRightSidebarContentComponent', () => {
  let component: DtRightSidebarContentComponent;
  let fixture: ComponentFixture<DtRightSidebarContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtRightSidebarContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DtRightSidebarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
