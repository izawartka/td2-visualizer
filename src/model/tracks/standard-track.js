import AngleHelper from "../../helpers/angleHelper";
import Track, {TrackSource} from "./track";
import Vector3 from "../vector3";
import TrackConnection, {TrackConnectionEnd} from "../track-connection";
import {ElectrificationStatus} from "../electrification-status";
import CurveHelper from "../../helpers/curveHelper";

export default class StandardTrack extends Track  {
    type = "StandardTrack";
    points = {
        start: Vector3.zero(),
        end: Vector3.zero(),
        middle: Vector3.zero(),
    };

    constructor(id, start, rot, len, r, connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed, source) {
        super(id, start, rot, len, r, connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed, source);
        this._calcPoints();
    }

    _transformPoint(point) {
        const rotRad = AngleHelper.rotationDegToRad(this.rot);
        return point.rotate(rotRad).add(this.points.start);
    }

    getPointAtDist(dist, fromEnd = TrackConnectionEnd.START) {
        if (fromEnd === TrackConnectionEnd.END) return this.getPointAtDist(this.len - dist, TrackConnectionEnd.START)
        const curveEnd = CurveHelper.calculateCurveEndStandard(this.r, dist).endPos;
        // TODO: Verify slope logic
        curveEnd.y += (this.start_slope + this.end_slope) / 2000 * dist;
        return this._transformPoint(curveEnd);
    }

    getStartAngleXZ() {
        return AngleHelper.degToRad(this.rot.y);
    }

    getEndAngleXZ() {
        const startAngle = AngleHelper.degToRad(this.rot.y);

        if (this.r === 0) return startAngle

        // This is only correct for a flat arc on the XZ plane
        return startAngle - this.len / this.r;
    }

    static fromText(text) {
        const values = text.split(";");

        const connections = [];
        if (values[11]) connections.push(new TrackConnection(values[11], TrackConnectionEnd.END));
        if (values[12]) connections.push(new TrackConnection(values[12], TrackConnectionEnd.START));

        const track = new StandardTrack(
            values[1], // id
            Vector3.fromValuesArray(values, 3), // start
            Vector3.fromValuesArray(values, 6), // rot
            parseFloat(values[9]), // len
            parseFloat(values[10]), // r
            connections,
            values[13], // id_station
            ...Track.slopesFromText(values[14]), // start_slope, end_slope
            values[17], // id_isolation
            values[19], // prefab_name
            parseFloat(values[20]) || 0, // maxspeed
            parseFloat(values[21]) || 0, // derailspeed,
            TrackSource.STANDARD,
        );

        return track;
    }

    _calcPoints() {
        this.points.start = this.pos.clone();
        this.points.middle = this.getPointAtDist(this.len / 2, TrackConnectionEnd.START);
        this.points.end = this.getPointAtDist(this.len, TrackConnectionEnd.START);
    }

    applyObject(scenery) {
        super.applyObject(scenery);
    }

    static route(id, start, rot, len, r, connections, electrified, route) {
        const track = new StandardTrack(
            id, start, rot, len, r,
            connections,
            null, // id_station,
            0, // start_slope,
            0, // end_slope,
            null, // id_isolation
            null, // prefab_name
            null, // maxspeed,
            null, // derailspeed,
            TrackSource.ROUTE,
        );
        track.electrificationStatus = electrified ? ElectrificationStatus.ELECTRIFIED : ElectrificationStatus.NON_ELECTRIFIED;
        track.route = route;
        return track;
    }

    static switch(id, start, rot, len, r, connections, start_slope, end_slope, object) {
        const track = new StandardTrack(
            id, start, rot, len, r,
            connections,
            object.id_switch,
            start_slope,
            end_slope,
            object.id_isolation,
            object.prefab_name,
            object.maxspeed,
            object.derailspeed,
            TrackSource.SWITCH,
        );
        track.switch = object;
        return track;
    }
}
