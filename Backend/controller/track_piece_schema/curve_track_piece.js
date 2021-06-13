exports.curve_track_piece = function (start, end, outer_distance, outer_distance_sideline, start_code, code_length_rad, start_length_rad) {

    const HEIGHT_IMAGE = 4292
    const WIDTH_IMAGE = 4292

    let curve;
    return curve = {
        curve_code: {
            transition: {
                type_3: {
                    radius: outer_distance - 22,
                    width: 16,
                },
                type_1: {
                    radius: outer_distance + 13,
                    width: 4,
                },
            },
            track: {
                type_2: {
                    radius: outer_distance + 16,
                    width: 10,
                },
                type_1: {
                    radius: outer_distance + 13,
                    width: 4,
                },
            },
            location: {
                type_2: {
                    radius: outer_distance - 16,
                    width: 10,
                },
                type_1: {
                    radius: outer_distance - 13,
                    width: 4,
                },
            },
            common_data: {
                cord_x: 0,
                cord_y: WIDTH_IMAGE,
                start: start_code,
                end: start_code + code_length_rad,
                anti_clockwise: false
            }
        },
        arc_line: {},
        start: {
            square_top_left: {
                radius: outer_distance - 45,
                start: start,
                end: start + start_length_rad,
                anti_clockwise: false,
                width: 80,
                color: "black"
            },
            square_top_right: {
                radius: outer_distance + 45,
                start: start,
                end: start + start_length_rad,
                anti_clockwise: false,
                width: 80,
                color: "black"
            },
            square_bottom_left: {
                radius: outer_distance - 45,
                start: end,
                end: end - start_length_rad,
                anti_clockwise: true,
                width: 80,
                color: "black"
            },
            square_bottom_right: {
                radius: outer_distance + 45,
                start: end,
                end: end - start_length_rad,
                anti_clockwise: true,
                width: 80,
                color: "black"
            },
            arc_main: {
                radius: outer_distance,
                start: start + start_length_rad,
                end: end - start_length_rad,
                anti_clockwise: false,
                width: 10,
                color: "black"
            },
            common_data: {
                cord_x: 0,
                cord_y: WIDTH_IMAGE,
            }
        },
        side_line: {
            outer_square_bottom_left: {
                radius: outer_distance_sideline - 135,
                start: end,
                end: end - ((Math.PI / 2) * (100 / ((outer_distance_sideline * Math.PI) / 2))),
                anti_clockwise: true,
                width: 80,
                color: "black"
            },
            outer_square_top_left: {
                radius: outer_distance_sideline - 135,
                start: start,
                end: start + ((Math.PI / 2) * (100 / ((outer_distance_sideline * Math.PI) / 2))),
                anti_clockwise: false,
                width: 80,
                color: "black"
            },
            inner_outline_left: {
                radius: outer_distance_sideline - 70,
                start: end,
                end: start,
                anti_clockwise: true,
                width: 23,
                color: "black"
            },
            inner_outline_2_left: {
                radius: outer_distance_sideline - 89,
                start: end - ((Math.PI / 2) * (100 / ((outer_distance_sideline * Math.PI) / 2))),
                end: start + ((Math.PI / 2) * (100 / ((outer_distance_sideline * Math.PI) / 2))),
                anti_clockwise: true,
                width: 2,
                color: "black"
            },
            inner_outline_3_left: {
                radius: outer_distance_sideline - 105,
                start: end,
                end: start,
                anti_clockwise: true,
                width: 23,
                color: "black"
            },
            outer_outline_3_left: {
                radius: outer_distance_sideline - 164,
                start: end,
                end: start,
                anti_clockwise: true,
                width: 23,
                color: "black"
            },
            outer_outline_2_left: {
                radius: outer_distance_sideline - 183,
                start: end - ((Math.PI / 2) * (100 / ((outer_distance_sideline * Math.PI) / 2))),
                end: start + ((Math.PI / 2) * (100 / ((outer_distance_sideline * Math.PI) / 2))),
                anti_clockwise: true,
                width: 2,
                color: "black"
            },
            outer_outline_left: {
                radius: outer_distance_sideline - 200,
                start: end,
                end: start,
                anti_clockwise: true,
                width: 23,
                color: "black"
            },
            outer_square_bottom_right: {
                radius: outer_distance +90 + 45,
                start: end,
                end: end - ((Math.PI / 2) * (100 / ((outer_distance * Math.PI) / 2))),
                anti_clockwise: true,
                width: 80,
                color: "black"
            },
            outer_square_top_right: {
                radius: outer_distance +90 + 45,
                start: start,
                end: start + ((Math.PI / 2) * (100 / ((outer_distance * Math.PI) / 2))),
                anti_clockwise: false,
                width: 80,
                color: "black"
            },
            inner_outline_right: {
                radius: outer_distance +90 - 20,
                start: end,
                end: start,
                anti_clockwise: true,
                width: 23,
                color: "black"
            },
            inner_outline_2_right: {
                radius: outer_distance +90 - 1,
                start: end - ((Math.PI / 2) * (100 / ((outer_distance * Math.PI) / 2))),
                end: start + ((Math.PI / 2) * (100 / ((outer_distance * Math.PI) / 2))),
                anti_clockwise: true,
                width: 2,
                color: "black"
            },
            inner_outline_3_right: {
                radius: outer_distance +90 + 15,
                start: end,
                end: start,
                anti_clockwise: true,
                width: 23,
                color: "black"
            },
            outer_outline_3_right: {
                radius: outer_distance +90 + 74,
                start: end,
                end: start,
                anti_clockwise: true,
                width: 23,
                color: "black"
            },
            outer_outline_2_right: {
                radius: outer_distance +90 + 93,
                start: end - ((Math.PI / 2) * (100 / ((outer_distance * Math.PI) / 2))),
                end: start + ((Math.PI / 2) * (100 / ((outer_distance * Math.PI) / 2))),
                anti_clockwise: true,
                width: 2,
                color: "black"
            },
            outer_outline_right: {
                radius: outer_distance +90 + 110,
                start: end,
                end: start,
                anti_clockwise: true,
                width: 23,
                color: "black"
            },
            common_data: {
                cord_x: 0,
                cord_y: WIDTH_IMAGE
            }
        }
    }
}
