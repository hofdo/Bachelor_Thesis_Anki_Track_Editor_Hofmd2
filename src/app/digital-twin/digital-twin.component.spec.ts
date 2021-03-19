import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalTwinComponent } from './digital-twin.component';

describe('DigitalTwinComponent', () => {
  let component: DigitalTwinComponent;
  let fixture: ComponentFixture<DigitalTwinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalTwinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalTwinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
