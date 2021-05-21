import {TrackPiece} from './track-piece';

export class TrackPieceCurve extends TrackPiece {

  private _currentTrackPositionID: number

  constructor(offset, trackPieceID) {
    super("curve", offset, trackPieceID);
  }


  get currentTrackPositionID(): number {
    return this._currentTrackPositionID;
  }

  set currentTrackPositionID(value: number) {
    this._currentTrackPositionID = value;
  }
}
