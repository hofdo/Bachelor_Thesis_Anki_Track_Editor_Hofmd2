import {TrackPiece} from './track-piece';

export class TrackPieceIntersection extends TrackPiece {

  private _lastIntersectionCode: number;
  private _isExisting: boolean;

  constructor(offset, trackPieceID) {
    super('intersection', offset, trackPieceID);
  }


  get lastIntersectionCode(): number {
    return this._lastIntersectionCode;
  }

  set lastIntersectionCode(value: number) {
    this._lastIntersectionCode = value;
  }

  get isExisting(): boolean {
    return this._isExisting;
  }

  set isExisting(value: boolean) {
    this._isExisting = value;
  }
}
