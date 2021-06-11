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
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {TrackEditorCanDeactivateGuard} from './guard/track-editor-can-deactivate.guard';

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
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TrackEditorComponent,
        canDeactivate: [TrackEditorCanDeactivateGuard]
      }
    ])
  ],
  providers: [TrackEditorCanDeactivateGuard]
})
export class TrackEditorModule { }
