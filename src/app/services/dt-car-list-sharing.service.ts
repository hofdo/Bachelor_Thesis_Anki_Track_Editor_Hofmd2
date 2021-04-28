import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Car} from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class DtCarListSharingService {

  private messageSource = new BehaviorSubject<Map<String, any>>(null);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: Map<String,any>) {
    this.messageSource.next(message)
  }
}
