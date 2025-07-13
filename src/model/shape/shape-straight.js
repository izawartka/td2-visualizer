import Shape from "./shape";

export default class ShapeStraight extends Shape {
    type = 'ShapeStraight';

    constructor(start, end, length, angleXZ) {
        const points = {
            start,
            end,
            middle: start.lerp(end, 0.5),
        };
        super(
            points,
            length,
            angleXZ + Math.PI,
            angleXZ,
        );
    }
}
