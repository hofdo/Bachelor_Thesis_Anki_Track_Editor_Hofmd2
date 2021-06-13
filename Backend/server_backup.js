const express = require('express');
const cors = require('cors')
const fs = require('fs')
const bodyParser = require('body-parser')
const emitter = require('events').EventEmitter
const {createCanvas, loadImage} = require('canvas')
const mongoose = require('mongoose');
const track_generator = require("./utils/track_editor_generator")

const HEIGHT_IMAGE = 2146
const WIDTH_IMAGE = 2146

let app = express();
let parser = bodyParser.json()
app.use(cors())
let em = new emitter()

const db = mongoose.connection

const track_schema = new mongoose.Schema({
    track_id: String,
    lanes: String,
    type: String,
    Data: Buffer
})
const track = mongoose.model("track", track_schema)

let db_track

//MongoDB

mongoose.connect('mongodb://185.143.45.71:27017', { user: 'admin', pass:'32-5#v3a1yoa9ekaI`<w+%;', useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', console.error.bind(console, 'connection error:'));

db.once("open", function () {
    console.log("Connected")
})


//Get image
app.get('/image', function (req, res) {
    let type = req.query["type"]
    let track_id = req.query["track_id"]
    let lanes = req.query["lanes"]
    let left = 0
    let right = 0
    let middle = 0
    let data
    let im = ""

    track.findOne({track_id: track_id, type: type, lanes: lanes}).exec().then(value => {
        if (value !== null){
            data = value.Data
        }
        else {
            if (req.query["left"] !== undefined) {
                left = req.query["left"]
                data = drawTrackPiece(type, track_id, lanes, left, right)
            }
            else {
                data = drawTrackPiece(type, track_id, lanes)
            }
            db_track = new track({
                track_id: track_id, lanes: lanes, type: type, Data: data
            })
            db_track.save()
        }
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': data.length
        });
        res.end(data);
    })

})

app.post("/export", parser, (req, res) => {
    let grid_items = req.body
    let rows = req.query["maxRows"]
    let cols = req.query["maxCols"]
    let data = drawImage(grid_items, rows, cols)
    data.then((dat) => {

        const im = dat.toDataURL().split(",")[1];

        const img = Buffer.from(im, 'base64');

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
    })


})

let server = app.listen(8081, function () {
    let host = server.address().address
    let port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

/**
 *
 * @param grid_items
 * @param rows
 * @param cols
 * @returns {Promise<Canvas>}
 */

async function drawImage(grid_items, rows, cols) {
    let canvas = createCanvas(WIDTH_IMAGE * rows, HEIGHT_IMAGE * cols)
    let ctx = canvas.getContext('2d')
    let buffer

    for (let grid of grid_items){
        const grid_data = await track.findOne({track_id: grid.item.track_id, type: grid.type, lanes: grid.item.lanes})

        if (grid_data !== null){
            buffer = grid_data.Data
        }
        else {
            buffer = drawTrackPiece(grid.type, grid.item.track_id, grid.item.lanes, grid.item.left, grid.item.right)
        }
        let degree

        switch (grid.item.degree.toString()) {
            case "0":
                degree = 0
                break
            case "90":
                degree = Math.PI / 2
                break
            case "180":
                degree = Math.PI
                break
            case "270":
                degree = 3 * Math.PI / 2
                break
        }

        loadImage(buffer).then((image) => {
            ctx.save()
            ctx.translate(((grid.item.x + 1) * WIDTH_IMAGE) - 1073, ((grid.item.y + 1) * HEIGHT_IMAGE) - 1073);
            ctx.rotate(degree);
            ctx.drawImage(image, -1073, -1073, WIDTH_IMAGE, HEIGHT_IMAGE)
            ctx.restore()
        })
    }
    return canvas
}

function drawTrackPiece(type, track_id, lanes, left, right){
    let data
    switch (type) {
        case "straight":
            data = track_generator.drawStraightTrack(track_id, lanes)
            break
        case "curve":
            data = track_generator.drawCurveTrack(track_id, lanes)
            break
        case "intersection":
            data = track_generator.drawIntersectiontTrack(lanes)
            break
        case "junction":
            data = track_generator.drawJunctionTrack(track_id, lanes, left, right)
            break
    }
    return data
}

/**
 *
 */

process.on('exit', code => {
    console.log("exit")
    em.removeAllListeners()
    db.close()
    process.exit()
});

/**
 *
 */

process.on('SIGINT', code => {
    console.log("CTRL+C")
    em.removeAllListeners()
    db.close()
    process.exit()
});



