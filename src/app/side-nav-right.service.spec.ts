import { TestBed } from '@angular/core/testing';

import { SideNavRightService } from './side-nav-right.service';

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
