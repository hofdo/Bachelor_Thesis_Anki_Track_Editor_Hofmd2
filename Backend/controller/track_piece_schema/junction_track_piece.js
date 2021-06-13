const HEIGHT_IMAGE = 4292
const WIDTH_IMAGE = 4292

exports.junction_track_piece_left = function (outer_distance, end, start, start_length_rad) {
    let junction_left;
    return junction_left = {
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
            }
        }
}

exports.junction_track_piece_right = function (outer_distance, end, start, start_length_rad) {
    let junction_right;
    return junction_right = {
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
                    cord_x: HEIGHT_IMAGE,
                    cord_y: WIDTH_IMAGE,
                }
            }
        }
}

exports.junction_track_piece_code = function (outer_distance, start_code, code_length_rad) {
    let junction_code;
    return junction_code = {
        junction_code: {
            transition: {
                type_3: {
                    radius: outer_distance - 22,
                    width: 16,
                },
                type_1: {
                    radius: outer_distance + 13,
                    width: 4,
                }
            },
            track: {
                type_2: {
                    radius: outer_distance + 16,
                    width: 10,
                },
                type_1: {
                    radius: outer_distance + 13,
                    width: 4,
                }
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
                cord_y: WIDTH_IMAGE,
                start: start_code,
                end: start_code + code_length_rad,
                anti_clockwise: false
            }
        }
    }
}

exports.junction_track_piece_side_line = function (outer_distance_right, outer_distance_left, end_right, end_left, start) {
    let sideline;
    return sideline = {
        side_line: {
            outer_square_bottom_left: {
                cord_x: 0,
                radius: outer_distance_left - 135,
                start: end_left,
                end: end_left - ((Math.PI / 2) * (100 / ((outer_distance_left * Math.PI) / 2))),
                anti_clockwise: true,
                width: 80,
                color: "black"
            },
            outer_square_top_left: {
                cord_x: 0,
                radius: outer_distance_left - 135,
                start: start,
                end: start + ((Math.PI / 2) * (100 / ((outer_distance_left * Math.PI) / 2))),
                anti_clockwise: false,
                width: 80,
                color: "black"
            },
            inner_outline_left: {
                cord_x: 0,
                radius: outer_distance_left - 70,
                start: end_left,
                end: start,
                anti_clockwise: true,
                width: 23,
                color: "black"
            },
            inner_outline_2_left: {
                cord_x: 0,
                radius: outer_distance_left - 89,
                start: end_left - ((Math.PI / 2) * (100 / ((outer_distance_left * Math.PI) / 2))),
                end: start + ((Math.PI / 2) * (100 / ((outer_distance_left * Math.PI) / 2))),
                anti_clockwise: true,
                width: 2,
                color: "black"
            },
            inner_outline_3_left: {
                cord_x: 0,
                radius: outer_distance_left - 105,
                start: end_left,
                end: start,
                anti_clockwise: true,
                width: 23,
                color: "black"
            },
            outer_outline_3_left: {
                cord_x: 0,
                radius: outer_distance_left - 164,
                start: end_left,
                end: start,
                anti_clockwise: true,
                width: 23,
                color: "black"
            },
            outer_outline_2_left: {
                cord_x: 0,
                radius: outer_distance_left - 183,
                start: end_left - ((Math.PI / 2) * (100 / ((outer_distance_left * Math.PI) / 2))),
                end: start + ((Math.PI / 2) * (100 / ((outer_distance_left * Math.PI) / 2))),
                anti_clockwise: true,
                width: 2,
                color: "black"
            },
            outer_outline_left: {
                cord_x: 0,
                radius: outer_distance_left - 200,
                start: end_left,
                end: start,
                anti_clockwise: true,
                width: 23,
                color: "black"
            },
            outer_square_bottom_right: {
                cord_x: WIDTH_IMAGE,
                radius: outer_distance_right - 135,
                start: end_right,
                end: end_right + ((Math.PI / 2) * (100 / ((outer_distance_right * Math.PI) / 2))),
                anti_clockwise: false,
                width: 80,
                color: "black"
            },
            outer_square_top_right: {
                cord_x: WIDTH_IMAGE,
                radius: outer_distance_right - 135,
                start: start,
                end: start - ((Math.PI / 2) * (100 / ((outer_distance_right * Math.PI) / 2))),
                anti_clockwise: true,
                width: 80,
                color: "black"
            },
            inner_outline_right: {
                cord_x: WIDTH_IMAGE,
                radius: outer_distance_right - 70,
                start: end_right,
                end: start,
                anti_clockwise: false,
                width: 23,
                color: "black"
            },
            inner_outline_2_right: {
                cord_x: WIDTH_IMAGE,
                radius: outer_distance_right - 89,
                start: end_right + ((Math.PI / 2) * (100 / ((outer_distance_right * Math.PI) / 2))),
                end: start - ((Math.PI / 2) * (100 / ((outer_distance_left * Math.PI) / 2))),
                anti_clockwise: false,
                width: 2,
                color: "black"
            },
            inner_outline_3_right: {
                cord_x: WIDTH_IMAGE,
                radius: outer_distance_right - 105,
                start: end_right,
                end: start,
                anti_clockwise: false,
                width: 23,
                color: "black"
            },
            outer_outline_3_right: {
                cord_x: WIDTH_IMAGE,
                radius: outer_distance_right - 164,
                start: end_right,
                end: start,
                anti_clockwise: false,
                width: 23,
                color: "black"
            },
            outer_outline_2_right: {
                cord_x: WIDTH_IMAGE,
                radius: outer_distance_right - 183,
                start: end_right + ((Math.PI / 2) * (100 / ((outer_distance_right * Math.PI) / 2))),
                end: start - ((Math.PI / 2) * (100 / ((outer_distance_right * Math.PI) / 2))),
                anti_clockwise: false,
                width: 2,
                color: "black"
            },
            outer_outline_right: {
                cord_x: WIDTH_IMAGE,
                radius: outer_distance_right - 200,
                start: end_right,
                end: start,
                anti_clockwise: false,
                width: 23,
                color: "black"
            },
            common_data: {
                cord_y: WIDTH_IMAGE
            }
        }
    }
}
