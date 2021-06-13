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

describe("DtCarListSharingService send Message", () => {

  let service: DtCarListSharingService;
  let service2: DtCarListSharingService;
  let map = new Map<String, any>()

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DtCarListSharingService);
    service2 = TestBed.inject(DtCarListSharingService);
  });
  map.set("test", "test")
  it('should send the message from the first service and receive it at the second', () => {
    service.changeMessage(map)

    service2.currentMessage.subscribe(value => {
      expect(value.get("test")).toEqual("test")
    })
  });
})

describe("DtCarListSharingService call Method", () => {

  let service: DtCarListSharingService;
  let service2: DtCarListSharingService;
  let map = new Map<String, any>()

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DtCarListSharingService);
    service2 = TestBed.inject(DtCarListSharingService);
  });


  it('should call method', () => {

    const spy_1 = spyOn(service, 'changeMessage').and.callThrough()
    service.changeMessage(map)
    expect(spy_1).toHaveBeenCalled()

  });
})

