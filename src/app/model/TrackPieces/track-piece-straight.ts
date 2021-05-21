import {TrackPiece} from './track-piece';

export class TrackPieceStraight extends TrackPiece {

  private _currentTrackPositionID: number

  constructor(offset, trackPieceID) {
  super("straight", offset, trackPieceID);
  }

  get currentTrackPositionID(): number {
    return this._currentTrackPositionID;
  }

  set currentTrackPositionID(value: number) {
    this._currentTrackPositionID = value;
  }
}
