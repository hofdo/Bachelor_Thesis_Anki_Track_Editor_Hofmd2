import {TrackPiece} from './TrackPieces/track-piece';

export class Car {

  private _address: string = "";
  private _identifier: string = "";
  private _model: string = "";
  private _modelId: string = "";
  private _productId: string = "";
  private _isCharging: boolean = false;
  private _isOnTrack: boolean = false;
  private _version: string = "";
  private _batteryLevel: string = "";
  private _offset: string = "0";
  private _speed: string = "0";
  private _currentTrackPieceID: number = 0
  private _lastTrackPieceID: number = 0
  private _lastTrackPositionID: number = 0
  private _leftWheelDistance: number = 0
  private _rightWheelDistance: number = 0
  private _isReverse: boolean
  private _isExiting: boolean = false
  private _isDelocalized: boolean

  constructor() {
  }


  get currentTrackPieceID(): number {
    return this._currentTrackPieceID;
  }

  set currentTrackPieceID(value: number) {
    this._currentTrackPieceID = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get identifier(): string {
    return this._identifier;
  }

  set identifier(value: string) {
    this._identifier = value;
  }

  get model(): string {
    return this._model;
  }

  set model(value: string) {
    this._model = value;
  }

  get modelId(): string {
    return this._modelId;
  }

  set modelId(value: string) {
    this._modelId = value;
  }

  get productId(): string {
    return this._productId;
  }

  set productId(value: string) {
    this._productId = value;
  }

  get isCharging(): boolean {
    return this._isCharging;
  }

  set isCharging(value: boolean) {
    this._isCharging = value;
  }

  get isOnTrack(): boolean {
    return this._isOnTrack;
  }

  set isOnTrack(value: boolean) {
    this._isOnTrack = value;
  }

  get version(): string {
    return this._version;
  }

  set version(value: string) {
    this._version = value;
  }

  get batteryLevel(): string {
    return this._batteryLevel;
  }

  set batteryLevel(value: string) {
    this._batteryLevel = value;
  }

  get offset(): string {
    return this._offset;
  }

  set offset(value: string) {
    this._offset = value;
  }

  get speed(): string {
    return this._speed;
  }

  set speed(value: string) {
    this._speed = value;
  }

  get lastTrackPieceID(): number {
    return this._lastTrackPieceID;
  }

  set lastTrackPieceID(value: number) {
    this._lastTrackPieceID = value;
  }

  get lastTrackPositionID(): number {
    return this._lastTrackPositionID;
  }

  set lastTrackPositionID(value: number) {
    this._lastTrackPositionID = value;
  }

  get leftWheelDistance(): number {
    return this._leftWheelDistance;
  }

  set leftWheelDistance(value: number) {
    this._leftWheelDistance = value;
  }

  get rightWheelDistance(): number {
    return this._rightWheelDistance;
  }

  set rightWheelDistance(value: number) {
    this._rightWheelDistance = value;
  }

  get isReverse(): boolean {
    return this._isReverse;
  }

  set isReverse(value: boolean) {
    this._isReverse = value;
  }

  get isExiting(): boolean {
    return this._isExiting;
  }

  set isExiting(value: boolean) {
    this._isExiting = value;
  }

  get isDelocalized(): boolean {
    return this._isDelocalized;
  }

  set isDelocalized(value: boolean) {
    this._isDelocalized = value;
  }
}
