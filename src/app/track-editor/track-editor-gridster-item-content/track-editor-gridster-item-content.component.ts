import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-gridster-item-content',
  templateUrl: './track-editor-gridster-item-content.component.html',
  styleUrls: ['./track-editor-gridster-item-content.component.css'],
  animations: [
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

  @Output() remove_grid_item = new EventEmitter()
  @Output() rotate_grid_item = new EventEmitter()
  @Input() grid_item: any;
  @Input() degree: string;

  state: string = '0';

  constructor() { }

  ngOnInit(): void {
    this.state = this.degree;
  }

  ngOnDestroy(): void {
  }

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
    this.rotate_grid_item.emit({degree: this.state, id: this.grid_item.id})
  }

  removeItem(event: MouseEvent | TouchEvent, item) {
    this.remove_grid_item.emit({event: event, item: item})
  }

}
