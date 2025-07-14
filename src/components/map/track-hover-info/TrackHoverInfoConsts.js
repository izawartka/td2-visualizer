import { ElectrificationStatus } from "../../../model/electrification-status";

const TrackHoverInfoConsts = {
    electrification: {
        [ElectrificationStatus.ELECTRIFIED]: 'Electrified',
        [ElectrificationStatus.NON_ELECTRIFIED]: 'Non-electrified',
        [ElectrificationStatus.NOT_CHECKED]: 'Unknown',
        [ElectrificationStatus.CONFLICT]: 'Error / Conflict',
    },
    type: {
        'StandardTrack': 'Standard track',
        'SwitchTrack': 'Switch track',
        'RouteTrack': 'Route track',
    },
    shape: {
        'ShapeStraight': 'Straight',
        'ShapeArc': 'Circle arc',
        'ShapeBezier': 'Bézier curve',
    },
};

export default TrackHoverInfoConsts;
