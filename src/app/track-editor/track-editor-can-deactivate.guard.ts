import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import {TrackEditorComponent} from './track-editor.component';

@Injectable({
  providedIn: 'root'
})
export class TrackEditorCanDeactivateGuard implements CanDeactivate<TrackEditorComponent> {
  canDeactivate(component){
    return component.canDeactivate();
  }

}
