import Track from './track';

export default class PointTrack extends Track
{
    type = "PointTrack";
    points = {
        x1: 0, y1: 0, z1: 0, // start
        x2: 0, y2: 0, z2: 0 // end
    };

    constructor(id, x1, y1, z1, x2, y2, z2, r, previd, nextid, id_station, id_isolation, maxspeed, derailspeed) {
        const ry = Math.atan2(x2-x1, z2-z1);
        // TODO: calculate length
        // TODO: fix rx and rz = 0
        super(id, x1, y1, z1, 0, ry, 0, null, r, previd, nextid, id_station, id_isolation, maxspeed, derailspeed);

        Object.assign(this.points, {
            x1, y1, z1,
            x2, y2, z2
        });

        this.type="PointTrack";
    }

    getRenderBounds() {
        return [
            { x: this.points.x1, z: this.points.z1 }, // start
            { x: this.points.x2, z: this.points.z2 }  // end
        ];
    }
}
