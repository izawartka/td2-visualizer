import ShapeBezier from "./shape-bezier";
import ShapeArc from "./shape-arc";
import Vector3 from "../vector3";
import CurveHelper from "../../helpers/curveHelper";
import ShapeStraight from "./shape-straight";
import AngleHelper from "../../helpers/angleHelper";

function fromArcDescription(rotDeg, startPos, radius, length, startSlope, endSlope) {
    const rotRad = AngleHelper.rotationDegToRad(rotDeg);

    // TODO: Verify how slope changes work with rotations
    // adjust end point by the slope
    let yChange = 0;
    if (endSlope !== 0) {
        const startHeightDiff = startSlope * length / 1000;
        const endHeightDiff = endSlope * length / 1000;
        yChange = startHeightDiff + (endHeightDiff - startHeightDiff) / 2;
    }

    if (radius === 0) {
        const endPos = startPos.add(new Vector3(0, yChange, length).rotate(rotRad));
        return new ShapeStraight(
            startPos,
            endPos,
            length,
            rotRad.y,
        );
    }

    let { circleCenter, endPos } = CurveHelper.calculateCurveEnd(Vector3.zero(), 0, radius, length);
    circleCenter = startPos.add(circleCenter.rotate(rotRad));
    endPos.y += yChange;
    endPos = startPos.add(endPos.rotate(rotRad));
    return new ShapeArc(startPos, endPos, circleCenter, radius, length);
}

function fromBezierDescription(startPos, startToControl1, endPos, endToControl2) {
    return new ShapeBezier(
        startPos,
        startPos.add(startToControl1),
        endPos.add(endToControl2),
        endPos,
    );
}

function straightRaw(startPos, endPos, length, angleXZ) {
    return new ShapeStraight(startPos, endPos, length, angleXZ);
}

function arcRaw(startPos, endPos, circleCenter, radius, length) {
    return new ShapeArc(startPos, endPos, circleCenter, radius, length);
}

const ShapeFactory = {
    fromArcDescription,
    fromBezierDescription,
    straightRaw,
    arcRaw,
};

export default ShapeFactory;
