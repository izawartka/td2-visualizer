import Track from './track';
import Vector3 from '../vector3';

export default class SwitchTrack extends Track {
    type = "SwitchTrack";

    constructor(id, shape, connections, id_station, id_isolation, prefab_name, maxspeed, derailspeed) {
        super(
            id,
            Vector3.zero(), // ignore rotation for switch tracks
            shape,
            connections, id_station,
            id_isolation, prefab_name, maxspeed, derailspeed,
        );
    }
}
