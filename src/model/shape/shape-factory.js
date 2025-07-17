import ShapeBezier from "./shape-bezier";
import ShapeArc from "./shape-arc";
import ShapeStraight from "./shape-straight";

/**
 * Creates ShapeStraight if the radius is 0, and a ShapeArc otherwise.
 */
function fromArcDescription(rotRad, startPos, radius, length, startSlope, endSlope) {
    if (radius === 0) {
        return new ShapeStraight(
            startPos,
            rotRad,
            length,
            startSlope,
            endSlope,
        );
    }

    return new ShapeArc(startPos, rotRad, radius, length, startSlope, endSlope);
}

function fromBezierDescription(startPos, startToControl1, endPos, endToControl2, startSlope, endSlope) {
    return new ShapeBezier(
        startPos,
        startPos.add(startToControl1),
        endPos.add(endToControl2),
        endPos,
        startSlope,
        endSlope,
    );
}

const ShapeFactory = {
    fromArcDescription,
    fromBezierDescription,
};

export default ShapeFactory;
