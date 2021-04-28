import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {SideNavLeftService} from './services/side-nav-left.service';
import {SideNavRightService} from './services/side-nav-right.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import {
  TrackEditorComponent,
  TrackEditorExportContentDialog, TrackEditorImportContentDialog, TrackEditorLeaveSiteDialog,
  TrackEditorSettingsContentDialog
} from './track-editor/track-editor.component';
import {DigitalTwinComponent, DigitalTwinSettingsContentDialog} from './digital-twin/digital-twin.component';
import {
  DigitalTwinRightSidebarConsole,
  DigitalTwinRightSidebarDialog,
  DtRightSidebarContentComponent
} from './dt-right-sidebar-content/dt-right-sidebar-content.component';
import {TeRightSidebarContentComponent, TrackEditorRightSidebarDialog} from './te-right-sidebar-content/te-right-sidebar-content.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MaterialCardElevationDirective} from './material-card-elevation.directive';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatGridListModule} from '@angular/material/grid-list';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {GridsterModule} from 'angular-gridster2';
import {HttpClientModule} from '@angular/common/http';
import {FileSaverModule} from 'ngx-filesaver';
import {TrackEditorGridsterItemContentComponent} from './track-editor/track-editor-gridster-item-content/track-editor-gridster-item-content.component';
import {TrackEditorCanDeactivateGuard} from './track-editor/track-editor-can-deactivate.guard';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TrackEditorComponent,
    DigitalTwinComponent,
    DtRightSidebarContentComponent,
    TeRightSidebarContentComponent,
    TrackEditorSettingsContentDialog,
    DigitalTwinSettingsContentDialog,
    MaterialCardElevationDirective,
    MaterialCardElevationDirective,
    DigitalTwinRightSidebarDialog,
    TrackEditorRightSidebarDialog,
    DigitalTwinRightSidebarConsole,
    TrackEditorExportContentDialog,
    TrackEditorImportContentDialog,
    TrackEditorGridsterItemContentComponent,
    TrackEditorLeaveSiteDialog
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'TrackEditor', pathMatch: 'full'},
      {path: 'TrackEditor', component: TrackEditorComponent, canDeactivate: [TrackEditorCanDeactivateGuard]},
      {path: 'DigitalTwin', component: DigitalTwinComponent},
    ]),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    ScrollingModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatGridListModule,
    DragDropModule,
    GridsterModule,
    HttpClientModule,
    FileSaverModule,
    ReactiveFormsModule
  ],
  providers: [
    SideNavLeftService,
    SideNavRightService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
