let mongoose = require("mongoose")

let track = require('../api/models/track_piece_model')

exports.createTrack = function (track_id, lanes, type, data) {
    let new_track = new track({
        track_id: track_id, lanes: lanes, type: type, Data: data
    })
    return new_track.save()
}

exports.findTrack = function (track_id, type, lanes){
    return track.findOne({track_id: track_id, type: type, lanes: lanes}).exec()
}
