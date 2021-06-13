import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalTwinComponent } from './digital-twin.component';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';
import {SharedModule} from '../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

let mqtt_broker
//localStorage.setItem("mqtt_broker", "192.168.1.121")
if (localStorage.getItem("mqtt_broker") !== null){
  mqtt_broker = localStorage.getItem("mqtt_broker")
}
else {
  mqtt_broker = 'localhost'
}

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: mqtt_broker,
  port: 9001,
  path: '/mqtt'
};

describe('DigitalTwinComponent', () => {
  let component: DigitalTwinComponent;
  let fixture: ComponentFixture<DigitalTwinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalTwinComponent],
      imports: [MatDialogModule, HttpClientModule, MatSnackBarModule, MqttModule.forRoot(MQTT_SERVICE_OPTIONS), BrowserAnimationsModule]
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
