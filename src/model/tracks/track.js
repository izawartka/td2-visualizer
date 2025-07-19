import SceneryObject from "../scenery-object";
import { ElectrificationStatus } from "../electrification-status";
import {TrackConnectionEnd} from "../track-connection";

export const TrackSource = {
    STANDARD: Symbol("TrackSource.STANDARD"),
    BEZIER: Symbol("TrackSource.BEZIER"),
    SWITCH: Symbol("TrackSource.SWITCH"),
    ROUTE: Symbol("TrackSource.ROUTE"),
};

export default class Track extends SceneryObject {
    len;
    r;
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
    route = null;
    electrificationStatus = ElectrificationStatus.NOT_CHECKED;
    hasNEVP = false;
    source;

    constructor(id, pos, rot, len, r, connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed, source) {
        super(id, pos, rot);
        Object.assign(this, {
            len, r,
            connections,
            id_station,
            start_slope, end_slope,
            id_isolation,
            prefab_name,
            maxspeed, derailspeed,
            source,
        });
    }

    getStartAngleXZ() {
        throw new Error("getStartAngleXZ() must be implemented in subclass");
    }

    getEndAngleXZ() {
        throw new Error("getEndAngleXZ() must be implemented in subclass");
    }

    getAngleXZForEnd(end) {
        if (end === TrackConnectionEnd.START) return this.getStartAngleXZ();
        else return this.getEndAngleXZ();
    }

    getPointAtDist(_dist, _fromEnd) {
        throw new Error("getPointAtDist() must be implemented in subclass");
    }

    static slopesFromText(text) {
        return text.split(",", 2).map((slope) => parseFloat(slope));
    }

    getEndPos(end) {
        return end === TrackConnectionEnd.START ? this.points.start : this.points.end;
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
