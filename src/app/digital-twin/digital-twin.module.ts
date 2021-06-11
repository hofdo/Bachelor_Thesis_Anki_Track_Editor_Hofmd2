import { NgModule } from '@angular/core';
import {DigitalTwinComponent, DigitalTwinImportContentDialog, DigitalTwinSettingsContentDialog} from './digital-twin.component';
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
import {MatDialogModule} from '@angular/material/dialog';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '192.168.1.121',
  port: 9001,
  path: '/mqtt'
};

@NgModule({
  declarations: [
    DigitalTwinComponent,
    DtRightSidebarContentComponent,
    DigitalTwinSettingsContentDialog,
    DigitalTwinRightSidebarDialog,
    DigitalTwinRightSidebarConsole,
    DigitalTwinImportContentDialog,
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
