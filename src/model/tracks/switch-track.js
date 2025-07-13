import Track from './track';
import Vector3 from '../vector3';

export default class SwitchTrack extends Track {
    type = "SwitchTrack";

    constructor(id, shape, connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed) {
        super(
            id,
            Vector3.zero(), // ignore rotation for switch tracks
            shape,
            connections, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed);
    }

    // getStartAngleXZ() {
    //     if (this.r === 0) return this.points.start.atanY(this.points.end);
    //     return Vector3.zero().atanY(CurveHelper.calculateEndTangentVec(this.points.end, this.points.start, this.points.circleCenter));
    // }
    //
    // getEndAngleXZ() {
    //     if (this.r === 0) return this.points.end.atanY(this.points.start);
    //     return Vector3.zero().atanY(CurveHelper.calculateEndTangentVec(this.points.start, this.points.end, this.points.circleCenter));
    // }

    // static _getLen(start, end, r) {
    //     if (r === 0) return start.distance(end);
    //     return Math.abs(2 * r * Math.asin(start.distance(end) / (2 * r)));
    // }
}
