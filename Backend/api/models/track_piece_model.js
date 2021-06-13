let mongoose = require("mongoose")

const track_schema = new mongoose.Schema({
    track_id: String,
    lanes: String,
    type: String,
    Data: Buffer
})

module.exports = mongoose.model("Track", track_schema)
