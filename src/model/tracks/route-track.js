import AngleHelper from "../../helpers/angleHelper";
import Track from "./track";
import {ElectrificationStatus} from "../electrification-status";

export default class RouteTrack extends Track {
    type = "RouteTrack";
    points;
    route;

    constructor(id, start, end, rot, len, r, connections, route, electrified) {
        super(
            id, start, rot, len, r, connections,
            null, // id_station,
            0, // start_slope,
            0, // end_slope,
            null, // id_isolation
            null, // prefab_name
            null, // maxspeed,
            null, // derailspeed,
        );
        this.electrificationStatus = electrified ? ElectrificationStatus.ELECTRIFIED : ElectrificationStatus.NON_ELECTRIFIED;
        this.points = {
            start,
            end,
        };
        this.route = route;
    }

    getStartAngleXZ() {
        return AngleHelper.degToRad(this.rot.y);
    }

    getEndAngleXZ() {
        const startAngle = AngleHelper.degToRad(this.rot.y);

        if(this.r === 0) {
            return startAngle
        }

        return startAngle - this.len / this.r;
    }
}
