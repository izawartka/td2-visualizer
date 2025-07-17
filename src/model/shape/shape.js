import {TrackConnectionEnd} from "../track-connection";

export default class Shape {
    points;
    length;
    startAngleXZ;
    endAngleXZ;
    startSlope;
    endSlope;

    constructor(points, length, startAngleXZ, endAngleXZ, startSlope, endSlope) {
        Object.assign(this, {
            points,
            length,
            startAngleXZ,
            endAngleXZ,
            startSlope,
            endSlope,
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
