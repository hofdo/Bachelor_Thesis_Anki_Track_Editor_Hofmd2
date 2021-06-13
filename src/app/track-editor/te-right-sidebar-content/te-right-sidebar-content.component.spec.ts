import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeRightSidebarContentComponent } from './te-right-sidebar-content.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

describe('TeRightSidebarContentComponent', () => {
  let component: TeRightSidebarContentComponent;
  let fixture: ComponentFixture<TeRightSidebarContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeRightSidebarContentComponent ],
      imports: [MatDialogModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeRightSidebarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
