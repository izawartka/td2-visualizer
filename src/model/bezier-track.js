import Track from "./track";
import Vector3 from "./vector3";

export default class BezierTrack extends Track
{
    type = "BezierTrack";
    points = {
        start: Vector3.zero(),
        control1: Vector3.zero(),
        end: Vector3.zero(),
        control2: Vector3.zero()
    };

    constructor(id, start, control1, end, control2, rot, len, r, nextid, previd, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed) {
        super(id, start, rot, len, r, nextid, previd, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed);

        Object.assign(this.points, {
            start,
            control1: start.add(control1),
            end,
            control2: end.add(control2)
        });
    }

    static fromText(text) {
        const values = text.split(";");
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
            values[15], // nextid
            values[16], // previd
            values[17], // id_station
            ...Track.slopesFromText(values[18]), // start_slope, end_slope
            values[21], // id_isolation
            values[23], // prefab_name
            parseFloat(values[24]), // maxspeed
            parseFloat(values[25]) // derailspeed
        );

        return track;
    }
}
