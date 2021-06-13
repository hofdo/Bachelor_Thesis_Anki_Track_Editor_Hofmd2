exports.intersection_track_piece = function (start_val) {
    let intersection;

    const HEIGHT_IMAGE = 4292
    const WIDTH_IMAGE = 4292

    //Distances for the different track and location codes
    const track_id_code_zero_x = 67
    const track_id_code_one_x = 64
    const location_id_code_zero_x = 99
    const location_id_code_one_x = 96

    let start_y_top = 132
    let start_x_top = 132
    let start_y_bottom = 4090
    let start_x_bottom = 4090

    return intersection = {
        bottom: {
            square: {
                cord_x_1: start_val,
                cord_y_1: HEIGHT_IMAGE - 100,
                cord_x_2: start_val + 90,
                cord_y_2: HEIGHT_IMAGE - 100,
                width_x: 80,
                height_y: 100
            },
            line: {
                cord_x: start_val + 80,
                cord_y: WIDTH_IMAGE - 740,
                width_x: 10,
                height_y: 640
            },
            code: {
                track: {
                    bin_1: {
                        cord_x: start_val + location_id_code_one_x,
                        cord_y: start_y_bottom,
                        width_x: 10,
                        height_y: 76
                    },
                    bin_0: {
                        cord_x: start_val + location_id_code_zero_x,
                        cord_y: start_y_bottom,
                        width_x: 4,
                        height_y: 76
                    }
                },
                location: {
                    cord_x: start_val + track_id_code_zero_x,
                    cord_y: start_y_bottom,
                    width_x: 4,
                    height_y: 76
                }
            },
            intersection_code: {
                top: {
                    cord_x: start_val,
                    cord_y: HEIGHT_IMAGE - 816,
                    width_x_main: 4,
                    height_y: 76,
                    diff_arr: [55, 69, 83, 97, 111]
                },
                middle: {
                    cord_x: start_val,
                    cord_y: HEIGHT_IMAGE - 968,
                    width_x_main: 14,
                    width_x_side: 12,
                    height_y: 76,
                    diff_arr: [42, 60, 78, 98, 116]
                },
                bottom: {
                    cord_x: start_val,
                    cord_y: HEIGHT_IMAGE - 1120,
                    width_x_main: 4,
                    height_y: 76,
                    diff_arr: [55, 69, 83, 97, 111]
                },
                line_1: {
                    cord_x: start_val + 80,
                    cord_y: WIDTH_IMAGE - 892,
                    width_x: 10,
                    height_y: 76
                },
                line_2: {
                    cord_x: start_val + 80,
                    cord_y: WIDTH_IMAGE - 1044,
                    width_x: 10,
                    height_y: 76
                }
            }
        },
        top: {
            square: {
                cord_x_1: start_val,
                cord_y_1: 0,
                cord_x_2: start_val + 90,
                cord_y_2: 0,
                width_x: 80,
                height_y: 100
            },
            line: {
                cord_x: start_val + 80,
                cord_y: 100,
                width_x: 10,
                height_y: 640
            },
            code: {
                track: {
                    bin_1: {
                        cord_x: start_val + track_id_code_one_x,
                        cord_y: start_y_top,
                        width_x: 10,
                        height_y: 76
                    },
                    bin_0: {
                        cord_x: start_val + track_id_code_zero_x,
                        cord_y: start_y_top,
                        width_x: 4,
                        height_y: 76
                    }
                },
                location: {
                    cord_x: start_val + location_id_code_zero_x,
                    cord_y: start_y_top,
                    width_x: 4,
                    height_y: 76
                }
            },
            intersection_code: {
                top: {
                    cord_x: start_val,
                    cord_y: 740,
                    width_x_main: 4,
                    height_y: 76,
                    diff_arr: [55, 69, 83, 97, 111]
                },
                middle: {
                    cord_x: start_val,
                    cord_y: 892,
                    width_x_main: 14,
                    width_x_side: 4,
                    height_y: 76,
                    diff_arr: [50, 64, 78, 100, 114]
                },
                bottom: {
                    cord_x: start_val,
                    cord_y: 1044,
                    width_x_main: 4,
                    height_y: 76,
                    diff_arr: [55, 69, 83, 97, 111]
                },
                line_1: {
                    cord_x: start_val + 80,
                    cord_y: 816,
                    width_x: 10,
                    height_y: 76
                },
                line_2: {
                    cord_x: start_val + 80,
                    cord_y: 968,
                    width_x: 10,
                    height_y: 76
                }
            }
        },
        left: {
            square: {
                cord_x_1: 0,
                cord_y_1: start_val,
                cord_x_2: 0,
                cord_y_2: start_val + 90,
                width_x: 100,
                height_y: 80
            },
            line: {
                cord_x: 100,
                cord_y: start_val + 80,
                width_x: 640,
                height_y: 10
            },
            code: {
                track: {
                    bin_1: {
                        cord_x: start_x_top,
                        cord_y: start_val + location_id_code_one_x,
                        width_x: 76,
                        height_y: 10
                    },
                    bin_0: {
                        cord_x: start_x_top,
                        cord_y: start_val + location_id_code_zero_x,
                        width_x: 76,
                        height_y: 4
                    }
                },
                location: {
                    cord_x: start_x_top,
                    cord_y: start_val + track_id_code_zero_x,
                    width_x: 76,
                    height_y: 4
                }
            },
            intersection_code: {
                top: {
                    cord_x: 740,
                    cord_y: start_val,
                    width_x_main: 4,
                    height_y: 76,
                    diff_arr: [55, 69, 83, 97, 111]
                },
                middle: {
                    cord_x: 892,
                    cord_y: start_val,
                    width_x_main: 4,
                    width_x_side: 4,
                    height_y: 76,
                    diff_arr: [55, 69, 83, 97, 111]
                },
                bottom: {
                    cord_x: 1044,
                    cord_y: start_val,
                    width_x_main: 4,
                    height_y: 76,
                    diff_arr: [55, 69, 83, 97, 111]
                },
                line_1: {
                    cord_x: 816,
                    cord_y: start_val + 80,
                    width_x: 76,
                    height_y: 10
                },
                line_2: {
                    cord_x: 968,
                    cord_y: start_val + 80,
                    width_x: 76,
                    height_y: 10
                }
            }
        },
        right: {
            square: {
                cord_x_1: WIDTH_IMAGE - 100,
                cord_y_1: start_val,
                cord_x_2: WIDTH_IMAGE - 100,
                cord_y_2: start_val + 90,
                width_x: 100,
                height_y: 80
            },
            line: {
                cord_x: WIDTH_IMAGE - 740,
                cord_y: start_val + 80,
                width_x: 640,
                height_y: 10
            },
            code: {
                track: {
                    bin_1: {
                        cord_x: start_x_bottom,
                        cord_y: start_val + track_id_code_one_x,
                        width_x: 76,
                        height_y: 10
                    },
                    bin_0: {
                        cord_x: start_x_bottom,
                        cord_y: start_val + track_id_code_zero_x,
                        width_x: 76,
                        height_y: 4
                    }
                },
                location: {
                    cord_x: start_x_bottom,
                    cord_y: start_val + location_id_code_zero_x,
                    width_x: 76,
                    height_y: 4
                }
            },
            intersection_code: {
                top: {
                    cord_x: HEIGHT_IMAGE - 816,
                    cord_y: start_val,
                    width_x_main: 4,
                    height_y: 76,
                    diff_arr: [55, 69, 83, 97, 111]
                },
                middle: {
                    cord_x: HEIGHT_IMAGE - 968,
                    cord_y: start_val,
                    width_x_main: 4,
                    width_x_side: 12,
                    height_y: 76,
                    diff_arr: [46, 64, 83, 92, 110]
                },
                bottom: {
                    cord_x: HEIGHT_IMAGE - 1120,
                    cord_y: start_val,
                    width_x_main: 4,
                    height_y: 76,
                    diff_arr: [55, 69, 83, 97, 111]
                },
                line_1: {
                    cord_x: WIDTH_IMAGE - 892,
                    cord_y: start_val + 80,
                    width_x: 76,
                    height_y: 10
                },
                line_2: {
                    cord_x: WIDTH_IMAGE - 1044,
                    cord_y: start_val + 80,
                    width_x: 76,
                    height_y: 10
                }
            }
        },
        connection_left_right: {
            cord_x: 1120,
            cord_y: start_val + 82,
            width_x: 2052,
            height_y: 6
        },
        connection_bottom_top: {
            cord_x: start_val + 79,
            cord_y: 1120,
            width_x: 12,
            height_y: 2052
        }
    }

}
