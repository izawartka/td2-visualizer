import SceneryObject from "./scenery-object";

export default class Track extends SceneryObject {
    len;
    r;
    id_station;
    id_isolation;
    maxspeed;
    derailspeed;
    category = "tracks";
    type = "Track";
    outs = [];

    constructor(id, pos, rot, len, r, previd, nextid, id_station, id_isolation, maxspeed, derailspeed) {
        super(id, pos, rot);
        Object.assign(this, {
            len, r,
            id_station, id_isolation,
            maxspeed, derailspeed
        });

        this.outs = [previd, nextid];
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
