import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import {TrackEditorComponent} from '../track-editor.component';

/**
 * This guard checks if the user created a track and wants to take it over to the digital twin
 */

@Injectable({
  providedIn: 'root'
})
export class TrackEditorCanDeactivateGuard implements CanDeactivate<TrackEditorComponent> {
  canDeactivate(component){
    return component.canDeactivate();
  }

}
