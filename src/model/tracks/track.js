import SceneryObject from "../scenery-object";
import { ElectrificationStatus } from "../electrification-status";

export default class Track extends SceneryObject {
    len;
    r;
    id_station;
    id_isolation;
    maxspeed;
    derailspeed;
    category = "tracks";
    type = "Track";
    nextid;
    previd;
    start_slope;
    end_slope;
    prefab_name;
    hide_isolation = false;
    aliases = [];
    switch = null;
    electrificationStatus = ElectrificationStatus.NOT_CHECKED;
    hasNEVP = false;

    constructor(id, pos, rot, len, r, nextid, previd, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed) {
        super(id, pos, rot);
        Object.assign(this, {
            len, r,
            nextid, previd,
            id_station, 
            start_slope, end_slope,
            id_isolation,
            prefab_name, 
            maxspeed, derailspeed
        });
    }

    static slopesFromText(text) {
        return text.split(",", 2);
    }

    getCloserEndPos(pos) {
        const distStartSq = pos.distanceSq(this.points.start);
        const distEndSq = pos.distanceSq(this.points.end);
        if (distStartSq < distEndSq) {
            return this.points.start;
        } else {
            return this.points.end;
        }
    }
    
    getRenderBounds() {
        return Object.values(this.points);
    }
}
