const {createCanvas, loadImage} = require('canvas')
let mongoController = require('./mongoDBController');
const fs = require('fs')

let straight_track_piece_conf = require('./track_piece_schema/straight_track_piece').straight_track_piece
let intersection_track_piece_conf = require('./track_piece_schema/intersection_track_piece').intersection_track_piece
let curve_track_piece_conf = require('./track_piece_schema/curve_track_piece').curve_track_piece
let junction_track_piece_conf_left = require('./track_piece_schema/junction_track_piece').junction_track_piece_left
let junction_track_piece_conf_right = require('./track_piece_schema/junction_track_piece').junction_track_piece_right
let junction_track_piece_code_conf = require('./track_piece_schema/junction_track_piece').junction_track_piece_code
let junction_track_piece_sidebar_conf = require('./track_piece_schema/junction_track_piece').junction_track_piece_side_line

const HEIGHT_IMAGE = 4292
const WIDTH_IMAGE = 4292

/**
 *
 * @param track_id
 * @param lanes
 * @returns {Buffer}
 */

function drawStraightTrack(track_id, lanes) {
    let binary = (track_id >>> 0).toString(2).split("");
    binary.reverse()
    console.log("Start Drawing Process")

    let straight

    //Calculate distance to outer part of the track
    let outer_distance = ((4292 - ((lanes * 90) + 80)) / 2)

    //x value where the first lane starts
    let start_x = WIDTH_IMAGE - outer_distance - 170
    let side_line_start = start_x

    let canvas = createCanvas(WIDTH_IMAGE, HEIGHT_IMAGE)
    let ctx = canvas.getContext('2d')


    for (let i = 0; i < lanes; i++) {

        straight = straight_track_piece_conf(start_x, outer_distance, side_line_start)

        let lane = i

        ctx = drawStraightStartLine(ctx, straight)

        ctx = drawStraightLineWithCodes(ctx, binary, straight, lane)

        ctx.drawImage(canvas, 0, 0)
        start_x -= 90
    }

    ctx = drawStraightSideLines(ctx, straight)

    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    console.log("Finished Drawing")
    return canvas.toBuffer()
}

/**
 *
 * @param lanes
 * @returns {Buffer}
 */

function drawInterSectionTrack(lanes) {
    let track_id = 10
    let binary = track_id.toString(2).split("")
    console.log("Start Drawing Process")

    let intersection

    let canvas = createCanvas(WIDTH_IMAGE, HEIGHT_IMAGE)
    let ctx = canvas.getContext('2d')

    //Calculate distance to outer part of the track
    let outer_distance = ((4292 - ((lanes * 90) + 80)) / 2)

    //x value where the first lane starts
    let start_val = WIDTH_IMAGE - outer_distance - 170

    for (let i = 0; i < lanes; i++) {

        intersection = intersection_track_piece_conf(start_val)

        drawIntersectionStartLineWithCode(ctx, intersection, binary)

        drawIntersectionLineWithIntersectionCode(ctx, intersection)

        ctx.drawImage(canvas, 0, 0)

        start_val -= 90
    }

    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    console.log("Finished Drawing")
    return canvas.toBuffer()
}

/**
 *
 * @param track_id
 * @param lanes
 * @returns {Buffer}
 */

