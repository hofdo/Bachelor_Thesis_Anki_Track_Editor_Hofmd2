
exports.straight_track_piece = function (start_x, outer_distance, side_line_start) {

    const HEIGHT_IMAGE = 4292
    const WIDTH_IMAGE = 4292

    let straight;
    return straight = {
        top: {
            square: {
                left: {
                    cord_x: start_x,
                    cord_y: 0,
                    width_x: 80,
                    height_y: 100
                },
                right: {
                    cord_x: start_x + 90,
                    cord_y: 0,
                    width_x: 80,
                    height_y: 100
                }
            },
            transition_code_1: {
                type_1: {
                    cord_x: start_x + 67,
                    cord_y: 132,
                    width_x: 4,
                    height_y: 76,
                },
                type_3: {
                    cord_x: start_x + 96,
                    cord_y: 132,
                    width_x: 16,
                    height_y: 76,
                }
            },
            transition_code_2: {
                type_1: {
                    cord_x: start_x + 67,
                    cord_y: 284,
                    width_x: 4,
                    height_y: 76,
                },
                type_3: {
                    cord_x: start_x + 96,
                    cord_y: 284,
                    width_x: 16,
                    height_y: 76,
                }
            },
            track_code: {
                type_2: {
                    cord_x: start_x + 64,
                    width_x: 10,
                    height_y: 76,
                },
                type_1: {
                    cord_x: start_x + 67,
                    width_x: 4,
                    height_y: 76,
                },
                common_data: {
                    cord_y: 436,
                }
            },
            location_code: {
                type_2: {
                    cord_x: start_x + 96,
                    width_x: 10,
                    height_y: 76,
                },
                type_1: {
                    cord_x: start_x + 99,
                    width_x: 4,
                    height_y: 76,
                },
                common_data: {
                    cord_y: 436,
                }
            }
        },
        middle: {
            transition_code_1: {
                type_1: {
                    cord_x: start_x + 67,
                    cord_y: HEIGHT_IMAGE - ((15 * 76) + 436),
                    width_x: 4,
                    height_y: 76,
                },
                type_3: {
                    cord_x: start_x + 96,
                    cord_y: HEIGHT_IMAGE - ((15 * 76) + 436),
                    width_x: 16,
                    height_y: 76,
                }
            },
            transition_code_2: {
                type_1: {
                    cord_x: start_x + 67,
                    cord_y: 15 * 76 + 360,
                    width_x: 4,
                    height_y: 76,
                },
                type_3: {
                    cord_x: start_x + 96,
                    cord_y: 15 * 76 + 360,
                    width_x: 16,
                    height_y: 76,
                }
            },
            track_code: {
                type_2: {
                    cord_x: start_x + 64,
                    width_x: 10,
                    height_y: 76,
                },
                type_1: {
                    cord_x: start_x + 67,
                    width_x: 4,
                    height_y: 76,
                },
                common_data: {
                    cord_y: 1652
                }
            },
            location_code: {
                type_2: {
                    cord_x: start_x + 96,
                    cord_y: 1652,
                    width_x: 10,
                    height_y: 76,
                },
                type_1: {
                    cord_x: start_x + 99,
                    cord_y: 1652,
                    width_x: 4,
                    height_y: 76,
                },
                common_data: {
                    cord_y: 1652
                }
            }
        },
        bottom: {
            square: {
                left: {
                    cord_x: start_x,
                    cord_y: WIDTH_IMAGE - 100,
                    width_x: 80,
                    height_y: 100
                },
                right: {
                    cord_x: start_x + 90,
                    cord_y: WIDTH_IMAGE - 100,
                    width_x: 80,
                    height_y: 100
                }
            },
            transition_code_1: {
                type_1: {
                    cord_x: start_x + 67,
                    cord_y: HEIGHT_IMAGE - 202,
                    width_x: 4,
                    height_y: 76,
                },
                type_3: {
                    cord_x: start_x + 96,
                    cord_y: HEIGHT_IMAGE - 202,
                    width_x: 16,
                    height_y: 76,
                }
            },
            transition_code_2: {
                type_1: {
                    cord_x: start_x + 67,
                    cord_y: HEIGHT_IMAGE - 354,
                    width_x: 4,
                    height_y: 76,
                },
                type_3: {
                    cord_x: start_x + 96,
                    cord_y: HEIGHT_IMAGE - 354,
                    width_x: 16,
                    height_y: 76,
                }
            },
            track_code: {
                type_2: {
                    cord_x: start_x + 64,
                    width_x: 10,
                    height_y: 76,
                },
                type_1: {
                    cord_x: start_x + 67,
                    width_x: 4,
                    height_y: 76,
                },
                common_data: {
                    cord_y: 2868
                }
            },
            location_code: {
                type_2: {
                    cord_x: start_x + 96,
                    width_x: 10,
                    height_y: 76,
                },
                type_1: {
                    cord_x: start_x + 99,
                    width_x: 4,
                    height_y: 76,
                },
                common_data: {
                    cord_y: 2868
                }
            }
        },
        follow_line: {
            cord_x: start_x + 80,
            cord_y: 100,
            width_x: 10,
            height_y: 4092,
        },
        side_line: {
            lines: {
                inner: {
                    left: {
                        cord_x: side_line_start + 154,
                        width_x: 16,
                    },
                    right: {
                        cord_x: outer_distance,
                        width_x: 16,
                    }
                },
                inner_2: {
                    left: {
                        cord_x: side_line_start + 185,
                        width_x: 3,
                    },
                    right: {
                        cord_x: outer_distance - 18,
                        width_x: 3,
                    }
                },
                inner_3: {
                    left: {
                        cord_x: side_line_start + 193,
                        width_x: 22,
                    },
                    right: {
                        cord_x: outer_distance - 45,
                        width_x: 22,
                    }
                },
                outer_3: {
                    left: {
                        cord_x: side_line_start + 238,
                        width_x: 22,
                    },
                    right: {
                        cord_x: outer_distance - 90,
                        width_x: 22,
                    }
                },
                outer_2: {
                    left: {
                        cord_x: side_line_start + 270,
                        width_x: 3,
                    },
                    right: {
                        cord_x: outer_distance - 103,
                        width_x: 3,
                    }
                },
                outer: {
                    left: {
                        cord_x: side_line_start + 278,
                        width_x: 20,
                    },
                    right: {
                        cord_x: outer_distance - 128,
                        width_x: 20,
                    }
                },
                common_data: {
                    cord_y: 100,
                    height_y: 4092
                }
            },
            square: {
                top: {
                    cord_y: 0
                },
                bottom: {
                    cord_y: HEIGHT_IMAGE - 100,
                },
                common_data: {
                    height_y: 100,
                    first: {
                        cord_x: side_line_start + 180,
                        width_x: 80,
                    },
                    second: {
                        cord_x: outer_distance - 90,
                        width_x: 80,
                    },
                    third: {
                        cord_x: side_line_start + 270,
                        width_x: 28,
                    },
                    fourth: {
                        cord_x: outer_distance - 128,
                        width_x: 28,
                    },
                }
            }
        }
    }
}
