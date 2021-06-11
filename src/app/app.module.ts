import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SideNavLeftService} from './services/side-nav-left.service';
import {SideNavRightService} from './services/side-nav-right.service';
import {TrackEditorModule} from './track-editor/track-editor.module';
import {AppRoutingModule} from './app-routing.module';
import {DigitalTwinModule} from './digital-twin/digital-twin.module';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    TrackEditorModule,
    DigitalTwinModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [
    SideNavLeftService,
    SideNavRightService,
  ]
})
export class AppModule {
}