function drawCurveTrack(track_id, lanes) {

    let binary = (track_id >>> 0).toString(2).split("");
    binary.reverse()
    console.log("Start Drawing Process")

    let curve

    let canvas = createCanvas(WIDTH_IMAGE, HEIGHT_IMAGE)
    let ctx = canvas.getContext('2d')

    //Define the start point of the arc in radiant
    let start = Math.PI * 3 / 2
    //Define the end point of the arc in radiant
    let end = 0
    //Calculate distance to outer part of the track
    let outer_distance = ((4292 - ((lanes * 90) + 80)) / 2) + 85
    let outer_distance_sideline = outer_distance
    let loc_code_counter = -1


    for (let i = 0; i < lanes; i++) {
        console.log(i)
        //Calculate the circumference of the whole circle
        const quarter_circumference = (outer_distance * Math.PI) / 2

        //Percentage length of the code piece
        const code_length_percent = (76 / quarter_circumference)
        const code_length_rad = code_length_percent * Math.PI / 2

        //Percentage length of the squares at the beginning and in the end
        const start_length_percent = (100 / quarter_circumference)
        const start_length_rad = start_length_percent * Math.PI / 2

        //Start Position for the code pieces
        let start_code = start + code_length_rad * 1.8

        //Calculate how many codes will fit on the arc
        let amount_of_codes = (quarter_circumference - 190) / (76 * 1.7)

        //Calculate how many numbered codes will be on the arc
        let amount_of_nub_codes = amount_of_codes - (amount_of_codes % 8)

        amount_of_codes = Math.floor(amount_of_codes)

        curve = curve_track_piece_conf(start, end, outer_distance, outer_distance_sideline, start_code, code_length_rad, start_length_rad)

        let res = drawCurveArcCode(ctx, curve, amount_of_codes, amount_of_nub_codes, outer_distance, start_code, code_length_rad, binary, loc_code_counter)
        ctx = res.ctx
        loc_code_counter = res.counter

        ctx = drawCurveStartArc(ctx, curve, outer_distance, end, start_length_rad, start)

        //Iterate distance for next lane
        outer_distance += 90
    }
    ctx = drawCurveSideLine(ctx, curve)

    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    console.log("Finished Drawing")

    return canvas.toBuffer()
}

/**
 *
 * @param track_id
 * @param lanes
 * @param left
 * @param right
 * @returns {Buffer}
 */

function drawJunctionTrack(track_id, lanes, left, right) {
    right = lanes - left

    let binary = track_id.toString(2).split("")
    binary.reverse()
    console.log("Start Drawing Process")

    let canvas = createCanvas(WIDTH_IMAGE, HEIGHT_IMAGE)
    let ctx = canvas.getContext('2d')

    //Define the start point of the arc in radiant
    let start = Math.PI * 3 / 2
    //Define the end point of the left arc in radiant
    let end_left = 0
    //Define the end point of the right arc in radiant
    let end_right = Math.PI

    //Calculate distance to outer part of the track
    let outer_distance_right = ((4292 - ((lanes * 90) + 80)) / 2) + 85
    let outer_distance_left = outer_distance_right

    let junction_sidebar = junction_track_piece_sidebar_conf(outer_distance_right, outer_distance_left, end_right, end_left, start)

    let loc_code_counter = -1

    ctx = drawJunctionSideLine(ctx, junction_sidebar)

    let res_left = drawJunctionArc(ctx, "left", left, outer_distance_left, start, end_left, loc_code_counter, binary)
    loc_code_counter = res_left.counter
    ctx = res_left.ctx
    console.log(loc_code_counter)
    let res_right = drawJunctionArc(ctx, "right", right, outer_distance_right, end_right, start, loc_code_counter, binary)
    loc_code_counter = res_right.counter
    ctx = res_right.ctx
    console.log(loc_code_counter)

    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    console.log("Finished Drawing")
    return canvas.toBuffer()
}

/**
 * CURVE Functions
 */

/**
 *
 * @param ctx
 * @param curve
 * @param amount_of_codes
 * @param amount_of_nub_codes
 * @param outer_distance
 * @param start_code
 * @param code_length_rad
 * @param binary
 * @param loc_code_counter
 * @returns {{ctx, counter}}
 */

