import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/**
 * Service for sharing the list of connected cars and car_ids between two components
 */
@Injectable({
  providedIn: 'root'
})
export class DtCarListSharingService {

  private messageSource = new BehaviorSubject<Map<String, any>>(null);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  /**
   * This function changes the message that will be transmitted from one component to another
   * @param message
   */
  changeMessage(message: Map<String,any>) {
    this.messageSource.next(message)
  }
}
