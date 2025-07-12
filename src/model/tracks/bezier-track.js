import Track from "./track";
import Vector3 from "../vector3";
import TrackConnection, {TrackConnectionEnd} from "../track-connection";

export default class BezierTrack extends Track
{
    type = "BezierTrack";
    points = {
        start: Vector3.zero(),
        control1: Vector3.zero(),
        end: Vector3.zero(),
        control2: Vector3.zero()
    };

    constructor(id, start, control1, end, control2, rot, len, r, connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed) {
        super(id, start, rot, len, r, connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed);

        Object.assign(this.points, {
            start,
            control1: start.add(control1),
            end,
            control2: end.add(control2)
        });
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
}
