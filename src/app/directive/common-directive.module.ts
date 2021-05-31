import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialCardElevationDirective} from './material-card-elevation.directive';



@NgModule({
  declarations: [
    MaterialCardElevationDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialCardElevationDirective
  ]
})
export class CommonDirectiveModule { }
