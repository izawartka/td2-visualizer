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
        'PointTrack': 'Switch track',
        'BezierTrack': 'Bezier track',
        'RouteTrack': 'Route track',
    }
};

export default TrackHoverInfoConsts;
