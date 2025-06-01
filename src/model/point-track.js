import AngleHelper from '../helpers/angleHelper';
import Track from './track';
import Vector3 from './vector3';

export default class PointTrack extends Track
{
    type = "PointTrack";
    points = {
        start: Vector3.zero(),
        end: Vector3.zero()
    };

    constructor(id, start, end, r, previd, nextid, id_station, id_isolation, maxspeed, derailspeed) {
        const ry = AngleHelper.radToDeg(start.atanY(end));
        const rot = new Vector3(0, ry, 0);
        // TODO: fix rx and rz = 0
        // TODO: calculate length
        super(id, start, rot, null, r, previd, nextid, id_station, id_isolation, maxspeed, derailspeed);

        Object.assign(this.points, {
            start, end
        });
    }
}
