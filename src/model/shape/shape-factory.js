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

    const startAngle = CurveHelper.arcEndAngleXZ(endPos, startPos, circleCenter);
    const endAngle = CurveHelper.arcEndAngleXZ(startPos, endPos, circleCenter);

    return new ShapeArc(startPos, endPos, circleCenter, radius, length, startAngle, endAngle);
}

function fromBezierDescription(startPos, startToControl1, endPos, endToControl2) {
    return new ShapeBezier(
        startPos,
        startPos.add(startToControl1),
        endPos.add(endToControl2),
        endPos,
    );
}

function arcRaw(startPos, endPos, circleCenter, radius, length, startAngleXZ, endAngleXZ) {
    return new ShapeArc(startPos, endPos, circleCenter, radius, length, startAngleXZ, endAngleXZ);
}

function straightRaw(startPos, endPos, length, angleXZ) {
    return new ShapeStraight(startPos, endPos, length, angleXZ);
}

function rotatedArc(rotationDeg, rotationCenter, startAngle, startPos, endAngle, endPos, circleCenter, radius, length) {
    const rotationRad = AngleHelper.rotationDegToRad(rotationDeg);
    return new ShapeArc(
        startPos.rotate(rotationRad).add(rotationCenter),
        endPos.rotate(rotationRad).add(rotationCenter),
        circleCenter.rotate(rotationRad).add(rotationCenter),
        radius,
        length,
        CurveHelper.rotatedAngleXZ(rotationRad, startAngle) + Math.PI,
        CurveHelper.rotatedAngleXZ(rotationRad, endAngle),
    );
}

function rotatedStraight(rotationDeg, rotationCenter, startPos, endPos, angle) {
    const rotationRad = AngleHelper.rotationDegToRad(rotationDeg);
    return straightRaw(
        startPos.rotate(rotationRad).add(rotationCenter),
        endPos.rotate(rotationRad).add(rotationCenter),
        startPos.distance(endPos),
        CurveHelper.rotatedAngleXZ(rotationRad, rotationCenter, angle),
    );
}

const ShapeFactory = {
    fromArcDescription,
    fromBezierDescription,
    arcRaw,
    straightRaw,
    rotatedArc,
    rotatedStraight,
};

export default ShapeFactory;
