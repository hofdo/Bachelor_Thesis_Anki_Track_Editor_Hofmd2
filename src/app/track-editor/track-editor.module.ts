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
import { CommonModule } from '@angular/common';
import {
  TrackEditorComponent,
  TrackEditorExportContentDialog,
  TrackEditorImportContentDialog,
  TrackEditorLeaveSiteDialog,
  TrackEditorSettingsContentDialog, TrackEditorSnackBar
} from './track-editor.component';
import {TrackEditorGridsterItemContentComponent} from './track-editor-gridster-item-content/track-editor-gridster-item-content.component';
import {TeRightSidebarContentComponent, TrackEditorRightSidebarDialog} from './te-right-sidebar-content/te-right-sidebar-content.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {TrackEditorCanDeactivateGuard} from './guard/track-editor-can-deactivate.guard';
import {MatProgressBarModule} from '@angular/material/progress-bar';

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
    TrackEditorSnackBar
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TrackEditorComponent,
        canDeactivate: [TrackEditorCanDeactivateGuard]
      }
    ]),
  ],
  providers: [TrackEditorCanDeactivateGuard]
})
export class TrackEditorModule { }
