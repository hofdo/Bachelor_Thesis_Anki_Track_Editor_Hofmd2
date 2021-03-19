import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {SideNavLeftService} from './Services/side-nav-left.service';
import {SideNavRightService} from './Services/side-nav-right.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import {TrackEditorComponent, TrackEditorSettingsContentDialog} from './track-editor/track-editor.component';
import {DigitalTwinComponent, DigitalTwinSettingsContentDialog} from './digital-twin/digital-twin.component';
import {DigitalTwinRightSidebarDialog, DtRightSidebarContentComponent} from './dt-right-sidebar-content/dt-right-sidebar-content.component';
import {TeRightSidebarContentComponent, TrackEditorRightSidebarDialog} from './te-right-sidebar-content/te-right-sidebar-content.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MaterialCardElevationDirective } from './material-card-elevation.directive';



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
    TrackEditorRightSidebarDialog
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'TrackEditor', pathMatch: 'full'},
      {path: 'TrackEditor', component: TrackEditorComponent},
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
  ],
  providers: [SideNavLeftService, SideNavRightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
