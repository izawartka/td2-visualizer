import Vector3 from "./vector3";

const DefinedSwitches = {
    "Crossing4.444": [
        0,
        0,
        [0,1],
        new Vector3(-1.104, 0, -9.939),
        new Vector3(1.104, 0, -9.939),
        new Vector3(1.104, 0, 9.939),
        new Vector3(-1.104, 0, 9.939)
    ],
    "Rz 60E1-300-1_9 R": [
        0,
        -300,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 33.231),
        new Vector3(1.835, 0, 33.129)
    ],
    "Rz 60E1-300-1_9 L": [
        0,
        300,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 33.231),
        new Vector3(-1.835, 0, 33.129)
    ],
    "Rz 60E1-190-1_9 R": [
        0,
        -190,
        [0, 0, 5, 6],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 27.139),
        new Vector3(1.835, 0, 27.037)
    ],
    "Rz 60E1-190-1_9 L": [
        0,
        190,
        [0, 0, 5, 6],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 27.139),
        new Vector3(-1.835, 0, 27.037)
    ],
    "Rz 60E1-500-1_12 R": [
        0,
        500,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 41.595),
        new Vector3(1.727, 0, 41.523)
    ],
    "Rz 60E1-500-1_12 L": [
        0,
        500,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 41.595),
        new Vector3(-1.727, 0, 41.523)
    ],
    "Rkpd 60E1-190-1_9": [
        0,
        0,
        [0, 1, 2, 3],
        new Vector3(-0.918, 0, -16.557),
        new Vector3(0.917, 0, -16.557),
        new Vector3(0.917, 0, 16.557),
        new Vector3(-0.917, 0, 16.557)
    ],
    "Rkp 60E1-190-1_9 ab": [
        0,
        0,
        [0, 1, 2, 3],
        new Vector3(-0.918, 0, -16.557),
        new Vector3(0.917, 0, -16.556),
        new Vector3(0.917, 0, 16.558),
        new Vector3(-0.921, 0, 16.558)
    ],
    "Rz 60E1-265-1_10 R": [
        0,
        -265,
        [0, 0, 5, 6],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 31.181),
        new Vector3(1.789, 0, 31.094)
    ],
    "Rz 60E1-265-1_10 L": [
        0,
        265,
        [0, 0, 5, 6],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 31.181),
        new Vector3(-1.789, 0, 31.094)
    ],
    "Rz 60E1-1200-1_18.5 R": [
        0,
        -1200,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 64.817),
        new Vector3(1.749, 0, 64.77)
    ],
    "Rz 60E1-1200-1_18.5 L": [
        0,
        1200,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 64.817),
        new Vector3(-1.75, 0, 64.77)
    ],
    "Rld 60E1-700_300-1_10 R": [
        700,
        -300,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-0.616, 0, 29.377),
        new Vector3(1.438, 0, 29.339)
    ],
    "Rld 60E1-700_300-1_10 L": [
        -700,
        300,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0.616, 0, 29.377),
        new Vector3(-1.438, 0, 29.339)
    ],
    "Rld 60E1-1800_300-1_9 R": [
        1800,
        -300,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-0.307, 0, 33.228),
        new Vector3(1.838, 0, 33.163)
    ],
    "Rld 60E1-1800_300-1_9 L": [
        -1800,
        300,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0.307, 0, 33.228),
        new Vector3(-1.838, 0, 33.163)
    ],
    "Rz 60E1-190-1_7.5 R": [
        0,
        -190,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 25.221),
        new Vector3(1.667, 0, 25.111)
    ],
    "Rz 60E1-190-1_7.5 L": [
        0,
        190,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 25.221),
        new Vector3(-1.667, 0, 25.111)
    ],
    "Rlds 60E1-190-190-1_9": [
        -190,
        190,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(1.184, 0, 21.186),
        new Vector3(-1.185, 0, 21.186)
    ],
    "Rlj 60E1-650_190-1_20 R": [
        -650,
        -190,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0.811, 0, 32.466),
        new Vector3(2.77, 0, 32.332)
    ],
    "Rlj 60E1-650_190-1_20 L": [
        650,
        190,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-0.811, 0, 32.466),
        new Vector3(-2.77, 0, 32.332)
    ],
    "Rlj 60E1-750_190-1_6 R": [
        -750,
        -190,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0.66, 0, 31.44),
        new Vector3(2.597, 0, 31.306)
    ],
    "Rlj 60E1-750_190-1_6 L": [
        750,
        190,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-0.66, 0, 31.44),
        new Vector3(-2.597, 0, 31.306)
    ],
    "Rld 60E1-1200_900-1_18.5 R": [
        1200,
        -900,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-0.984, 0, 48.6),
        new Vector3(1.313, 0, 48.589)
    ],
    "Rld 60E1-1200_900-1_18.5 L": [
        -1200,
        900,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0.984, 0, 48.6),
        new Vector3(-1.313, 0, 48.589)
    ],
    "Rlj 60E1-900_300-1_7.5 R": [
        -900,
        -300,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0.881, 0, 39.81),
        new Vector3(2.639, 0, 39.706)
    ],
    "Rlj 60E1-900_300-1_7.5 L": [
        900,
        300,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-0.881, 0, 39.81),
        new Vector3(-2.639, 0, 39.706)
    ],
    "Rlj 60E1-600_300-1_6 R": [
        -600,
        -300,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(1.919, 0, 47.949),
        new Vector3(3.832, 0, 47.795)
    ],
    "Rlj 60E1-600_300-1_6 L": [
        600,
        300,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-1.919, 0, 47.949),
        new Vector3(-3.832, 0, 47.795)
    ],
    "Rld 60E1-900_450-1_12 R": [
        900,
        -450,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-0.778, 0, 37.425),
        new Vector3(1.556, 0, 37.392)
    ],
    "Rld 60E1-900_450-1_12 L": [
        -900,
        450,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0.778, 0, 37.425),
        new Vector3(-1.556, 0, 37.392)
    ],
    "Rld 60E1-700_500-1_14 R": [
        700,
        -500,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-0.909, 0, 35.653),
        new Vector3(1.272, 0, 35.639)
    ],
    "Rld 60E1-700_500-1_14 L": [
        -700,
        500,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0.909, 0, 35.653),
        new Vector3(-1.272, 0, 35.639)
    ],
    "Rld 60E1-2500_400-1_10.5 R": [
        2500,
        -400,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-0.289, 0, 38.008),
        new Vector3(1.805, 0, 37.952)
    ],
    "Rld 60E1-2500_400-1_10.5 L": [
        -2500,
        400,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0.289, 0, 38.008),
        new Vector3(-1.805, 0, 37.952)
    ],
    "Rlj 60E1-1800_300-1_7.5 R": [
        -1800,
        -300,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0.423, 0, 38.998),
        new Vector3(2.531, 0, 38.89)
    ],
    "Rlj 60E1-1800_300-1_7.5 L": [
        1800,
        300,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-0.423, 0, 38.998),
        new Vector3(-2.531, 0, 38.89)
    ],
    "Rld 60E1-1800_600-1_14 R": [
        1800,
        -600,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-0.509, 0, 42.798),
        new Vector3(1.526, 0, 42.767)
    ],
    "Rld 60E1-1800_600-1_14 L": [
        -1800,
        600,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0.509, 0, 42.798),
        new Vector3(-1.526, 0, 42.767)
    ],
    "Rlj 60E1-1800_450-1_9 R": [
        -1800,
        -450,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0.69, 0, 49.84),
        new Vector3(2.758, 0, 49.744)
    ],
    "Rlj 60E1-1800_450-1_9 L": [
        1800,
        450,
        [0, 0, 3, 4],
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-0.69, 0, 49.84),
        new Vector3(-2.758, 0, 49.745)
    ]
}

export default DefinedSwitches;