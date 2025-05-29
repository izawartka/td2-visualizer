export default class Track {
    id;
    x;
    y;
    z;
    rot;
    len;
    r;
    id_station;
    id_isolation;
    maxspeed;
    derailspeed;
    category = "tracks";
    type = "Track";
    outs = [];

    constructor(id, x, y, z, rot, len, r, previd, nextid, id_station, id_isolation, maxspeed, derailspeed) {
        Object.assign(this, {
            id,
            x, y, z,
            rot, len, r,
            id_station, id_isolation,
            maxspeed, derailspeed
        });

        this.outs = [previd, nextid];
    }

    getCloserEnd(x, y, z) {
        function pow2(val) {
            return val*val;
        }

        const dist1 = pow2(x-this.points.x1)+pow2(z-this.points.z1);
        const dist2 = pow2(x-this.points.x2)+pow2(z-this.points.z2);
        return (dist1 < dist2) ? [this.points.x1, y, this.points.z1] : [this.points.x2, y, this.points.z2];
    }

    getRenderBounds() {
        return [
            { x: this.x, z: this.z }
        ];
    }
}
