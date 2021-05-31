import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TrackEditorComponent,
  TrackEditorExportContentDialog,
  TrackEditorImportContentDialog,
  TrackEditorLeaveSiteDialog,
  TrackEditorSettingsContentDialog
} from './track-editor.component';
import {TrackEditorGridsterItemContentComponent} from './track-editor-gridster-item-content/track-editor-gridster-item-content.component';
import {TeRightSidebarContentComponent, TrackEditorRightSidebarDialog} from './te-right-sidebar-content/te-right-sidebar-content.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {GridsterModule} from 'angular-gridster2';
import {RouterModule} from '@angular/router';
import {CommonDirectiveModule} from '../directive/common-directive.module';

@NgModule({
  declarations: [
    TrackEditorComponent,
    TeRightSidebarContentComponent,
    TrackEditorSettingsContentDialog,
    TrackEditorRightSidebarDialog,
    TrackEditorExportContentDialog,
    TrackEditorImportContentDialog,
    TrackEditorGridsterItemContentComponent,
    TrackEditorLeaveSiteDialog,
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    GridsterModule,
    CommonDirectiveModule,
    RouterModule.forChild([
      {
        path: '',
        component: TrackEditorComponent
      }
    ])
  ]
})
export class TrackEditorModule { }
