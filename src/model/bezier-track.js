import Track from "./track";

export default class BezierTrack extends Track
{
    type = "BezierTrack";
    points = {
        x1: 0, y1: 0, z1: 0, // start
        cx1: 0, cy1: 0, cz1: 0, // control 1
        cx2: 0, cy2: 0, cz2: 0, // control 2
        x2: 0, y2: 0, z2: 0 // end
    };

    constructor(id, x1, y1, z1, cx1, cy1, cz1, x2, y2, z2, cx2, cy2, cz2, rx, ry, rz, len, r, previd, nextid, id_station, id_isolation, maxspeed, derailspeed) {
        super(id, x1, y1, z1, rx, ry, rz, len, r, previd, nextid, id_station, id_isolation, maxspeed, derailspeed);

        Object.assign(this.points, {
            x1, y1, z1, // start
            cx1, cy1, cz1, // control 1
            cx2, cy2, cz2, // control 2
            x2, y2, z2 // end
        });
    }

    static fromText(text) {
        const values = text.split(";");
        const track = new BezierTrack(
            values[1], // id
            parseFloat(values[3]), // x1
            parseFloat(values[4]), // y1
            parseFloat(values[5]), // z1
            parseFloat(values[6]), // cx1
            parseFloat(values[7]), // cy1
            parseFloat(values[8]), // cz1
            parseFloat(values[9]), // x2
            parseFloat(values[10]), // y2
            parseFloat(values[11]), // z2
            parseFloat(values[12]), // cx2
            parseFloat(values[13]), // cy2
            parseFloat(values[14]), // cz2
            // TODO: values below
            0, // rx ??
            0, // ry ??
            0, // rz ??
            0, // len ??
            0, // r ??
            values[15], // previd
            values[16], // nextid
            values[17], // id_station
            values[21], // id_isolation
            parseFloat(values[24]), // maxspeed
            parseFloat(values[25]) // derailspeed
        );

        return track;
    }

    getRenderBounds() {
        return [
            { x: this.points.x1, z: this.points.z1 }, // start
            { x: this.points.x2, z: this.points.z2 }, // end
            { x: this.points.cx1, z: this.points.cz1 }, // control 1
            { x: this.points.cx2, z: this.points.cz2 }  // control 2
        ];
    }
}
