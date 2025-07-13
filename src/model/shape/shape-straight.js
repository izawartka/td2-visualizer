import Shape from "./shape";

export default class ShapeStraight extends Shape {
    type = 'ShapeStraight';

    constructor(start, end, angleXZ) {
        const points = {
            start,
            end,
        };
        super(
            points,
            angleXZ + Math.PI,
            angleXZ,
        );
    }
}
