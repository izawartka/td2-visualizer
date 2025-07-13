import Shape from "./shape";

export default class ShapeBezier extends Shape {
    type = 'ShapeBezier';

    constructor(start, control1, control2, end) {
        const points = {
            start,
            end,
            control1,
            control2,
        };
        super(
            points,
            start.distance(end), // length, temporary TODO: Calculate actual length of bezier curve
            control1.atanY(start),
            control2.atanY(end),
        );
    }
}
