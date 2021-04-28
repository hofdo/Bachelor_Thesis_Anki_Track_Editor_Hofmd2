import { TestBed } from '@angular/core/testing';

import { TrackEditorCanDeactivateGuard } from './track-editor-can-deactivate.guard';

describe('TrackEditorCanDeactivateGuard', () => {
  let guard: TrackEditorCanDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TrackEditorCanDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
