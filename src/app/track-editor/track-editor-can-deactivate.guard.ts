import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {TrackEditorComponent} from './track-editor.component';

@Injectable({
  providedIn: 'root'
})
export class TrackEditorCanDeactivateGuard implements CanDeactivate<TrackEditorComponent> {
  canDeactivate(component){
    return component.canDeactivate();
  }

}