function drawCurveArcCode(ctx, curve, amount_of_codes, amount_of_nub_codes, outer_distance, start_code, code_length_rad, binary, loc_code_counter) {

    //Draw the codes the car reads for information
    for (let j = 0; j < amount_of_codes; j++) {

        ctx.strokeStyle = "black"

        //Get the binary string of the current location code
        let binary_loc = (loc_code_counter >>> 0).toString(2).split("");
        binary_loc.reverse()

        //When the max amount of codes that carry information is drawn the rest of the codes will be drawn as the extra thick code, which signal the end of a section
        if (amount_of_nub_codes > 0) {
            //Every 8th code will signal the end of the 7 Bit long array
            if (j % 8 === 0) {
                //Draw the code that signals the car that a new section begins
                ctx.beginPath();
                ctx.lineWidth = curve.curve_code.transition.type_3.width
                ctx.arc(curve.curve_code.common_data.cord_x, curve.curve_code.common_data.cord_y, curve.curve_code.transition.type_3.radius, curve.curve_code.common_data.start, curve.curve_code.common_data.end, curve.curve_code.common_data.anti_clockwise);
                ctx.stroke();

                //Draw the code that signals the car that a new section begins
                ctx.beginPath();
                ctx.lineWidth = curve.curve_code.transition.type_1.width
                ctx.arc(curve.curve_code.common_data.cord_x, curve.curve_code.common_data.cord_y, curve.curve_code.transition.type_1.radius, curve.curve_code.common_data.start, curve.curve_code.common_data.end, curve.curve_code.common_data.anti_clockwise);
                ctx.stroke();
                loc_code_counter++
            } else {
                //Drawing the location ID code
                if (binary_loc[(j % 8) - 1] === "1") {
                    //Draw the location code for the binary value one
                    ctx.beginPath();
                    ctx.lineWidth = curve.curve_code.location.type_2.width
                    ctx.arc(curve.curve_code.common_data.cord_x, curve.curve_code.common_data.cord_y, curve.curve_code.location.type_2.radius, curve.curve_code.common_data.start, curve.curve_code.common_data.end, curve.curve_code.common_data.anti_clockwise);
                    ctx.stroke();
                } else {
                    //Draw the location code for the binary value zero
                    ctx.beginPath();
                    ctx.lineWidth = curve.curve_code.location.type_1.width
                    ctx.arc(curve.curve_code.common_data.cord_x, curve.curve_code.common_data.cord_y, curve.curve_code.location.type_1.radius, curve.curve_code.common_data.start, curve.curve_code.common_data.end, curve.curve_code.common_data.anti_clockwise);
                    ctx.stroke();
                }
                //Drawing the track ID Code
                if (binary[(j % 8) - 1] === "1") {
                    //draw the track id code for the binary value one
                    ctx.beginPath();
                    ctx.lineWidth = curve.curve_code.track.type_2.width
                    ctx.arc(curve.curve_code.common_data.cord_x, curve.curve_code.common_data.cord_y, curve.curve_code.track.type_2.radius, curve.curve_code.common_data.start, curve.curve_code.common_data.end, curve.curve_code.common_data.anti_clockwise);
                    ctx.stroke();
                } else {
                    //Draw code at the side of the arc that the car follows
                    ctx.beginPath();
                    ctx.lineWidth = curve.curve_code.track.type_1.width
                    ctx.arc(curve.curve_code.common_data.cord_x, curve.curve_code.common_data.cord_y, curve.curve_code.track.type_1.radius, curve.curve_code.common_data.start, curve.curve_code.common_data.end, curve.curve_code.common_data.anti_clockwise);
                    ctx.stroke();
                }
            }
        } else {
            //Draw code at the side of the arc that the car follows
            ctx.beginPath();
            ctx.lineWidth = curve.curve_code.transition.type_3.width
            ctx.arc(curve.curve_code.common_data.cord_x, curve.curve_code.common_data.cord_y, curve.curve_code.transition.type_3.radius, curve.curve_code.common_data.start, curve.curve_code.common_data.end, curve.curve_code.common_data.anti_clockwise);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = curve.curve_code.transition.type_1.width
            ctx.arc(curve.curve_code.common_data.cord_x, curve.curve_code.common_data.cord_y, curve.curve_code.transition.type_1.radius, curve.curve_code.common_data.start, curve.curve_code.common_data.end, curve.curve_code.common_data.anti_clockwise);
            ctx.stroke();
        }
        //start_code += code_length_rad * 1.7
        curve.curve_code.common_data.start += code_length_rad * 1.7
        curve.curve_code.common_data.end += code_length_rad * 1.7
        amount_of_nub_codes--
    }
    return {
        ctx: ctx,
        counter: loc_code_counter
    }
}

/**
 *
 * @param ctx
 * @param curve
 * @returns {*}
 */

function drawCurveStartArc(ctx, curve) {

    for (const [key, value] of Object.entries(curve.start)) {
        if (key !== "common_data"){
            ctx.beginPath();
            ctx.lineWidth = value.width
            ctx.strokeStyle = value.color
            ctx.arc(curve.start.common_data.cord_x, curve.start.common_data.cord_y, value.radius, value.start, value.end, value.anti_clockwise);
            ctx.stroke();
        }
    }
    return ctx
}

