import Shape from "./shape";
import CurveHelper from "../../helpers/curveHelper";

export default class ShapeBezier extends Shape {
    type = 'ShapeBezier';

    constructor(start, control1, control2, end) {
        const points = {
            start,
            end,
            control1,
            control2,
            // This is not the actual middle point, but it's close enough
            middle: CurveHelper.bezierPointAtT(start, control1, control2, end, 0.5),
        };
        super(
            points,
            start.distance(end), // length, temporary TODO: Calculate actual length of bezier curve
            control1.atanY(start),
            control2.atanY(end),
        );
    }
}
