import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {CommonDirectiveModule} from '../directive/common-directive.module';
import {ExportService} from '../services/export.service';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';

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
    CommonModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ScrollingModule,
    MatCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: DigitalTwinComponent
      }
    ]),
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
    CommonDirectiveModule,
    HttpClientModule,
    MatSnackBarModule,
    MatBottomSheetModule
  ],
  providers: [
    ExportService
  ]
})
export class DigitalTwinModule { }
