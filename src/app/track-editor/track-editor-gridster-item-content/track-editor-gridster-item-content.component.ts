import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

/**
 * This component has the content of the grid-element and states for the rotation animation
 */

@Component({
  selector: 'app-gridster-item-content',
  templateUrl: './track-editor-gridster-item-content.component.html',
  styleUrls: ['./track-editor-gridster-item-content.component.css'],
  animations: [
    //The states for rotating the track pieces in the grid-system
    trigger('rotatedState', [
      state('0', style({ transform: 'rotate(0deg)' })),
      state('90', style({ transform: 'rotate(90deg)' })),
      state('180', style({ transform: 'rotate(180deg)' })),
      state('270', style({ transform: 'rotate(270deg)' })),
      transition('0 => 90', animate('250ms ease-out')),
      transition('90 => 180', animate('250ms ease-out')),
      transition('180 => 270', animate('250ms ease-out')),
      transition('270 => 0', animate('400ms ease-out')),
    ])
  ]
})
export class TrackEditorGridsterItemContentComponent implements OnInit, OnDestroy{

  //Event Emitter to the parent component
  @Output() remove_grid_item = new EventEmitter()
  @Output() rotate_grid_item = new EventEmitter()

  //Input from the parent component
  @Input() grid_item: any;
  @Input() degree: string;

  state: string = '0';

  constructor() { }

  ngOnInit(): void {
    this.state = this.degree;
  }

  ngOnDestroy(): void {
  }

  /**
   * This function rotates the track piece by 90 degree
   */
  rotate() {
    if(this.state === '0'){
      this.state = '90'
    }
    else if(this.state === '90'){
      this.state = '180'
    }
    else if(this.state === '180'){
      this.state = '270'
    }
    else {
      this.state = '0'
    }
    //Calls the Eventemitter and sends the data, that the track piece has been rotated by 90 degree
    this.rotate_grid_item.emit({degree: this.state, id: this.grid_item.id})
  }

  /**
   * This function deletes a track-piece grid-element from the grid-system
   * @param event: The data from the event
   * @param item: The grid-item that should be deleted
   */
  removeItem(event: MouseEvent | TouchEvent, item) {
    this.remove_grid_item.emit({event: event, item: item})
  }

}