/**
 *
 * @param ctx
 * @param curve
 * @returns {*}
 */

function drawCurveSideLine(ctx, curve) {
    for (const [key, value] of Object.entries(curve.side_line)) {
        if (key !== "common_data"){
            ctx.beginPath();
            ctx.lineWidth = value.width
            ctx.strokeStyle = value.color
            ctx.arc(curve.side_line.common_data.cord_x, curve.side_line.common_data.cord_y, value.radius, value.start, value.end, value.anti_clockwise);
            ctx.stroke();
        }
    }

    return ctx
}

/**
 * CURVE Functions
 */


/**
 *
 * @param ctx
 * @param straight
 * @returns {*}
 */

function drawStraightStartLine(ctx, straight) {

    for (const [key, value] of Object.entries(straight)) {
        if (key !== "follow_line" && key !== "side_line"){
            if (key !== "middle"){
                //Draw both squares
                ctx.fillRect(value.square.left.cord_x, value.square.left.cord_y, value.square.left.width_x, value.square.left.height_y)
                ctx.fillRect(value.square.right.cord_x, value.square.right.cord_y, value.square.right.width_x, value.square.right.height_y)
            }
            //Drawing the Code that tells the car where the track starts or stops
            ctx.fillRect(value.transition_code_1.type_1.cord_x, value.transition_code_1.type_1.cord_y, value.transition_code_1.type_1.width_x, value.transition_code_1.type_1.height_y)
            ctx.fillRect(value.transition_code_1.type_3.cord_x, value.transition_code_1.type_3.cord_y, value.transition_code_1.type_3.width_x, value.transition_code_1.type_3.height_y)

            ctx.fillRect(value.transition_code_2.type_1.cord_x, value.transition_code_2.type_1.cord_y, value.transition_code_2.type_1.width_x, value.transition_code_2.type_1.height_y)
            ctx.fillRect(value.transition_code_2.type_3.cord_x, value.transition_code_2.type_3.cord_y, value.transition_code_2.type_3.width_x, value.transition_code_2.type_3.height_y)
        }
        else {
            //Draw the line the car follows
            ctx.fillRect(value.cord_x, value.cord_y, value.width_x, value.height_y)
        }
    }
    return ctx
}

/**
 *
 * @param ctx
 * @param binary
 * @param straight
 * @param lane
 * @returns {*}
 */

function drawStraightLineWithCodes(ctx, binary, straight, lane) {

    let default_location_id_code_top = 0
    let default_location_id_code_middle = 1
    let default_location_id_code_bottom = 2
    let loc_binary

    for (const [key, value] of Object.entries(straight)) {
        if (key !== "follow_line" && key !== "side_line"){
            switch (key){
                case "top":
                    let location_code_top = default_location_id_code_top + (lane * 3)
                    loc_binary = location_code_top.toString(2).split("").reverse()
                    break
                case "middle":
                    let location_code_middle = default_location_id_code_middle + (lane * 3)
                    loc_binary = location_code_middle.toString(2).split("").reverse()
                    break
                case "bottom":
                    let location_code_bottom = default_location_id_code_bottom + (lane * 3)
                    loc_binary = location_code_bottom.toString(2).split("").reverse()
                    break
            }
            //Draw the track ids and locations ids for the track at the top
            for (let k = 6; k >= 0; k--) {
                if (binary[k] === '1') {
                    ctx.fillRect(value.track_code.type_2.cord_x, value.track_code.common_data.cord_y, value.track_code.type_2.width_x, value.track_code.type_2.height_y)
                } else {
                    ctx.fillRect(value.track_code.type_1.cord_x, value.track_code.common_data.cord_y, value.track_code.type_1.width_x, value.track_code.type_1.height_y)
                }
                value.track_code.common_data.cord_y += 152
            }

            for (let k = 6; k >= 0; k--) {
                if (loc_binary[k] === '1') {
                    ctx.fillRect(value.location_code.type_2.cord_x, value.location_code.common_data.cord_y, value.location_code.type_2.width_x, value.location_code.type_2.height_y)
                } else {
                    ctx.fillRect(value.location_code.type_1.cord_x, value.location_code.common_data.cord_y, value.location_code.type_1.width_x, value.location_code.type_1.height_y)
                }
                value.location_code.common_data.cord_y += 152
            }

        }
    }

    return ctx
}

