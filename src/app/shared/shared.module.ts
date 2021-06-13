import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {GridsterModule} from 'angular-gridster2';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MaterialCardElevationDirective} from './material-card-elevation.directive';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';

/**
 * In this module the Modules that are shared with a multitude of other modules are imported
 */

@NgModule({
  declarations: [
    MaterialCardElevationDirective
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    GridsterModule,
    MatDialogModule,
  ],
  exports: [
    MaterialCardElevationDirective,
    CommonModule,
    ScrollingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    GridsterModule,
    MatDialogModule,
    MatProgressBarModule
  ]
})
export class SharedModule { }
