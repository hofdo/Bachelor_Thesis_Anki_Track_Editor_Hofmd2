'use strict'

module.exports = function(app) {
    let mongoController = require('../../controller/mongoDBController');
    let trackGeneratorController = require('../../controller/imageGeneratorController');
    const bodyParser = require('body-parser')

    let parser = bodyParser.json()

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

        mongoController.findTrack(track_id, type, lanes).then(value => {
            if (value !== null){
                data = value.Data
            }
            else {
                if (req.query["left"] !== undefined) {
                    left = req.query["left"]
                    data = trackGeneratorController.drawTrackPiece(type, track_id, lanes, left, right)
                }
                else {
                    data = trackGeneratorController.drawTrackPiece(type, track_id, lanes)
                }
                mongoController.createTrack(track_id, lanes, type, data)
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
        let data = trackGeneratorController.drawImage(grid_items, rows, cols)
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

};
