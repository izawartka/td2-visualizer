import { ElectrificationStatus } from "../../../model/electrification-status";
import {TrackShape} from "../../../model/tracks/track";

const TrackHoverInfoConsts = {
    electrification: {
        [ElectrificationStatus.ELECTRIFIED]: 'Electrified',
        [ElectrificationStatus.NON_ELECTRIFIED]: 'Non-electrified',
        [ElectrificationStatus.NOT_CHECKED]: 'Unknown',
        [ElectrificationStatus.CONFLICT]: 'Error / Conflict',
    },
    shape: {
        [TrackShape.STRAIGHT]: 'Straight',
        [TrackShape.ARC]: 'Curve',
        [TrackShape.BEZIER]: 'Bézier curve',
    }
};

export default TrackHoverInfoConsts;
