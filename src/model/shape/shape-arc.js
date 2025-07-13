import Shape from "./shape";

export default class ShapeArc extends Shape {
    type = 'ShapeArc';
    radius;

    constructor(start, end, circleCenter, radius, length, startAngleXZ, endAngleXZ) {
        if (radius === 0) {
            console.error('ShapeArc created with radius 0');
        }
        const points = {
            start,
            end,
            circleCenter,
        };
        super(
            points,
            length,
            startAngleXZ,
            endAngleXZ,
        );
        Object.assign(this, {
            radius,
        });
    }
}
