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
    start_slope;
    end_slope;
    prefab_name;
    switch = null;
    electrificationStatus = ElectrificationStatus.NOT_CHECKED;
    hasNEVP = false;

    constructor(id, rot, shape, connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed) {
        super(id, shape.points.start, rot);
        Object.assign(this, {
            shape,
            connections,
            id_station,
            start_slope, end_slope,
            id_isolation,
            prefab_name,
            maxspeed, derailspeed,
        });
    }

    static slopesFromText(text) {
        return text.split(",", 2);
    }

    getRenderBounds() {
        return this.shape.getRenderBounds();
    }
}
