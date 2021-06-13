/**
 *The MIT License

 Copyright (c) 2010-2021 Google LLC. http://angular.io/license

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 *
 */

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
let routes = require('./api/routes/rest_routes.js')
const env = require('./env/env.js')

const db = mongoose.connection

let app = express();
app.use(cors())
routes(app)

/**
 *
 */
mongoose.connect(process.env.mongo_ip+':'+process.env.mongo_port, { user: 'admin', pass:'32-5#v3a1yoa9ekaI`<w+%;', useNewUrlParser: true, useUnifiedTopology: true })

/**
 *
 * @type {http.Server}
 */
let server = app.listen(process.env.http_port, process.env.http_ip,function () {
    let host = server.address().address
    let port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

//
db.on('error', console.error.bind(console, 'connection error:'));

//
db.once("open", function () {
    console.log("Connected")
})

/**
 *
 */

process.on('exit', code => {
    console.log("exit")
    db.close()
    process.exit()
});

/**
 *
 */

process.on('SIGINT', code => {
    console.log("CTRL+C")
    db.close()
    process.exit()
});



