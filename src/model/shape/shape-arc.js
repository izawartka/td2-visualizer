import Shape from "./shape";
import CurveHelper from "../../helpers/curveHelper";
import Vector3 from "../vector3";

export default class ShapeArc extends Shape {
    type = 'ShapeArc';
    radius;
    rotRad;

    constructor(startPos, rotRad, radius, length, startSlope, endSlope) {
        if (radius === 0) {
            console.error('ShapeArc created with radius 0');
        }

        const points = {
            start: startPos,
            end: undefined,
            middle: undefined,
        };

        const startAngleXZ = rotRad.y;
        // Assumes the arc is flat on the XZ plane
        const endAngleXZ = rotRad.y - length / radius;

        super(
            points,
            length,
            startAngleXZ,
            endAngleXZ,
            startSlope,
            endSlope,
        );
        Object.assign(this, {
            radius,
            rotRad,
        });

        this.points.middle = this._pointAtDist(length/2);
        this.points.end = this._pointAtDist(length);
    }

    _pointAtDist(dist) {
        const curveEnd = CurveHelper.calculateCurveEnd(Vector3.zero(), 0, this.radius, dist).endPos;
        // const curveEnd = CurveHelper.calculateCurveEndStandard(this.radius, dist).endPos;
        // TODO: Verify slope logic
        curveEnd.y += (this.startSlope + this.endSlope) / 2000 * dist;
        return this._transformPoint(curveEnd);
    }

    _transformPoint(point) {
        return point.rotate(this.rotRad).add(this.points.start);
    }
}
