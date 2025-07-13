import Shape from "./shape";

export default class ShapeStraight extends Shape {
    type = 'ShapeStraight';

    constructor(start, end, length, angleXZ) {
        const points = {
            start,
            end,
        };
        super(
            points,
            length,
            angleXZ + Math.PI,
            angleXZ,
        );
    }
}
