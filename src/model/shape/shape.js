import {TrackConnectionEnd} from "../track-connection";

export default class Shape {
    points;
    length;
    startAngleXZ;
    endAngleXZ;

    constructor(points, length, startAngleXZ, endAngleXZ) {
        Object.assign(this, {
            points,
            length,
            startAngleXZ,
            endAngleXZ,
        });
    }


    getEndPos(end) {
        if (end === TrackConnectionEnd.START) return this.points.start;
        return this.points.end;
    }

    getEndAngleXZ(end) {
        if (end === TrackConnectionEnd.START) return this.startAngleXZ;
        return this.endAngleXZ;
    }

    getRenderBounds() {
        return Object.values(this.points);
    }
}
