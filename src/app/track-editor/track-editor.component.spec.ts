import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackEditorComponent } from './track-editor.component';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterTestingModule} from '@angular/router/testing';

describe('TrackEditorComponent', () => {
  let component: TrackEditorComponent;
  let fixture: ComponentFixture<TrackEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackEditorComponent ],
      imports: [MatDialogModule, HttpClientModule, MatSnackBarModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
