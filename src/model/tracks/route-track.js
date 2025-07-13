import Track from "./track";
import {ElectrificationStatus} from "../electrification-status";
import Vector3 from "../vector3";

export default class RouteTrack extends Track {
    type = "RouteTrack";
    route;

    constructor(id, rot, shape, connections, electrified, route) {
        super(
            id,
            Vector3.zero(), // ignore rotation for route tracks
            shape.
            connections,
            null, // id_station,
            0, // start_slope,
            0, // end_slope,
            null, // id_isolation
            null, // prefab_name
            null, // maxspeed,
            null, // derailspeed,
        );
        this.electrificationStatus = electrified ? ElectrificationStatus.ELECTRIFIED : ElectrificationStatus.NON_ELECTRIFIED;
        this.route = route;
    }
}
