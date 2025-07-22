import { default as Quaternion } from "../quaternion-prefab-parser";
import Vector3 from "../vector3";
import {TrackConnectionEnd} from "../track-connection";

const { START, END } = TrackConnectionEnd;
const INTERNAL = Symbol('SwitchTrackConnectionType.INTERNAL');
const EXTERNAL = Symbol('SwitchTrackConnectionType.INTERNAL');
export const SwitchTrackConnectionType = { INTERNAL, EXTERNAL };

export const DefinedSwitches = {
    'Crossing': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 33.23, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.91881603, 0.0, -16.589575), rot: new Quaternion(0.0, 0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: EXTERNAL, end: START}, {type: EXTERNAL, end: END}]},
            'I1': {dataIndex: 1, radius: 0, length: 33.23, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.91881603, 0.0, -16.589575), rot: new Quaternion(0.0, -0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: EXTERNAL, end: START}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 0),
    },
    'Crossing4.444': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 20, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-1.1044217, 0.0, -9.938826), rot: new Quaternion(0.0, 0.055305732157115456, 0.0, 0.9984694667292363), connections: [{type: EXTERNAL, end: START}, {type: EXTERNAL, end: END}]},
            'I1': {dataIndex: 1, radius: 0, length: 20, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(1.1044217, 0.0, -9.938826), rot: new Quaternion(0.0, -0.055305732157115456, 0.0, 0.9984694667292363), connections: [{type: EXTERNAL, end: START}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 0),
    },
    'Rkp 60E1-190-1_9 ab': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 6.06, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.918, 0.0, -16.557), rot: new Quaternion(0.0, 0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I1': {dataIndex: 1, radius: 0, length: 6.06, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.917, 0.0, -16.557), rot: new Quaternion(0.0, -0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I5"}, {type: INTERNAL, end: END, internalId: "I6"}]},
            'I2': {dataIndex: 2, radius: 0, length: 6.06, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.917, 0.0, 16.557), rot: new Quaternion(0.0, 0.9996173696579898, 0.0, -0.027660699160397526), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I13"}, {type: INTERNAL, end: END, internalId: "I11"}]},
            'I3': {dataIndex: 3, radius: 0, length: 6.06, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.917, 0.0, 16.557), rot: new Quaternion(0.0, 0.9996173688008357, 0.0, 0.027660730136678004), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I12"}]},
            'I4': {dataIndex: 4, radius: 0, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.58193576, 0.0, -10.507073), rot: new Quaternion(0.0, 0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I7"}]},
            'I5': {dataIndex: 5, radius: 0, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.58193576, 0.0, -10.507073), rot: new Quaternion(0.0, -0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: INTERNAL, end: END, internalId: "I8"}]},
            'I6': {dataIndex: 6, radius: -190, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.58193576, 0.0, -10.507073), rot: new Quaternion(0.0, -0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: INTERNAL, end: END, internalId: "I10"}]},
            'I7': {dataIndex: 7, radius: 0, length: 6.123, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.16930215, 0.0, -3.0568154), rot: new Quaternion(0.0, 0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I4"}, {type: INTERNAL, end: END, internalId: "I11"}]},
            'I8': {dataIndex: 8, radius: 0, length: 6.123, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.16930215, 0.0, -3.0568154), rot: new Quaternion(0.0, -0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I5"}, {type: INTERNAL, end: END, internalId: "I12"}]},
            'I9': {dataIndex: 9, radius: 190, length: 6.1015196, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.15, 0.0, -3.0506287), rot: new Quaternion(0.0, 0.00802823078512509, 0.0, 0.9999677732359482), connections: []},
            'I10': {dataIndex: 10, radius: -190, length: 6.1015196, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.3156827, 0.0, -3.0506287), rot: new Quaternion(0.0, -0.00802823078512509, 0.0, 0.9999677732359482), connections: [{type: INTERNAL, end: START, internalId: "I6"}, {type: INTERNAL, end: END, internalId: "I13"}]},
            'I11': {dataIndex: 11, radius: 0, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.5819341, 0.0, 10.507074), rot: new Quaternion(0.0, 0.9996173696579898, 0.0, -0.027660699160397526), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I7"}]},
            'I12': {dataIndex: 12, radius: 0, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.58193475, 0.0, 10.507074), rot: new Quaternion(0.0, 0.9996173688008357, 0.0, 0.027660730136678004), connections: [{type: INTERNAL, end: START, internalId: "I3"}, {type: INTERNAL, end: END, internalId: "I8"}]},
            'I13': {dataIndex: 13, radius: 190, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.5819341, 0.0, 10.507074), rot: new Quaternion(0.0, 0.9996173696579898, 0.0, -0.027660699160397526), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I10"}]},
        },
        isolationLabelPos: new Vector3(0, 0, 0),
    },
    'Rkp 60E1-190-1_9 ba': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 6.06, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.918, 0.0, -16.557), rot: new Quaternion(0.0, 0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I1': {dataIndex: 1, radius: 0, length: 6.06, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.917, 0.0, -16.557), rot: new Quaternion(0.0, -0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I5"}, {type: INTERNAL, end: END, internalId: "I6"}]},
            'I2': {dataIndex: 2, radius: 0, length: 6.06, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.917, 0.0, 16.557), rot: new Quaternion(0.0, 0.9996173696579898, 0.0, -0.027660699160397526), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I13"}, {type: INTERNAL, end: END, internalId: "I11"}]},
            'I3': {dataIndex: 3, radius: 0, length: 6.06, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.917, 0.0, 16.557), rot: new Quaternion(0.0, 0.9996173688008357, 0.0, 0.027660730136678004), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I12"}]},
            'I4': {dataIndex: 4, radius: 0, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.58193576, 0.0, -10.507073), rot: new Quaternion(0.0, 0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I7"}]},
            'I5': {dataIndex: 5, radius: 0, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.58193576, 0.0, -10.507073), rot: new Quaternion(0.0, -0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: INTERNAL, end: END, internalId: "I8"}]},
            'I6': {dataIndex: 6, radius: -190, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.58193576, 0.0, -10.507073), rot: new Quaternion(0.0, -0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: INTERNAL, end: END, internalId: "I10"}]},
            'I7': {dataIndex: 7, radius: 0, length: 6.123, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.16930215, 0.0, -3.0568154), rot: new Quaternion(0.0, 0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I4"}, {type: INTERNAL, end: END, internalId: "I11"}]},
            'I8': {dataIndex: 8, radius: 0, length: 6.123, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.16930215, 0.0, -3.0568154), rot: new Quaternion(0.0, -0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I5"}, {type: INTERNAL, end: END, internalId: "I12"}]},
            'I9': {dataIndex: 9, radius: 190, length: 6.1015196, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.15, 0.0, -3.0506287), rot: new Quaternion(0.0, 0.00802823078512509, 0.0, 0.9999677732359482), connections: []},
            'I10': {dataIndex: 10, radius: -190, length: 6.1015196, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.3156827, 0.0, -3.0506287), rot: new Quaternion(0.0, -0.00802823078512509, 0.0, 0.9999677732359482), connections: [{type: INTERNAL, end: START, internalId: "I6"}, {type: INTERNAL, end: END, internalId: "I13"}]},
            'I11': {dataIndex: 11, radius: 0, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.5819341, 0.0, 10.507074), rot: new Quaternion(0.0, 0.9996173696579898, 0.0, -0.027660699160397526), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I7"}]},
            'I12': {dataIndex: 12, radius: 0, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.58193475, 0.0, 10.507074), rot: new Quaternion(0.0, 0.9996173688008357, 0.0, 0.027660730136678004), connections: [{type: INTERNAL, end: START, internalId: "I3"}, {type: INTERNAL, end: END, internalId: "I8"}]},
            'I13': {dataIndex: 13, radius: 190, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.5819341, 0.0, 10.507074), rot: new Quaternion(0.0, 0.9996173696579898, 0.0, -0.027660699160397526), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I10"}]},
        },
        isolationLabelPos: new Vector3(0, 0, 0),
    },
    // In "Rkpd 60E1-190-1_9" the default connections are really messed up, fixed manually
    'Rkpd 60E1-190-1_9': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 6.06, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.918, 0.0, -16.557), rot: new Quaternion(0.0, 0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I4"}, {type: INTERNAL, end: END, internalId: "I6"}]},
            'I1': {dataIndex: 1, radius: 0, length: 6.06, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.917, 0.0, -16.557), rot: new Quaternion(0.0, -0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I5"}, {type: INTERNAL, end: END, internalId: "I7"}]},
            'I2': {dataIndex: 2, radius: 0, length: 6.06, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.917, 0.0, 16.557), rot: new Quaternion(0.0, 0.9996173696579898, 0.0, -0.027660699160397526), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I12"}, {type: INTERNAL, end: END, internalId: "I14"}]},
            'I3': {dataIndex: 3, radius: 0, length: 6.06, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.917, 0.0, 16.557), rot: new Quaternion(0.0, 0.9996173688008357, 0.0, 0.027660730136678004), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I13"}, {type: INTERNAL, end: END, internalId: "I15"}]},
            'I4': {dataIndex: 4, radius: 0, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.58193576, 0.0, -10.507073), rot: new Quaternion(0.0, 0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I8"}]},
            'I5': {dataIndex: 5, radius: 0, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.58193576, 0.0, -10.507073), rot: new Quaternion(0.0, -0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: INTERNAL, end: END, internalId: "I9"}]},
            'I6': {dataIndex: 6, radius: 190, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.58193576, 0.0, -10.507073), rot: new Quaternion(0.0, 0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I10"}]},
            'I7': {dataIndex: 7, radius: -190, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.58193576, 0.0, -10.507073), rot: new Quaternion(0.0, -0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: INTERNAL, end: END, internalId: "I11"}]},
            'I8': {dataIndex: 8, radius: 0, length: 6.123, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.16930215, 0.0, -3.0568154), rot: new Quaternion(0.0, 0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I4"}, {type: INTERNAL, end: END, internalId: "I12"}]},
            'I9': {dataIndex: 9, radius: 0, length: 6.123, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.16930215, 0.0, -3.0568154), rot: new Quaternion(0.0, -0.027660779099185687, 0.0, 0.9996173674459773), connections: [{type: INTERNAL, end: START, internalId: "I5"}, {type: INTERNAL, end: END, internalId: "I13"}]},
            'I10': {dataIndex: 10, radius: 190, length: 6.1015196, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.3156827, 0.0, -3.0506287), rot: new Quaternion(0.0, 0.00802823078512509, 0.0, 0.9999677732359482), connections: [{type: INTERNAL, end: START, internalId: "I6"}, {type: INTERNAL, end: END, internalId: "I15"}]},
            'I11': {dataIndex: 11, radius: -190, length: 6.1015196, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.3156827, 0.0, -3.0506287), rot: new Quaternion(0.0, -0.00802823078512509, 0.0, 0.9999677732359482), connections: [{type: INTERNAL, end: START, internalId: "I7"}, {type: INTERNAL, end: END, internalId: "I14"}]},
            'I12': {dataIndex: 12, radius: 0, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.5819341, 0.0, 10.507074), rot: new Quaternion(0.0, 0.9996173696579898, 0.0, -0.027660699160397526), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I8"}]},
            'I13': {dataIndex: 13, radius: 0, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.58193475, 0.0, 10.507074), rot: new Quaternion(0.0, 0.9996173688008357, 0.0, 0.027660730136678004), connections: [{type: INTERNAL, end: START, internalId: "I3"}, {type: INTERNAL, end: END, internalId: "I9"}]},
            'I14': {dataIndex: 14, radius: 190, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.5819341, 0.0, 10.507074), rot: new Quaternion(0.0, 0.9996173696579898, 0.0, -0.027660699160397526), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I11"}]},
            'I15': {dataIndex: 15, radius: -190, length: 7.461676, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.58193475, 0.0, 10.507074), rot: new Quaternion(0.0, 0.9996173688008357, 0.0, 0.027660730136678004), connections: [{type: INTERNAL, end: START, internalId: "I3"}, {type: INTERNAL, end: END, internalId: "I10"}]},
        },
        isolationLabelPos: new Vector3(0, 0, 0),
    },
    'Rld 60E1-1200_600-1_15 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -1200, length: 9.988915, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 600, length: 9.988915, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -1200, length: 29.966747, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.04155636, 0.0, 9.9888), rot: new Quaternion(0.0, 0.004162036211305319, 0.0, 0.9999913386897787), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 600, length: 29.966747, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.08314848, 0.0, 9.988454), rot: new Quaternion(0.0, -0.008323999874410667, 0.0, 0.9999653549129044), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-1200_600-1_15 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 1200, length: 9.988915, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -600, length: 9.988915, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 1200, length: 29.966747, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.04155636, 0.0, 9.9888), rot: new Quaternion(0.0, -0.004162036211305319, 0.0, 0.9999913386897787), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -600, length: 29.966747, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.08314848, 0.0, 9.988454), rot: new Quaternion(0.0, 0.008323999874410667, 0.0, 0.9999653549129044), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-1200_900-1_18.5 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -1200, length: 12.153293, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 900, length: 12.153293, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -1200, length: 36.459877, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.061511993, 0.0, 12.153085), rot: new Quaternion(0.0, 0.005063850891758188, 0.0, 0.9999871786248793), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 900, length: 36.459877, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.082075596, 0.0, 12.152923), rot: new Quaternion(0.0, -0.00675177884120445, 0.0, 0.9999772064814675), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-1200_900-1_18.5 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 1200, length: 12.153293, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -900, length: 12.153293, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 1200, length: 36.459877, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.061511993, 0.0, 12.153085), rot: new Quaternion(0.0, -0.005063850891758189, 0.0, 0.9999871786248793), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -900, length: 36.459877, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.082075596, 0.0, 12.152923), rot: new Quaternion(0.0, 0.00675177884120445, 0.0, 0.9999772064814675), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-1800_300-1_9 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -1800, length: 8.30777, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 300, length: 8.30777, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -1800, length: 24.92331, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.019204617, 0.0, 8.30774), rot: new Quaternion(0.0, 0.0023077117551438147, 0.0, 0.9999973372296824), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 300, length: 24.92331, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.115031004, 0.0, 8.306708), rot: new Quaternion(0.0, -0.013845840747325157, 0.0, 0.9999041417525981), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-1800_300-1_9 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 1800, length: 8.30777, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -300, length: 8.30777, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 1800, length: 24.92331, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.019204617, 0.0, 8.30774), rot: new Quaternion(0.0, -0.0023077117551438147, 0.0, 0.9999973372296824), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -300, length: 24.92331, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.115031004, 0.0, 8.306708), rot: new Quaternion(0.0, 0.013845840747325157, 0.0, 0.9999041417525981), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-1800_600-1_14 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -1800, length: 10.700655, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 600, length: 10.700655, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -1800, length: 32.101967, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.031757355, 0.0, 10.700592), rot: new Quaternion(0.0, 0.002972399747715592, 0.0, 0.9999955824101124), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 600, length: 32.101967, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.095415115, 0.0, 10.700088), rot: new Quaternion(0.0, -0.008917093017261582, 0.0, 0.999960241935709), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-1800_600-1_14 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 1800, length: 10.700655, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -600, length: 10.700655, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 1800, length: 32.101967, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.031757355, 0.0, 10.700592), rot: new Quaternion(0.0, -0.0029723997477155923, 0.0, 0.9999955824101124), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -600, length: 32.101967, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.095415115, 0.0, 10.700088), rot: new Quaternion(0.0, 0.008917093017261584, 0.0, 0.999960241935709), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-1800_900-1_18.5 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -1800, length: 12.153293, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 900, length: 12.153293, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -1800, length: 36.459877, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.040984154, 0.0, 12.1532), rot: new Quaternion(0.0, 0.003375908470380459, 0.0, 0.999994301604764), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 900, length: 36.459877, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.082075596, 0.0, 12.152923), rot: new Quaternion(0.0, -0.00675177884120445, 0.0, 0.9999772064814675), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-1800_900-1_18.5 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 1800, length: 12.153293, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -900, length: 12.153293, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 1800, length: 36.459877, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.040984154, 0.0, 12.1532), rot: new Quaternion(0.0, -0.003375908470380459, 0.0, 0.999994301604764), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -900, length: 36.459877, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.082075596, 0.0, 12.152923), rot: new Quaternion(0.0, 0.00675177884120445, 0.0, 0.9999772064814675), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-2500_1200-1_22 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -2500, length: 13.629328, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 1200, length: 13.629328, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -2500, length: 40.887985, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.03710389, 0.0, 13.62926), rot: new Quaternion(0.0, 0.0027258621586508207, 0.0, 0.9999962848308449), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 1200, length: 40.887985, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.07739067, 0.0, 13.629035), rot: new Quaternion(0.0, -0.0056788565589581345, 0.0, 0.9999838751640863), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-2500_1200-1_22 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 2500, length: 13.629328, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -1200, length: 13.629328, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 2500, length: 40.887985, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.03710389, 0.0, 13.62926), rot: new Quaternion(0.0, -0.0027258621586508202, 0.0, 0.9999962848308448), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -1200, length: 40.887985, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.07739067, 0.0, 13.629035), rot: new Quaternion(0.0, 0.005678856558958134, 0.0, 0.9999838751640863), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-2500_250-1_8.5 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -2500, length: 7.3276725, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 250, length: 7.3276725, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -2500, length: 21.983017, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.010728836, 0.0, 7.3276615), rot: new Quaternion(0.0, 0.0014655339382571618, 0.0, 0.9999989261045613), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 250, length: 21.983017, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.10737777, 0.0, 7.3266234), rot: new Quaternion(0.0, -0.014654821448012428, 0.0, 0.9998926123381086), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-2500_250-1_8.5 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 2500, length: 7.3276725, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -250, length: 7.3276725, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 2500, length: 21.983017, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.010728836, 0.0, 7.3276615), rot: new Quaternion(0.0, -0.0014655339382571616, 0.0, 0.9999989261045613), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -250, length: 21.983017, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.10737777, 0.0, 7.3266234), rot: new Quaternion(0.0, 0.014654821448012426, 0.0, 0.9998926123381084), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-2500_400-1_10.5 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -2500, length: 9.502313, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 400, length: 9.502313, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -2500, length: 28.506939, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.018030405, 0.0, 9.50229), rot: new Quaternion(0.0, 0.0019004613888283534, 0.0, 0.9999981941216242), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 400, length: 28.506939, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.112867355, 0.0, 9.501418), rot: new Quaternion(0.0, -0.011877612509093369, 0.0, 0.9999294586725025), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-2500_400-1_10.5 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 2500, length: 9.502313, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -400, length: 9.502313, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 2500, length: 28.506939, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.018030405, 0.0, 9.50229), rot: new Quaternion(0.0, -0.0019004613888283543, 0.0, 0.9999981941216243), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -400, length: 28.506939, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.112867355, 0.0, 9.501418), rot: new Quaternion(0.0, 0.011877612509093369, 0.0, 0.9999294586725025), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-2500_600-1_14 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -2500, length: 10.700655, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 600, length: 10.700655, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -2500, length: 32.101967, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.022947788, 0.0, 10.700623), rot: new Quaternion(0.0, 0.0021401296356246447, 0.0, 0.9999977099199492), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 600, length: 32.101967, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.095415115, 0.0, 10.700088), rot: new Quaternion(0.0, -0.008917093017261582, 0.0, 0.999960241935709), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-2500_600-1_14 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 2500, length: 10.700655, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -600, length: 10.700655, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 2500, length: 32.101967, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.022947788, 0.0, 10.700623), rot: new Quaternion(0.0, -0.0021401296356246447, 0.0, 0.9999977099199492), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -600, length: 32.101967, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.095415115, 0.0, 10.700088), rot: new Quaternion(0.0, 0.008917093017261584, 0.0, 0.999960241935709), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-2500_900-1_17 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -2500, length: 13.03732, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 900, length: 13.03732, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -2500, length: 39.11196, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.033974648, 0.0, 13.037261), rot: new Quaternion(0.0, 0.002607461301478442, 0.0, 0.9999966005670027), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 900, length: 39.11196, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.09441376, 0.0, 13.036864), rot: new Quaternion(0.0, -0.007242892782041625, 0.0, 0.9999737699080651), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-2500_900-1_17 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 2500, length: 13.03732, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -900, length: 13.03732, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 2500, length: 39.11196, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.033974648, 0.0, 13.037261), rot: new Quaternion(0.0, -0.0026074613014784426, 0.0, 0.9999966005670027), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -900, length: 39.11196, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.09441376, 0.0, 13.036864), rot: new Quaternion(0.0, 0.007242892782041625, 0.0, 0.9999737699080651), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-600_300-1_9 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -600, length: 7.4813423, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 300, length: 7.4813423, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -600, length: 22.444027, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.046634674, 0.0, 7.4811487), rot: new Quaternion(0.0, 0.006234411574234664, 0.0, 0.9999805658673188), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 300, length: 22.444027, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.09328723, 0.0, 7.480567), rot: new Quaternion(0.0, -0.012468580553940007, 0.0, 0.9999222642280599), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-600_300-1_9 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 600, length: 7.4813423, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -300, length: 7.4813423, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 600, length: 22.444027, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.046634674, 0.0, 7.4811487), rot: new Quaternion(0.0, -0.006234411574234663, 0.0, 0.9999805658673188), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -300, length: 22.444027, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.09328723, 0.0, 7.480567), rot: new Quaternion(0.0, 0.012468580553940007, 0.0, 0.9999222642280599), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-650_450-1_15 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -650, length: 7.491685, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 450, length: 7.491685, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -650, length: 22.475056, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.043159723, 0.0, 7.491519), rot: new Quaternion(0.0, 0.0057628037977702305, 0.0, 0.9999833949083297), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 450, length: 22.475056, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.06236136, 0.0, 7.4913387), rot: new Quaternion(0.0, -0.008323997874549276, 0.0, 0.9999653549295519), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-650_450-1_15 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 650, length: 7.491685, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -450, length: 7.491685, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 650, length: 22.475056, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.043159723, 0.0, 7.491519), rot: new Quaternion(0.0, -0.0057628037977702305, 0.0, 0.9999833949083297), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -450, length: 22.475056, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.06236136, 0.0, 7.4913387), rot: new Quaternion(0.0, 0.008323997874549278, 0.0, 0.9999653549295519), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-700_190-1_7.5 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -700, length: 6.3054323, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 190, length: 6.3054323, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -700, length: 18.916298, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.028413534, 0.0, 6.305347), rot: new Quaternion(0.0, 0.004503865243915039, 0.0, 0.9999898575474977), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 190, length: 18.916298, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.104619265, 0.0, 6.3042746), rot: new Quaternion(0.0, -0.016592478927077995, 0.0, 0.9998623353457488), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-700_190-1_7.5 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 700, length: 6.3054323, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -190, length: 6.3054323, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 700, length: 18.916298, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.028413534, 0.0, 6.305347), rot: new Quaternion(0.0, -0.0045038652439150385, 0.0, 0.9999898575474977), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -190, length: 18.916298, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.104619265, 0.0, 6.3042746), rot: new Quaternion(0.0, 0.01659247892707799, 0.0, 0.9998623353457488), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-700_300-1_10 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -700, length: 7.3465924, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 300, length: 7.3465924, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -700, length: 22.039778, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.038552284, 0.0, 7.3464575), rot: new Quaternion(0.0, 0.005247542008168705, 0.0, 0.9999862315566512), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 300, length: 22.039778, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.08994341, 0.0, 7.345858), rot: new Quaternion(0.0, -0.01224401425609455, 0.0, 0.9999250392478911), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-700_300-1_10 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 700, length: 7.3465924, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -300, length: 7.3465924, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 700, length: 22.039778, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.038552284, 0.0, 7.3464575), rot: new Quaternion(0.0, -0.005247542008168705, 0.0, 0.9999862315566512), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -300, length: 22.039778, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.08994341, 0.0, 7.345858), rot: new Quaternion(0.0, 0.012244014256094551, 0.0, 0.9999250392478911), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-700_500-1_14 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -700, length: 8.9172125, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 500, length: 8.9172125, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -700, length: 26.751637, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.056785345, 0.0, 8.916971), rot: new Quaternion(0.0, 0.006369394605733862, 0.0, 0.9999797152004417), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 500, length: 26.751637, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.079512596, 0.0, 8.916739), rot: new Quaternion(0.0, -0.008917093017261582, 0.0, 0.999960241935709), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-700_500-1_14 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 700, length: 8.9172125, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -500, length: 8.9172125, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 700, length: 26.751637, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.056785345, 0.0, 8.916971), rot: new Quaternion(0.0, -0.006369394605733862, 0.0, 0.9999797152004417), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -500, length: 26.751637, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.079512596, 0.0, 8.916739), rot: new Quaternion(0.0, 0.008917093017261584, 0.0, 0.999960241935709), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-900_300-1_9 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -900, length: 8.30777, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 300, length: 8.30777, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -900, length: 24.92331, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.03835559, 0.0, 8.3076515), rot: new Quaternion(0.0, 0.004615411764290259, 0.0, 0.9999893489304005), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 300, length: 24.92331, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.115031004, 0.0, 8.306708), rot: new Quaternion(0.0, -0.013845840747325157, 0.0, 0.9999041417525981), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-900_300-1_9 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 900, length: 8.30777, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -300, length: 8.30777, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 900, length: 24.92331, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.03835559, 0.0, 8.3076515), rot: new Quaternion(0.0, -0.004615411764290259, 0.0, 0.9999893489304005), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -300, length: 24.92331, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.115031004, 0.0, 8.306708), rot: new Quaternion(0.0, 0.013845840747325157, 0.0, 0.9999041417525981), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-900_450-1_12 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -900, length: 9.35878, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 450, length: 9.35878, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -900, length: 28.07634, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.04865527, 0.0, 9.358611), rot: new Quaternion(0.0, 0.005199299070468306, 0.0, 0.9999864835532408), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 450, length: 28.07634, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.09731054, 0.0, 9.358105), rot: new Quaternion(0.0, -0.01039845694368994, 0.0, 0.9999459345850605), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-900_450-1_12 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 900, length: 9.35878, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -450, length: 9.35878, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 900, length: 28.07634, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.04865527, 0.0, 9.358611), rot: new Quaternion(0.0, -0.005199299070468306, 0.0, 0.9999864835532408), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -450, length: 28.07634, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.09731054, 0.0, 9.358105), rot: new Quaternion(0.0, 0.01039845694368994, 0.0, 0.9999459345850605), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-900_600-1_15 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -900, length: 9.988915, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 600, length: 9.988915, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -900, length: 29.966747, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.05541444, 0.0, 9.988709), rot: new Quaternion(0.0, 0.005549369011838308, 0.0, 0.9999846021332381), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 600, length: 29.966747, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.08314848, 0.0, 9.988454), rot: new Quaternion(0.0, -0.008323999874410667, 0.0, 0.9999653549129044), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rld 60E1-900_600-1_15 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 900, length: 9.988915, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -600, length: 9.988915, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 900, length: 29.966747, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.05541444, 0.0, 9.988709), rot: new Quaternion(0.0, -0.005549369011838308, 0.0, 0.999984602133238), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -600, length: 29.966747, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.08314848, 0.0, 9.988454), rot: new Quaternion(0.0, 0.008323999874410667, 0.0, 0.9999653549129044), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlds 60E1-1000-1000-1_23': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -1000, length: 13.037319, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 1000, length: 13.037319, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -1000, length: 30.42041, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.08499622, 0.0, 13.036949), rot: new Quaternion(0.0, 0.006518614197587025, 0.0, 0.999978753608767), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 1000, length: 30.42041, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.08499622, 0.0, 13.036949), rot: new Quaternion(0.0, -0.006518614197587025, 0.0, 0.999978753608767), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlds 60E1-190-190-1_9': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -190, length: 6.369, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 190, length: 6.369, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -190, length: 14.861, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.10673702, 0.0, 6.3678074), rot: new Quaternion(0.0, 0.016759739089971103, 0.0, 0.9998595457091142), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 190, length: 14.861, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.10673702, 0.0, 6.3678074), rot: new Quaternion(0.0, -0.016759739089971103, 0.0, 0.9998595457091142), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlds 60E1-600-600-1_18.5': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -600, length: 9.966785, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 599.9205, length: 9.966785, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -600, length: 23.255833, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.08279085, 0.0, 9.966328), rot: new Quaternion(0.0, 0.008305558653254956, 0.0, 0.9999655082528884), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 599.9205, length: 23.255833, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.08277988, 0.0, 9.966328), rot: new Quaternion(0.0, -0.008306659992563026, 0.0, 0.9999654991047281), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-1200_300-1_7 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 1200, length: 10.660172, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 300, length: 10.660172, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 1200, length: 31.980518, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.04734993, 0.0, 10.660033), rot: new Quaternion(0.0, -0.004441724446729304, 0.0, 0.9999901354933154), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 300, length: 31.980518, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.18938184, 0.0, 10.657929), rot: new Quaternion(0.0, -0.01776602049897147, 0.0, 0.9998421718029452), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-1200_300-1_7 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -1200, length: 10.660172, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -300, length: 10.660172, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -1200, length: 31.980518, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.04734993, 0.0, 10.660033), rot: new Quaternion(0.0, 0.004441724446729304, 0.0, 0.9999901354933154), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -300, length: 31.980518, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.18938184, 0.0, 10.657929), rot: new Quaternion(0.0, 0.01776602049897147, 0.0, 0.9998421718029452), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-1200_600-1_9 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 1200, length: 17, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 600, length: 17, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 1200, length: 51, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.120449066, 0.0, 16.999432), rot: new Quaternion(0.0, -0.007083276094105212, 0.0, 0.9999749132852157), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 600, length: 51, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.2408266, 0.0, 16.997726), rot: new Quaternion(0.0, -0.01416619435444039, 0.0, 0.9998996544341399), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-1200_600-1_9 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -1200, length: 17, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -600, length: 17, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -1200, length: 51, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.120449066, 0.0, 16.999432), rot: new Quaternion(0.0, 0.007083276094105211, 0.0, 0.9999749132852157), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -600, length: 51, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.2408266, 0.0, 16.997726), rot: new Quaternion(0.0, 0.01416619435444039, 0.0, 0.9998996544341399), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-1500_450-1_9 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 1500, length: 12.461658, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 450, length: 12.461658, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 1500, length: 37.38497, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.051766634, 0.0, 12.4615135), rot: new Quaternion(0.0, -0.004153874586289797, 0.0, 0.999991372625745), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 450, length: 37.38497, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.1725465, 0.0, 12.460065), rot: new Quaternion(0.0, -0.013845844746558256, 0.0, 0.99990414169722), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-1500_450-1_9 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -1500, length: 12.461658, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -450, length: 12.461658, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -1500, length: 37.38497, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.051766634, 0.0, 12.4615135), rot: new Quaternion(0.0, 0.004153874586289797, 0.0, 0.9999913726257449), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -450, length: 37.38497, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.1725465, 0.0, 12.460065), rot: new Quaternion(0.0, 0.013845844746558254, 0.0, 0.99990414169722), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-1800_300-1_7.5 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 1800, length: 9.75, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 300, length: 9.75, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 1800, length: 29.25, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.026392937, 0.0, 9.749952), rot: new Quaternion(0.0, -0.0027083302254311886, 0.0, 0.9999963324669697), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 300, length: 29.25, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.15842915, 0.0, 9.748283), rot: new Quaternion(0.0, -0.016249285539174253, 0.0, 0.9998679716439898), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-1800_300-1_7.5 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -1800, length: 9.75, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -300, length: 9.75, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -1800, length: 29.25, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.026392937, 0.0, 9.749952), rot: new Quaternion(0.0, 0.0027083302254311886, 0.0, 0.9999963324669696), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -300, length: 29.25, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.15842915, 0.0, 9.748283), rot: new Quaternion(0.0, 0.016249285539174253, 0.0, 0.9998679716439898), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-1800_450-1_9 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 1800, length: 12.461658, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 450, length: 12.461658, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 1800, length: 37.38497, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.04312992, 0.0, 12.461558), rot: new Quaternion(0.0, -0.0034615648918818807, 0.0, 0.9999940087663023), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 450, length: 37.38497, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.1725465, 0.0, 12.460065), rot: new Quaternion(0.0, -0.013845844746558256, 0.0, 0.99990414169722), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-1800_450-1_9 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -1800, length: 12.461658, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -450, length: 12.461658, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -1800, length: 37.38497, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.04312992, 0.0, 12.461558), rot: new Quaternion(0.0, 0.0034615648918818807, 0.0, 0.9999940087663023), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -450, length: 37.38497, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.1725465, 0.0, 12.460065), rot: new Quaternion(0.0, 0.013845844746558254, 0.0, 0.99990414169722), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-1800_600-1_10 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 1800, length: 14.9626875, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 599.48096, length: 14.9626875, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 1800, length: 44.88806, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.06222725, 0.0, 14.962515), rot: new Quaternion(0.0, -0.004156291010744997, 0.0, 0.9999913625852146), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 599.48096, length: 44.88806, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.18673465, 0.0, 14.961134), rot: new Quaternion(0.0, -0.01247937861963297, 0.0, 0.9999221295227284), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-1800_600-1_10 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -1800, length: 14.9626875, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -599.48096, length: 14.9626875, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -1800, length: 44.88806, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.06222725, 0.0, 14.962515), rot: new Quaternion(0.0, 0.004156291010744997, 0.0, 0.9999913625852145), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -599.48096, length: 44.88806, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.18673465, 0.0, 14.961134), rot: new Quaternion(0.0, 0.012479378619632971, 0.0, 0.9999221295227283), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-600_300-1_6 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 600, length: 12, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 300, length: 12, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 600, length: 36, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.11998415, 0.0, 11.9992), rot: new Quaternion(0.0, -0.009999835003999797, 0.0, 0.9999500003999664), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 300, length: 36, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.2399683, 0.0, 11.9968), rot: new Quaternion(0.0, -0.01999866813277342, 0.0, 0.9998000066377852), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-600_300-1_6 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -600, length: 12, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -300, length: 12, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -600, length: 36, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.11998415, 0.0, 11.9992), rot: new Quaternion(0.0, 0.009999835003999797, 0.0, 0.9999500003999664), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -300, length: 36, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.2399683, 0.0, 11.9968), rot: new Quaternion(0.0, 0.01999866813277342, 0.0, 0.9998000066377852), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-650_190-1_20 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 650, length: 8.119927, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 190, length: 8.119927, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 650, length: 24.359783, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.050714612, 0.0, 8.119716), rot: new Quaternion(0.0, -0.00624605795746188, 0.0, 0.9999804931897383), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 190, length: 24.359783, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.17348588, 0.0, 8.1174555), rot: new Quaternion(0.0, -0.021366604035050273, 0.0, 0.9997717080573991), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-650_190-1_20 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -650, length: 8.119927, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -190, length: 8.119927, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -650, length: 24.359783, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.050714612, 0.0, 8.119716), rot: new Quaternion(0.0, 0.006246057957461881, 0.0, 0.9999804931897383), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -190, length: 24.359783, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.17348588, 0.0, 8.1174555), rot: new Quaternion(0.0, 0.021366604035050273, 0.0, 0.9997717080573991), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-750_190-1_6 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 750, length: 7.86244, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 190, length: 7.86244, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 750, length: 23.58732, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.04121661, 0.0, 7.8622966), rot: new Quaternion(0.0, -0.005241603804487704, 0.0, 0.9999862627004218), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 190, length: 23.58732, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.16265929, 0.0, 7.860196), rot: new Quaternion(0.0, -0.020689153101167673, 0.0, 0.9997859565646822), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-750_190-1_6 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -750, length: 7.86244, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -190, length: 7.86244, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -750, length: 23.58732, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.04121661, 0.0, 7.8622966), rot: new Quaternion(0.0, 0.005241603804487705, 0.0, 0.9999862627004217), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -190, length: 23.58732, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.16265929, 0.0, 7.860196), rot: new Quaternion(0.0, 0.020689153101167673, 0.0, 0.9997859565646822), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-800_250-1_6.5 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 800, length: 9.559153, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 250, length: 9.559153, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 800, length: 28.677458, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.05712509, 0.0, 9.558925), rot: new Quaternion(0.0, -0.005974434918625633, 0.0, 0.9999821529044421), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 250, length: 28.677458, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.18273294, 0.0, 9.556824), rot: new Quaternion(0.0, -0.019117140014917662, 0.0, 0.9998172507801865), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-800_250-1_6.5 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -800, length: 9.559153, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -250, length: 9.559153, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -800, length: 28.677458, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.05712509, 0.0, 9.558925), rot: new Quaternion(0.0, 0.005974434918625631, 0.0, 0.9999821529044421), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -250, length: 28.677458, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.18273294, 0.0, 9.556824), rot: new Quaternion(0.0, 0.019117140014917666, 0.0, 0.9998172507801864), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-900_300-1_7.5 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 900, length: 9.955945, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 300, length: 9.955945, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 900, length: 29.867836, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.055092573, 0.0, 9.955742), rot: new Quaternion(0.0, -0.005531053298709245, 0.0, 0.9999847036077136), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 300, length: 29.867836, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.16518831, 0.0, 9.954118), rot: new Quaternion(0.0, -0.016592478927077995, 0.0, 0.9998623353457488), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-900_300-1_7.5 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -900, length: 9.955945, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -300, length: 9.955945, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -900, length: 29.867836, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.055092573, 0.0, 9.955742), rot: new Quaternion(0.0, 0.005531053298709243, 0.0, 0.9999847036077136), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -300, length: 29.867836, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.16518831, 0.0, 9.954118), rot: new Quaternion(0.0, 0.01659247892707799, 0.0, 0.9998623353457488), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-900_300-1_9 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 900, length: 12.461658, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 300, length: 12.461658, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 900, length: 37.38497, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.08625984, 0.0, 12.46126), rot: new Quaternion(0.0, -0.006923087966348472, 0.0, 0.999976035139348), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 300, length: 37.38497, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.25877953, 0.0, 12.458075), rot: new Quaternion(0.0, -0.02076793444311733, 0.0, 0.9997843231912402), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-900_300-1_9 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -900, length: 12.461658, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -300, length: 12.461658, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -900, length: 37.38497, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.08625984, 0.0, 12.46126), rot: new Quaternion(0.0, 0.006923087966348472, 0.0, 0.9999760351393479), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -300, length: 37.38497, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.25877953, 0.0, 12.458075), rot: new Quaternion(0.0, 0.02076793444311733, 0.0, 0.9997843231912402), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-900_450-1_7.5 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 900, length: 14.75, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 450, length: 14.75, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 900, length: 44.25, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.12086034, 0.0, 14.74934), rot: new Quaternion(0.0, -0.00819435388296926, 0.0, 0.9999664257186042), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 450, length: 44.25, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.24172068, 0.0, 14.74736), rot: new Quaternion(0.0, -0.01638815608445169, 0.0, 0.9998657051525228), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rlj 60E1-900_450-1_7.5 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: -900, length: 14.75, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -450, length: 14.75, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: -900, length: 44.25, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.12086034, 0.0, 14.74934), rot: new Quaternion(0.0, 0.008194353882969258, 0.0, 0.9999664257186042), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -450, length: 44.25, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.24172068, 0.0, 14.74736), rot: new Quaternion(0.0, 0.01638815608445169, 0.0, 0.9998657051525228), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-1200-1_18.5 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 19.445269, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 1200, length: 19.445269, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 45.37229, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 19.445269), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 1200, length: 45.356537, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.15757084, 0.0, 19.444418), rot: new Quaternion(0.0, -0.008102106816836974, 0.0, 0.9999671773939026), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-1200-1_18.5 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 19.445269, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -1200, length: 19.445269, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 45.37229, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 19.445269), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -1200, length: 45.356537, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.15757084, 0.0, 19.444418), rot: new Quaternion(0.0, 0.008102106816836976, 0.0, 0.9999671773939026), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-190-1_7.5 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 7.5665197, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 190, length: 7.5665197, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 17.655212, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 7.5665197), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 190, length: 17.618273, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.15064359, 0.0, 7.5645204), rot: new Quaternion(0.0, -0.019910581293294614, 0.0, 0.99980176472767), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-190-1_7.5 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 7.5665197, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -190, length: 7.5665197, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 17.655212, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 7.5665197), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -190, length: 17.618273, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.15064359, 0.0, 7.5645204), rot: new Quaternion(0.0, 0.019910581293294614, 0.0, 0.99980176472767), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-190-1_9 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 6.313906, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 190, length: 6.313906, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 14.732447, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 6.313906), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: INTERNAL, end: END, internalId: "I5"}]},
            'I4': {dataIndex: 4, radius: 190, length: 14.710966, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.10490239, 0.0, 6.312744), rot: new Quaternion(0.0, -0.016614781418275746, 0.0, 0.9998619649923798), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I6"}]},
            'I5': {dataIndex: 5, radius: 0, length: 6.0923653, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 21.046352), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I3"}, {type: EXTERNAL, end: END}]},
            'I6': {dataIndex: 6, radius: 0, length: 6.0923653, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-1.162094, 0.0, 20.98199), rot: new Quaternion(0.0, -0.05530037962307269, 0.0, 0.9984697631944315), connections: [{type: INTERNAL, end: START, internalId: "I4"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-190-1_9 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 6.313906, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -190, length: 6.313906, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 14.732447, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 6.313906), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: INTERNAL, end: END, internalId: "I5"}]},
            'I4': {dataIndex: 4, radius: -190, length: 14.710966, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.10490239, 0.0, 6.312744), rot: new Quaternion(0.0, 0.016614781418275746, 0.0, 0.9998619649923798), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I6"}]},
            'I5': {dataIndex: 5, radius: 0, length: 6.0923653, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 21.046352), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I3"}, {type: EXTERNAL, end: END}]},
            'I6': {dataIndex: 6, radius: 0, length: 6.0923653, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(1.162094, 0.0, 20.98199), rot: new Quaternion(0.0, 0.05530037962307268, 0.0, 0.9984697631944315), connections: [{type: INTERNAL, end: START, internalId: "I4"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-205-1_9 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 6.812372, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 205, length: 6.812372, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 15.8955345, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 6.812372), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: INTERNAL, end: END, internalId: "I6"}]},
            'I4': {dataIndex: 4, radius: 205, length: 15.872358, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.113184154, 0.0, 6.811118), rot: new Quaternion(0.0, -0.016614779418827916, 0.0, 0.9998619650256048), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I5"}]},
            'I5': {dataIndex: 5, radius: 0, length: 5.42, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-1.254, 0.0, 22.638), rot: new Quaternion(0.0, -0.05530037962307269, 0.0, 0.9984697631944315), connections: [{type: INTERNAL, end: START, internalId: "I4"}, {type: EXTERNAL, end: END}]},
            'I6': {dataIndex: 6, radius: 0, length: 5.42, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 22.707), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I3"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-205-1_9 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 6.812372, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -205, length: 6.812372, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 15.8955345, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 6.812372), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: INTERNAL, end: END, internalId: "I6"}]},
            'I4': {dataIndex: 4, radius: -205, length: 15.872358, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.113184154, 0.0, 6.811118), rot: new Quaternion(0.0, 0.016614779418827913, 0.0, 0.9998619650256048), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I5"}]},
            'I5': {dataIndex: 5, radius: 0, length: 5.42, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(1.254, 0.0, 22.638), rot: new Quaternion(0.0, 0.05530037962307268, 0.0, 0.9984697631944315), connections: [{type: INTERNAL, end: START, internalId: "I4"}, {type: EXTERNAL, end: END}]},
            'I6': {dataIndex: 6, radius: 0, length: 5.42, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 22.707), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I3"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-2500-1_26.5 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.28698993, 53.79129, 39.312527), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 28.291822, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.28698993, 53.79129, 39.312527), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 2500, length: 28.291822, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.28698993, 53.79129, 39.312527), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 66.014244, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.28698993, 53.79129, 67.604349), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 2500, length: 66.00306, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.4470284, 53.79129, 67.603747), rot: new Quaternion(0.0, -0.005658334951873111, 0.0, 0.9999839914946501), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-2500-1_26.5 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 28.291822, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -2500, length: 28.291822, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 66.014244, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 28.291822), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -2500, length: 66.00306, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.16003847, 0.0, 28.29122), rot: new Quaternion(0.0, 0.00565833495187311, 0.0, 0.9999839914946501), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-265-1_10 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 7.930224, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 265, length: 7.930224, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 18.503855, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 7.930224), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: INTERNAL, end: END, internalId: "I5"}]},
            'I4': {dataIndex: 4, radius: 265, length: 18.48197, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.118653774, 0.0, 7.92904), rot: new Quaternion(0.0, -0.01496212901619818, 0.0, 0.9998880610824907), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I6"}]},
            'I5': {dataIndex: 5, radius: 0, length: 4.75, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 26.43135), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I3"}, {type: EXTERNAL, end: END}]},
            'I6': {dataIndex: 6, radius: 0, length: 4.75, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-1.3155, 0.0, 26.368), rot: new Quaternion(0.0, -0.04980847289357601, 0.0, 0.9987587877100306), connections: [{type: INTERNAL, end: START, internalId: "I4"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-265-1_10 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 7.930224, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -265, length: 7.930224, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 18.503855, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 7.930224), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: INTERNAL, end: END, internalId: "I5"}]},
            'I4': {dataIndex: 4, radius: -265, length: 18.48197, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.118653774, 0.0, 7.92904), rot: new Quaternion(0.0, 0.01496212901619818, 0.0, 0.9998880610824907), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I6"}]},
            'I5': {dataIndex: 5, radius: 0, length: 4.75, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 26.43135), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I3"}, {type: EXTERNAL, end: END}]},
            'I6': {dataIndex: 6, radius: 0, length: 4.75, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(1.3155, 0.0, 26.368), rot: new Quaternion(0.0, 0.04980847289357602, 0.0, 0.9987587877100306), connections: [{type: INTERNAL, end: START, internalId: "I4"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-300-1_9 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 9.969325, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 300, length: 9.969325, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 23.261757, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 9.969325), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 300, length: 23.22784, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.16563535, 0.0, 9.96749), rot: new Quaternion(0.0, -0.016614779418827916, 0.0, 0.9998619650256048), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-300-1_9 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 9.969325, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -300, length: 9.969325, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 23.261757, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 9.969325), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -300, length: 23.22784, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.16563535, 0.0, 9.96749), rot: new Quaternion(0.0, 0.016614779418827913, 0.0, 0.9998619650256048), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-500-1_12 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 12.478375, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 500, length: 12.478375, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 29.116207, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 12.478375), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 500, length: 29.092243, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.15568733, 0.0, 12.47708), rot: new Quaternion(0.0, -0.012478051826300652, 0.0, 0.9999221460806937), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-500-1_12 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 12.478375, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -500, length: 12.478375, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 29.116207, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 12.478375), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -500, length: 29.092243, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.15568733, 0.0, 12.47708), rot: new Quaternion(0.0, 0.01247805182630065, 0.0, 0.9999221460806937), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-760-1_14 L': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 13.554162, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: 760, length: 13.554162, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 40.662487, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 13.554162), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: 760, length: 40.63951, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(-0.120859146, 0.0, 13.553442), rot: new Quaternion(0.0, -0.008917093017261582, 0.0, 0.999960241935709), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
    'Rz 60E1-760-1_14 R': {
        tracks: {
            'I0': {dataIndex: 0, radius: 0, length: 0.001, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: EXTERNAL, end: START}, {type: INTERNAL, end: END, internalId: "I2"}, {type: INTERNAL, end: END, internalId: "I1"}]},
            'I1': {dataIndex: 1, radius: 0, length: 13.554162, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I3"}]},
            'I2': {dataIndex: 2, radius: -760, length: 13.554162, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 0.0), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I0"}, {type: INTERNAL, end: END, internalId: "I4"}]},
            'I3': {dataIndex: 3, radius: 0, length: 40.662487, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.0, 0.0, 13.554162), rot: new Quaternion(0.0, 0.0, 0.0, 1.0), connections: [{type: INTERNAL, end: START, internalId: "I1"}, {type: EXTERNAL, end: END}]},
            'I4': {dataIndex: 4, radius: -760, length: 40.63951, rz1: 0, rz2: 0, slope1: 0, slope2: 0, pos: new Vector3(0.120859146, 0.0, 13.553442), rot: new Quaternion(0.0, 0.008917093017261584, 0.0, 0.999960241935709), connections: [{type: INTERNAL, end: START, internalId: "I2"}, {type: EXTERNAL, end: END}]},
        },
        isolationLabelPos: new Vector3(0, 0, 6),
    },
};
