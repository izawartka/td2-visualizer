import Shape from "./shape";
import Vector3 from "../vector3";

export default class ShapeStraight extends Shape {
    type = 'ShapeStraight';
    rotRad;

    constructor(startPos, rotRad, length, startSlope, endSlope) {
        const points = {
            start: startPos,
            end: undefined,
            middle: undefined,
        };

        const startAngleXZ = rotRad.y;
        const endAngleXZ = rotRad.y;
        super(
            points,
            length,
            startAngleXZ,
            endAngleXZ,
            startSlope,
            endSlope,
        );
        Object.assign(this, {
            rotRad,
        });

        this.points.middle = this._pointAtDist(length/2);
        this.points.end = this._pointAtDist(length);
    }

    _pointAtDist(dist) {
        // TODO: Verify slope logic
        const yChange = (this.startSlope + this.endSlope) / 2000 * dist;
        return this._transformPoint(new Vector3(0, yChange, dist));
    }

    _transformPoint(point) {
        return point.rotate(this.rotRad).add(this.points.start);
    }
}
