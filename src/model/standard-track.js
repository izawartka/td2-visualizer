import Track from "./track";

export default class StandardTrack extends Track
{
    type = "StandardTrack";
    points = {
        x1: 0, z1: 0, // start
        x2: 0, z2: 0, // end
        cx: 0, cz: 0 // circle center
    };

    constructor(id, x, y, z, rx, ry, rz, len, r, previd, nextid, id_station, id_isolation, maxspeed, derailspeed) {
        super(id, x, y, z, rx, ry, rz, len, r, previd, nextid, id_station, id_isolation, maxspeed, derailspeed);
        this._calcPoints();
    }

    static fromText(text) {
        const values = text.split(";");
        const track = new StandardTrack(
            values[1], // id
            parseFloat(values[3]), // x
            parseFloat(values[4]), // y
            parseFloat(values[5]), // z
            parseFloat(values[6]), // rx
            parseFloat(values[7]), // ry
            parseFloat(values[8]), // rz
            parseFloat(values[9]), // len
            parseFloat(values[10]), // r
            values[11], // previd
            values[12], // nextid
            values[13], // id_station
            values[17], // id_isolation
            parseFloat(values[20]), // maxspeed
            parseFloat(values[21]) // derailspeed
        );

        return track;
    }

    _calcPoints() {
        const rotRad = this.ry * Math.PI / 180;

        this.points = {
            x1: this.x, // start
            z1: this.z,
            x2: this.x + this.len * Math.sin(rotRad), // end
            z2: this.z + this.len * Math.cos(rotRad),
            cx: this.x, // circle center (default)
            cz: this.z // circle center (default)
        };

        if (this.r !== 0) {
            let trp2 = rotRad + Math.PI / 2;
            this.points.cx = this.x - this.r * Math.sin(trp2); // circle center
            this.points.cz = this.z - this.r * Math.cos(trp2);
            this.points.x2 = this.points.cx + this.r * Math.sin(trp2 - this.len / this.r); // end (modify)
            this.points.z2 = this.points.cz + this.r * Math.cos(trp2 - this.len / this.r);
        }
    }

    gerRenderBounds() {
        return [
            { x: this.points.x1, z: this.points.z1 }, // start
            { x: this.points.x2, z: this.points.z2 }, // end
        ];
    }
}
