import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtRightSidebarContentComponent } from './dt-right-sidebar-content.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

describe('DtRightSidebarContentComponent', () => {
  let component: DtRightSidebarContentComponent;
  let fixture: ComponentFixture<DtRightSidebarContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtRightSidebarContentComponent ],
      imports: [MatDialogModule, MatSnackBarModule, MatBottomSheetModule]
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
