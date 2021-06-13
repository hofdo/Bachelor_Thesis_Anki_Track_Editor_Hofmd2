/**
 *
 * The MIT License

 Copyright (c) 2010-2021 Google LLC. http://angular.io/license

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import { NgModule } from '@angular/core';
import {
  DigitalTwinComponent,
  DigitalTwinImportContentDialog,
  DigitalTwinLoadingSnackBar,
  DigitalTwinSettingsContentDialog
} from './digital-twin.component';
import {
  DigitalTwinRightSidebarConsole,
  DigitalTwinRightSidebarDialog,
  DtRightSidebarContentComponent
} from './dt-right-sidebar-content/dt-right-sidebar-content.component';
import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';
import {RouterModule} from '@angular/router';
import {ExportService} from '../services/export.service';
import {SharedModule} from '../shared/shared.module';

/**
 * Set the Broker Address for the mqtt configuration
 */
let mqtt_broker
//localStorage.setItem("mqtt_broker", "192.168.1.121")
if (localStorage.getItem("mqtt_broker") !== null){
  mqtt_broker = localStorage.getItem("mqtt_broker")
}
else {
  mqtt_broker = 'localhost'
}

/**
 * Configuration for the mqtt service
 */
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: mqtt_broker,
  port: 9001,
  path: '/mqtt'
};

/**
 * Module for the Digital Twin
 */
@NgModule({
  declarations: [
    DigitalTwinComponent,
    DtRightSidebarContentComponent,
    DigitalTwinSettingsContentDialog,
    DigitalTwinRightSidebarDialog,
    DigitalTwinRightSidebarConsole,
    DigitalTwinImportContentDialog,
    DigitalTwinLoadingSnackBar
  ],
  imports: [
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DigitalTwinComponent
      }
    ]),
  ],
  providers: [
    ExportService
  ]
})
export class DigitalTwinModule { }
