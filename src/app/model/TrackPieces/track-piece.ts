export class TrackPiece {

  private _offset: string
  private _trackPieceID: number

  constructor(offset, trackPieceID) {
    this._offset = offset
    this._trackPieceID = trackPieceID
  }

  get offset(): string {
    return this._offset;
  }

  set offset(value: string) {
    this._offset = value;
  }

  get trackPieceID(): number {
    return this._trackPieceID;
  }

  set trackPieceID(value: number) {
    this._trackPieceID = value;
  }
}
