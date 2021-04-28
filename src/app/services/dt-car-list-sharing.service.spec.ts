import { TestBed } from '@angular/core/testing';

import { DtCarListSharingService } from './dt-car-list-sharing.service';

describe('DtCarListSharingService', () => {
  let service: DtCarListSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DtCarListSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