/**
 *
 * @param ctx
 * @param straight
 * @returns {*}
 */

function drawStraightSideLines(ctx, straight) {
    //
    for (const [key, value] of Object.entries(straight.side_line.lines)) {
        if (key !== "common_data"){
            //Draw the Sideline
            ctx.fillRect(value.left.cord_x, straight.side_line.lines.common_data.cord_y, value.left.width_x, straight.side_line.lines.common_data.height_y)
            ctx.fillRect(value.right.cord_x, straight.side_line.lines.common_data.cord_y, value.right.width_x,straight.side_line.lines.common_data.height_y)
        }
    }
    //
    for (const [key, value] of Object.entries(straight.side_line.square)) {
        if (key !== "common_data"){
            //Draw 3 side line squares at the top
            ctx.fillRect(straight.side_line.square.common_data.first.cord_x, value.cord_y, straight.side_line.square.common_data.first.width_x, straight.side_line.square.common_data.height_y)
            ctx.fillRect(straight.side_line.square.common_data.second.cord_x, value.cord_y, straight.side_line.square.common_data.second.width_x, straight.side_line.square.common_data.height_y)

            ctx.fillRect(straight.side_line.square.common_data.third.cord_x, value.cord_y, straight.side_line.square.common_data.third.width_x, straight.side_line.square.common_data.height_y)
            ctx.fillRect(straight.side_line.square.common_data.fourth.cord_x, value.cord_y, straight.side_line.square.common_data.fourth.width_x, straight.side_line.square.common_data.height_y)
        }
    }

    return ctx
}

/**
 * INTERSECTION Functions
 */

/**
 *
 * @param ctx
 * @param intersection
 * @param binary
 * @returns {*}
 */

function drawIntersectionStartLineWithCode(ctx, intersection, binary) {

    for (const [key, value] of Object.entries(intersection)) {
        if (key !== "connection_left_right" && key !== "connection_bottom_top") {
            //Draw both squares
            ctx.fillRect(value.square.cord_x_1, value.square.cord_y_1, value.square.width_x, value.square.height_y)
            ctx.fillRect(value.square.cord_x_2, value.square.cord_y_2, value.square.width_x, value.square.height_y)
            //Draw the lines for the car to follow
            ctx.fillRect(value.line.cord_x, value.line.cord_y, value.line.width_x, value.line.height_y)

            //Draw the codes for the track_id and location_id
            for (let i = 0; i < 4; i++) {
                if (binary[i] === "1") {
                    ctx.fillRect(value.code.track.bin_1.cord_x, value.code.track.bin_1.cord_y, value.code.track.bin_1.width_x, value.code.track.bin_1.height_y)
                } else {
                    ctx.fillRect(value.code.track.bin_0.cord_x, value.code.track.bin_0.cord_y, value.code.track.bin_0.width_x, value.code.track.bin_0.height_y)
                }
                ctx.fillRect(value.code.location.cord_x, value.code.location.cord_y, value.code.location.width_x, value.code.location.height_y)
                switch (key) {
                    case "top":
                        value.code.track.bin_1.cord_y += 152
                        value.code.track.bin_0.cord_y += 152
                        value.code.location.cord_y += 152
                        break
                    case "bottom":
                        value.code.track.bin_1.cord_y -= 152
                        value.code.track.bin_0.cord_y -= 152
                        value.code.location.cord_y -= 152
                        break
                    case "left":
                        value.code.track.bin_1.cord_x += 152
                        value.code.track.bin_0.cord_x += 152
                        value.code.location.cord_x += 152
                        break
                    case "right":
                        value.code.track.bin_1.cord_x -= 152
                        value.code.track.bin_0.cord_x -= 152
                        value.code.location.cord_x -= 152
                        break
                }
            }
        }
    }
    return ctx
}

/**
 *
 * @param ctx
 * @param intersection
 * @returns {*}
 */

