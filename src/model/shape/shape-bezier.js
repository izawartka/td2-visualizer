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
            control1.atanY(start),
            control2.atanY(end),
        );
    }
}
