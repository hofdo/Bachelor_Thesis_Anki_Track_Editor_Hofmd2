import {GridsterItem} from 'angular-gridster2';

export class GridItem {
  private _type: string
  private _url: string
  private _id: number
  private _degree: number
  private _x_cord: number
  private _y_cord: number
  private _row: number
  private _col: number

  constructor(
    type: string,
    url: string,
    id: number,
    degree: number,
    _x_cord: number,
    _y_cord: number,
    _row: number,
    _col: number
    ) {
    this._type = type;
    this._url = url;
    this._id = id;
    this._degree = degree;
    this._x_cord = _x_cord;
    this._y_cord = _y_cord;
    this._row = _row;
    this._col = _col;
  }


  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get degree(): number {
    return this._degree;
  }

  set degree(value: number) {
    this._degree = value;
  }

  get x_cord(): number {
    return this._x_cord;
  }

  set x_cord(value: number) {
    this._x_cord = value;
  }

  get y_cord(): number {
    return this._y_cord;
  }

  set y_cord(value: number) {
    this._y_cord = value;
  }

  get row(): number {
    return this._row;
  }

  set row(value: number) {
    this._row = value;
  }

  get col(): number {
    return this._col;
  }

  set col(value: number) {
    this._col = value;
  }
}
