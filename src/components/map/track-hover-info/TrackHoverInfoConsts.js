import { ElectrificationStatus } from "../../../model/electrification-status";
import {TrackSource} from "../../../model/tracks/track";

const TrackHoverInfoConsts = {
    electrification: {
        [ElectrificationStatus.ELECTRIFIED]: 'Electrified',
        [ElectrificationStatus.NON_ELECTRIFIED]: 'Non-electrified',
        [ElectrificationStatus.NOT_CHECKED]: 'Unknown',
        [ElectrificationStatus.CONFLICT]: 'Error / Conflict',
    },
    source: {
        [TrackSource.STANDARD]: 'Standard track',
        [TrackSource.SWITCH]: 'Switch track',
        [TrackSource.BEZIER]: 'Bezier track',
        [TrackSource.ROUTE]: 'Route track',
    }
};

export default TrackHoverInfoConsts;
