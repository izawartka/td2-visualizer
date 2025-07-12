import Track from "./track";
import Vector3 from "../vector3";
import TrackConnection, {TrackConnectionEnd} from "../track-connection";
import IsolationId from "../isolation-id";

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

    constructor(id, start, control1, end, control2, rot, len, r, connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed) {
        super(id, start, rot, len, r, connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed);

        Object.assign(this.points, {
            start,
            control1: start.add(control1),
            end,
            control2: end.add(control2),
        });
        // This is not the the actual middle point, but it's close enough
        this.points.middle = this._pointAtT(0.5);
    }

    _pointAtT(t) {
        const a1 = this.points.start.lerp(this.points.control1, t);
        const a2 = this.points.control1.lerp(this.points.control2, t);
        const a3 = this.points.control2.lerp(this.points.end, t);

        const b1 = a1.lerp(a2, t);
        const b2 = a2.lerp(a3, t);

        return b1.lerp(b2, t);
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
            // TODO: values below
            Vector3.zero(),
            0, // len ??
            0, // r ??
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
        scenery.addObject(new IsolationId(this.category, this.id, this.points.middle, this.id_isolation));
    }
}