function drawIntersectionLineWithIntersectionCode(ctx, intersection) {

    for (const [key, value] of Object.entries(intersection)) {
        /**
         * Drawing the 3 codes that tell the car that the current track a intersection is and where it is
         */
        if (key === "connection_left_right" || key === "connection_bottom_top") {
            //Draw connection line between left and right intersection code
            ctx.fillRect(value.cord_x, value.cord_y, value.width_x, value.height_y)
        } else {
            //Drawing the intersection code at the bottom
            value.intersection_code.bottom.diff_arr.forEach((diff, index) => {
                if (key === "bottom" || key === "top") {
                    ctx.fillRect(value.intersection_code.bottom.cord_x + diff, value.intersection_code.bottom.cord_y, value.intersection_code.bottom.width_x_main, value.intersection_code.bottom.height_y)
                } else {
                    ctx.fillRect(value.intersection_code.bottom.cord_x, value.intersection_code.bottom.cord_y + diff, value.intersection_code.bottom.height_y, value.intersection_code.bottom.width_x_main)
                }
            })

            //Drawing the intersection code in the middle
            value.intersection_code.middle.diff_arr.forEach((diff, index) => {
                if (key === "bottom" || key === "top") {
                    if (index === 2) {
                        ctx.fillRect(value.intersection_code.middle.cord_x + diff, value.intersection_code.middle.cord_y, value.intersection_code.middle.width_x_main, value.intersection_code.middle.height_y)
                    } else {
                        ctx.fillRect(value.intersection_code.middle.cord_x + diff, value.intersection_code.middle.cord_y, value.intersection_code.middle.width_x_side, value.intersection_code.middle.height_y)
                    }
                } else {
                    if (index === 2) {
                        ctx.fillRect(value.intersection_code.middle.cord_x, value.intersection_code.middle.cord_y + diff, value.intersection_code.middle.height_y, value.intersection_code.middle.width_x_main)
                    } else {
                        ctx.fillRect(value.intersection_code.middle.cord_x, value.intersection_code.middle.cord_y + diff, value.intersection_code.middle.height_y, value.intersection_code.middle.width_x_side)
                    }
                }
            })

            //Drawing the intersection code at the top
            value.intersection_code.top.diff_arr.forEach((diff, index) => {
                if (key === "bottom" || key === "top") {
                    ctx.fillRect(value.intersection_code.top.cord_x + diff, value.intersection_code.top.cord_y, value.intersection_code.top.width_x_main, value.intersection_code.top.height_y)
                } else {
                    ctx.fillRect(value.intersection_code.top.cord_x, value.intersection_code.top.cord_y + diff, value.intersection_code.top.height_y, value.intersection_code.top.width_x_main)
                }
            })
            //Draw connection line between top and middle
            ctx.fillRect(value.intersection_code.line_1.cord_x, value.intersection_code.line_1.cord_y, value.intersection_code.line_1.width_x, value.intersection_code.line_1.height_y)
            //Draw connection line between middle and bottom
            ctx.fillRect(value.intersection_code.line_2.cord_x, value.intersection_code.line_2.cord_y, value.intersection_code.line_2.width_x, value.intersection_code.line_2.height_y)
        }
    }
    return ctx
}

/**
 * JUNCTION Functions
 */

/**
 *
 * @param ctx
 * @param direction
 * @param num
 * @param outer_distance
 * @param start
 * @param end
 * @param loc_code_counter
 * @param binary
 * @returns {{ctx, counter}}
 */

