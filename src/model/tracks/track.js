import SceneryObject from "../scenery-object";
import { ElectrificationStatus } from "../electrification-status";

export default class Track extends SceneryObject {
    shape;
    id_station;
    id_isolation;
    maxspeed;
    derailspeed;
    category = "tracks";
    type = "Track";
    connections = [];
    prefab_name;
    switch = null;
    electrificationStatus = ElectrificationStatus.NOT_CHECKED;
    hasNEVP = false;

    constructor(id, rot, shape, connections, id_station, id_isolation, prefab_name, maxspeed, derailspeed) {
        super(id, shape.points.start, rot);
        Object.assign(this, {
            shape,
            connections,
            id_station,
            id_isolation,
            prefab_name,
            maxspeed, derailspeed,
        });
    }

    getRenderBounds() {
        return this.shape.getRenderBounds();
    }
}
