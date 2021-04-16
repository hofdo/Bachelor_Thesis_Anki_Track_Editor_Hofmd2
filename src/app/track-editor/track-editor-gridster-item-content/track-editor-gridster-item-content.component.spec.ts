import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackEditorGridsterItemContentComponent } from './track-editor-gridster-item-content.component';

describe('GridsterItemContentComponent', () => {
  let component: TrackEditorGridsterItemContentComponent;
  let fixture: ComponentFixture<TrackEditorGridsterItemContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackEditorGridsterItemContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackEditorGridsterItemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
