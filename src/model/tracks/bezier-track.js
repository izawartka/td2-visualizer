import Track, {TrackShape, TrackSource} from "./track";
import Vector3 from "../vector3";
import TrackConnection, {TrackConnectionEnd} from "../track-connection";

export default class BezierTrack extends Track
{
    type = "BezierTrack";
    points = {
        start: Vector3.zero(),
        control1: Vector3.zero(),
        end: Vector3.zero(),
        control2: Vector3.zero(),
        middle: Vector3.zero(),
    };

    constructor(id, start, control1, end, control2, connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed) {
        const length = start.distance(end); // TODO: calculate more precise length
        super(
            id, start,
            Vector3.zero(), // rotation
            length,
            0, // radius
            connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed,
            TrackSource.STANDARD,
            TrackShape.BEZIER,
        );

        Object.assign(this.points, {
            start,
            control1: start.add(control1),
            end,
            control2: end.add(control2),
        });
        this.points.middle = this.getPointAtDist(length / 2);
    }

    _getPointAtT(t) {
        const a1 = this.points.start.lerp(this.points.control1, t);
        const a2 = this.points.control1.lerp(this.points.control2, t);
        const a3 = this.points.control2.lerp(this.points.end, t);

        const b1 = a1.lerp(a2, t);
        const b2 = a2.lerp(a3, t);

        return b1.lerp(b2, t);
    }

    getPointAtDist(dist, fromEnd = TrackConnectionEnd.START) {
        if (fromEnd === TrackConnectionEnd.END) return this.getPointAtDist(this.len - dist, TrackConnectionEnd.START);
        // TODO: This is just an approximation for a Bezier curve
        return this._getPointAtT(dist / this.len);
    }

    getStartAngleXZ() {
        return this.points.start.atanY(this.points.control1);
    }

    getEndAngleXZ() {
        return this.points.control2.atanY(this.points.end);
    }

    static fromText(text) {
        const values = text.split(";");

        const connections = [];
        if (values[15]) connections.push(new TrackConnection(values[15], TrackConnectionEnd.END));
        if (values[16]) connections.push(new TrackConnection(values[16], TrackConnectionEnd.START));

        const track = new BezierTrack(
            values[1], // id
            Vector3.fromValuesArray(values, 3), // start
            Vector3.fromValuesArray(values, 6), // control1
            Vector3.fromValuesArray(values, 9), // end
            Vector3.fromValuesArray(values, 12), // control2
            connections,
            values[17], // id_station
            ...Track.slopesFromText(values[18]), // start_slope, end_slope
            values[21], // id_isolation
            values[23], // prefab_name
            parseFloat(values[24]) || 0, // maxspeed
            parseFloat(values[25]) || 0 // derailspeed
        );

        return track;
    }

    applyObject(scenery) {
        super.applyObject(scenery);
    }
}
