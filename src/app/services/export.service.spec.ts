import {TestBed} from '@angular/core/testing';

import { ExportService } from './export.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule, HttpEvent} from '@angular/common/http';

describe('ExportService', () => {
  let service: ExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('ExportService REST API Requests', () => {
  let service: ExportService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ExportService]
    });
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
    service = TestBed.get(ExportService);
  });

  it('should return a exported image', (done) => {
    const dummyParam = {
      type: "straight",
      lanes: "16",
      track_id: "55"
    }

    service.exportEach(dummyParam.type, dummyParam.lanes, dummyParam.track_id).subscribe((data: Blob) => {
      expect(data.type).toEqual("image/png")
      expect(data.size).toBeGreaterThan(0)
      done()
    })
  })

  it('should return a merged image of all the track pieces', (done) => {
    const dummyParam = {
      list: [{"item":{"x":1,"y":1,"cols":1,"rows":1,"id":2,"degree":"90","lanes":"8","track_id":"15"},"type":"straight","url":"http://localhost:8081/image?type=straight&lanes=8&track_id=15","id":2},{"item":{"x":1,"y":0,"cols":1,"rows":1,"id":4,"degree":"90","lanes":"8","track_id":"16"},"type":"straight","url":"http://localhost:8081/image?type=straight&lanes=8&track_id=16","id":4},{"item":{"x":0,"y":0,"cols":1,"rows":1,"id":5,"degree":"270","lanes":"8","track_id":"50"},"type":"curve","url":"http://localhost:8081/image?type=curve&lanes=8&track_id=50","id":5},{"item":{"x":0,"y":1,"cols":1,"rows":1,"id":6,"degree":"180","lanes":"8","track_id":"51"},"type":"curve","url":"http://localhost:8081/image?type=curve&lanes=8&track_id=51","id":6},{"item":{"x":2,"y":1,"cols":1,"rows":1,"id":7,"degree":"90","lanes":"8","track_id":"52"},"type":"curve","url":"http://localhost:8081/image?type=curve&lanes=8&track_id=52","id":7},{"item":{"x":2,"y":0,"cols":1,"rows":1,"id":8,"degree":0,"lanes":"8","track_id":"53"},"type":"curve","url":"http://localhost:8081/image?type=curve&lanes=8&track_id=53","id":8}],
      rows: "3",
      cols: "2",
      type: "png"
    }

    service.exportSingle(dummyParam.list, dummyParam.rows, dummyParam.cols, dummyParam.type).subscribe((data: Blob) => {
      expect(data.type).toEqual("image/png")
      expect(data.size).toBeGreaterThan(0)
      done()
    })
  })
})
