import Shape from "./shape";
import Vector3 from "../vector3";
import CurveHelper from "../../helpers/curveHelper";

export default class ShapeArc extends Shape {
    type = 'ShapeArc';
    radius;

    constructor(start, end, circleCenter, radius, length) {
        const points = {
            start,
            end,
            circleCenter,
        };
        super(
            points,
            length,
            ShapeArc._getEndAngle(end, start, circleCenter),
            ShapeArc._getEndAngle(start, end, circleCenter),
        );
        Object.assign(this, {
            radius,
        });
    }

    static _getEndAngle(startPoint, endPoint, circleCenter) {
        return Vector3.zero().atanY(CurveHelper.calculateEndTangentVec(startPoint, endPoint, circleCenter));
    }
}
