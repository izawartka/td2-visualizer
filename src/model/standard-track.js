import AngleHelper from "../helpers/angleHelper";
import Track from "./track";
import Vector3 from "./vector3";

export default class StandardTrack extends Track
{
    type = "StandardTrack";
    points = {
        start: Vector3.zero(),
        end: Vector3.zero(),
        circleCenter: Vector3.zero()
    };

    constructor(id, start, rot, len, r, nextid, previd, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed) {
        super(id, start, rot, len, r, nextid, previd, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed);
        this._calcPoints();
    }

    static fromText(text) {
        const values = text.split(";");
        const track = new StandardTrack(
            values[1], // id
            Vector3.fromValuesArray(values, 3), // start
            Vector3.fromValuesArray(values, 6), // rot
            parseFloat(values[9]), // len
            parseFloat(values[10]), // r
            values[11], // nextid
            values[12], // previd
            values[13], // id_station
            ...Track.slopesFromText(values[14]), // start_slope, end_slope
            values[17], // id_isolation
            values[19], // prefab_name
            parseFloat(values[20]) || 0, // maxspeed
            parseFloat(values[21]) || 0 // derailspeed
        );

        return track;
    }

    _calcPoints() {
        const rotRad = AngleHelper.degToRad(this.rot.y);

        this.points.start = this.pos.clone();
        this.points.end = this.pos.add(Vector3.fromAngleY(rotRad, this.len));
        this.points.circleCenter = this.pos.clone(); // default circle center

        if (this.r !== 0) {
            const centerAngle = rotRad + Math.PI / 2;
            this.points.circleCenter = this.pos.sub(Vector3.fromAngleY(centerAngle, this.r));
            const endAngle = centerAngle - this.len / this.r;
            this.points.end = this.points.circleCenter.add(Vector3.fromAngleY(endAngle, this.r));
        }
        
        // adjust end point by the slope
        if (this.end_slope !== 0) {
            const startHeightDiff = this.start_slope * this.len / 1000;
            const endHeightDiff = this.end_slope * this.len / 1000;

            this.points.end.y += startHeightDiff + (endHeightDiff - startHeightDiff) / 2;
        }
    }
}