function drawJunctionArc(ctx, direction, num, outer_distance, start, end, loc_code_counter, binary) {
    for (let i = 0; i < num; i++) {

        //Calculate the circumference of the whole circle
        const quarter_circumference = (outer_distance * Math.PI) / 2

        //Percentage length of the code piece
        const code_length_percent = (76 / quarter_circumference)
        const code_length_rad = code_length_percent * Math.PI / 2

        //Percentage length of the squares at the beginning and in the end
        const start_length_percent = (100 / quarter_circumference)
        const start_length_rad = start_length_percent * Math.PI / 2

        //Start Position for the code pieces
        let start_code = start + code_length_rad * 1.8

        let junction_direction
        let junction = junction_track_piece_code_conf(outer_distance, start_code, code_length_rad)

        switch (direction) {
            case "left":
                junction_direction = junction_track_piece_conf_left(outer_distance, end, start, start_length_rad)
                drawJunctionStartArc(ctx, junction_direction)
                break
            case "right":
                junction_direction = junction_track_piece_conf_right(outer_distance, end, start, start_length_rad)
                drawJunctionStartArc(ctx, junction_direction)
                break
        }

        //Calculate how many codes will fit on the arc
        let amount_of_codes = (quarter_circumference - 190) / (76 * 1.7)

        //Calculate how many numbered codes will be on the arc
        let amount_of_nub_codes = amount_of_codes - (amount_of_codes % 8)

        amount_of_codes = Math.floor(amount_of_codes)

        //Draw the codes the car reads for information
        for (let j = 0; j < amount_of_codes; j++) {

            ctx.strokeStyle = "black"

            //Get the binary string of the current location code
            let binary_loc = (loc_code_counter >>> 0).toString(2).split("");
            binary_loc.reverse()

            //When the max amount of codes that carry information is drawn the rest of the codes will be drawn as the extra thick code, which signal the end of a section
            if (amount_of_nub_codes > 0) {
                //Every 8th code will signal the end of the 7 Bit long array
                if (j % 8 === 0) {
                    //Draw the code that signals the car that a new section begins
                    ctx.beginPath();
                    ctx.strokeStyle = "black"
                    ctx.lineWidth = junction.junction_code.transition.type_3.width
                    ctx.arc(junction_direction.start.common_data.cord_x, junction.junction_code.common_data.cord_y, junction.junction_code.transition.type_3.radius, junction.junction_code.common_data.start, junction.junction_code.common_data.end, junction.junction_code.common_data.anti_clockwise);
                    ctx.stroke();

                    //Draw the code that signals the car that a new section begins
                    ctx.beginPath();
                    ctx.strokeStyle = "black"
                    ctx.lineWidth = junction.junction_code.transition.type_1.width
                    ctx.arc(junction_direction.start.common_data.cord_x, junction.junction_code.common_data.cord_y, junction.junction_code.transition.type_1.radius, junction.junction_code.common_data.start, junction.junction_code.common_data.end, junction.junction_code.common_data.anti_clockwise);
                    ctx.stroke();
                    loc_code_counter++
                } else {
                    //Drawing the location ID code
                    if (binary_loc[(j % 8) - 1] === "1") {
                        //Draw the location code for the binary value one
                        ctx.beginPath();
                        ctx.strokeStyle = "black"
                        ctx.lineWidth = junction.junction_code.location.type_2.width
                        ctx.arc(junction_direction.start.common_data.cord_x, junction.junction_code.common_data.cord_y, junction.junction_code.location.type_2.radius, junction.junction_code.common_data.start, junction.junction_code.common_data.end, junction.junction_code.common_data.anti_clockwise);
                        ctx.stroke();
                    } else {
                        //Draw the location code for the binary value zero
                        ctx.beginPath();
                        ctx.strokeStyle = "black"
                        ctx.lineWidth = junction.junction_code.location.type_1.width
                        ctx.arc(junction_direction.start.common_data.cord_x, junction.junction_code.common_data.cord_y, junction.junction_code.location.type_1.radius, junction.junction_code.common_data.start, junction.junction_code.common_data.end, junction.junction_code.common_data.anti_clockwise);
                        ctx.stroke();
                    }
                    //Drawing the track ID Code
                    if (binary[(j % 8) - 1] === "1") {
                        //draw the track id code for the binary value one
                        ctx.beginPath();
                        ctx.strokeStyle = "black"
                        ctx.lineWidth = junction.junction_code.track.type_2.width
                        ctx.arc(junction_direction.start.common_data.cord_x, junction.junction_code.common_data.cord_y, junction.junction_code.track.type_2.radius, junction.junction_code.common_data.start, junction.junction_code.common_data.end, junction.junction_code.common_data.anti_clockwise);
                        ctx.stroke();
                    } else {
                        //Draw code at the side of the arc that the car follows
                        ctx.beginPath();
                        ctx.strokeStyle = "black"
                        ctx.lineWidth = junction.junction_code.track.type_1.width
                        ctx.arc(junction_direction.start.common_data.cord_x, junction.junction_code.common_data.cord_y, junction.junction_code.track.type_1.radius, junction.junction_code.common_data.start, junction.junction_code.common_data.end, junction.junction_code.common_data.anti_clockwise);
                        ctx.stroke();
                    }
                }
            } else {
                //Draw code at the side of the arc that the car follows
                ctx.beginPath();
                ctx.strokeStyle = "black"
                ctx.lineWidth = junction.junction_code.transition.type_3.width
                ctx.arc(junction_direction.start.common_data.cord_x, junction.junction_code.common_data.cord_y, junction.junction_code.transition.type_3.radius, junction.junction_code.common_data.start, junction.junction_code.common_data.end, junction.junction_code.common_data.anti_clockwise);
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = "black"
                ctx.lineWidth = junction.junction_code.transition.type_1.width
                ctx.arc(junction_direction.start.common_data.cord_x, junction.junction_code.common_data.cord_y, junction.junction_code.transition.type_1.radius, junction.junction_code.common_data.start, junction.junction_code.common_data.end, junction.junction_code.common_data.anti_clockwise);
                ctx.stroke();
            }
            //start_code += code_length_rad * 1.7
            junction.junction_code.common_data.start += code_length_rad * 1.7
            junction.junction_code.common_data.end += code_length_rad * 1.7
            amount_of_nub_codes--
        }
        outer_distance+=90
    }
    return {
        ctx: ctx,
        counter: loc_code_counter
    }
}

