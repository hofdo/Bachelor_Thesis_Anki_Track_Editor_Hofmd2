import { TestBed } from '@angular/core/testing';

import { SideNavLeftService } from './side-nav-left.service';

describe('SideNavLeftService', () => {
  let service: SideNavLeftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideNavLeftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
