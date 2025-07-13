import AngleHelper from "../../helpers/angleHelper";
import Track from "./track";
import Vector3 from "../vector3";
import TrackConnection, {TrackConnectionEnd} from "../track-connection";

export default class StandardTrack extends Track
{
    type = "StandardTrack";
    points = {
        start: Vector3.zero(),
        end: Vector3.zero(),
        circleCenter: Vector3.zero(),
        middle: Vector3.zero(),
    };

    constructor(id, start, rot, len, r, connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed) {
        super(id, start, rot, len, r, connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed);
        this._calcPoints();
    }

    getStartAngleXZ() {
        return AngleHelper.degToRad(this.rot.y);
    }

    getEndAngleXZ() {
        const startAngle = AngleHelper.degToRad(this.rot.y);

        if(this.r === 0) {
            return startAngle
        }

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
            parseFloat(values[21]) || 0 // derailspeed
        );

        return track;
    }

    _calcPoints() {
        const rotRad = AngleHelper.degToRad(this.rot.y);

        this.points.start = this.pos.clone();

        if (this.r === 0) {
            this.points.end = this.pos.add(Vector3.fromAngleY(rotRad, this.len));
            this.points.middle = this.points.start.lerp(this.points.end, 0.5);
            this.points.circleCenter = this.pos.clone(); // default circle center
        } else {
            const centerAngle = rotRad + Math.PI / 2;
            this.points.circleCenter = this.pos.sub(Vector3.fromAngleY(centerAngle, this.r));

            const middleAngle = centerAngle - (this.len / this.r) / 2;
            this.points.middle = this.points.circleCenter.add(Vector3.fromAngleY(middleAngle, this.r));

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

    applyObject(scenery) {
        super.applyObject(scenery);
    }
}