/**
 *
 * @param ctx
 * @param junction
 * @returns {*}
 */

function drawJunctionStartArc(ctx, junction) {

    for (const [key, value] of Object.entries(junction.start)) {
        if (key !== "common_data"){
            ctx.beginPath();
            ctx.lineWidth = value.width
            ctx.strokeStyle = value.color
            ctx.arc(junction.start.common_data.cord_x, junction.start.common_data.cord_y, value.radius, value.start, value.end, value.anti_clockwise);
            ctx.stroke();
        }
    }
    return ctx
}

/**
 *
 * @param ctx
 * @param junction
 * @returns {*}
 */

function drawJunctionSideLine(ctx, junction) {
    for (const [key, value] of Object.entries(junction.side_line)) {
        if (key !== "common_data"){
            ctx.beginPath();
            ctx.lineWidth = value.width
            ctx.strokeStyle = value.color
            ctx.arc(value.cord_x, junction.side_line.common_data.cord_y, value.radius, value.start, value.end, value.anti_clockwise);
            ctx.stroke();
        }
    }

    return ctx
}

/**
 *
 */

exports.drawTrackPiece = function drawTrackPiece(type, track_id, lanes, left, right) {
    let data
    switch (type) {
        case "straight":
            data = drawStraightTrack(track_id, lanes)
            break
        case "curve":
            data = drawCurveTrack(track_id, lanes)
            break
        case "intersection":
            data = drawInterSectionTrack(lanes)
            break
        case "junction":
            data = drawJunctionTrack(track_id, lanes, left, right)
            break
    }
    return data
}

/**
 *
 */

exports.drawImage = async function drawImage(grid_items, rows, cols) {
    let canvas = createCanvas(WIDTH_IMAGE / 2 * rows, HEIGHT_IMAGE / 2 * cols)
    let ctx = canvas.getContext('2d')
    let buffer

    for (let grid of grid_items) {
        const grid_data = await mongoController.findTrack(grid.item.track_id, grid.type, grid.item.lanes)
        if (grid_data !== null) {
            buffer = grid_data.Data
            console.log(buffer)
        } else {
            buffer = require('./imageGeneratorController').drawTrackPiece(grid.type, grid.item.track_id, grid.item.lanes, grid.item.left, grid.item.right)
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
            ctx.translate(((grid.item.x + 1) * WIDTH_IMAGE / 2) - 1073, ((grid.item.y + 1) * HEIGHT_IMAGE / 2) - 1073);
            ctx.rotate(degree);
            ctx.drawImage(image, -1073, -1073, WIDTH_IMAGE / 2, HEIGHT_IMAGE / 2)
            ctx.restore()
        })
    }
    return canvas
}
