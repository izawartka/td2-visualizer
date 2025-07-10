import AngleHelper from '../../helpers/angleHelper';
import Track from './track';
import Vector3 from '../vector3';

export default class PointTrack extends Track
{
    type = "PointTrack";
    points = {
        start: Vector3.zero(),
        end: Vector3.zero()
    };

    constructor(id, start, end, r, nextid, previd, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed) {
        const [rot, len] = PointTrack._getRotLen(start, end, r);
        super(id, start, rot, len, r, nextid, previd, id_station, start_slope, end_slope, id_isolation, prefab_name, maxspeed, derailspeed);

        Object.assign(this.points, {
            start, end
        });
    }

    getStartAngleXZ() {
        return AngleHelper.degToRad(this.rot.y);
    }

    getEndAngleXZ() {
        const startAngle = AngleHelper.degToRad(this.rot.y);

        if(this.r === 0) {
            return startAngle;
        }

        return startAngle - this.len / this.r;
    }

    static _getRotLen(start, end, r) {
        // TODO: include track slope in calculations
        const pointsAngle = start.atanY(end);

        if(r === 0) {
            const rot = new Vector3(0, AngleHelper.radToDeg(pointsAngle), 0);
            const len = start.distance(end);

            return [rot, len];
        }

        const len = Math.abs(2 * r * Math.asin(start.distance(end) / (2 * r)));
        const ry = pointsAngle + len / (r * 2);

        const rot = new Vector3(0, AngleHelper.radToDeg(ry), 0);
        return [rot, len];
    }
}
