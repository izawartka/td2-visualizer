import Vector3 from "../model/vector3";
import Quaternion from "../model/quaternion";
import AngleHelper from "./angleHelper";

function calculateCurveEnd(startPos, startAngle, radius, curveLength) {
    if (radius === 0) {
        return {
            endPos: startPos.add(Vector3.fromAngleY(startAngle, curveLength)),
            endAngle: startAngle,
            circleCenter: null,
        };
    }
    const centerToStart = Vector3.fromAngleY(startAngle + Math.sign(radius) * Math.PI / 2, Math.abs(radius));
    const circleCenter = startPos.add(centerToStart.negate());
    const endAngle = startAngle -curveLength / radius;
    const centerToEnd = Vector3.fromAngleY(endAngle + Math.sign(radius) * Math.PI / 2, Math.abs(radius));
    const endPos = circleCenter.add(centerToEnd);
    return { endPos, endAngle, circleCenter };
}

/**
 * Does the same as calculateCurveEnd with `startPos = Vector3.zero()` and `startAngle = 0`.
 */
function calculateCurveEndStandard(radius, curveLength) {
    if (radius === 0) {
        return {
            endPos: new Vector3(0, 0, curveLength),
            endAngle: 0,
            circleCenter: null,
        };
    }
    const circleCenter = new Vector3(-radius, 0, 0);
    const endAngle = -curveLength / radius;
    const centerToEnd = Vector3.fromAngleY(endAngle + Math.sign(radius) * Math.PI / 2, Math.abs(radius));
    const endPos = circleCenter.add(centerToEnd);
    return { endPos, endAngle, circleCenter };
}

function calculateEndTangentVec(startPos, endPos, centerPos) {
    const centerToStart = startPos.sub(centerPos);
    const centerToEnd = endPos.sub(centerPos);
    const dot1 = centerToStart.dotProduct(centerToEnd);
    const dot2 = centerToEnd.dotProduct(centerToEnd);
    return centerToStart.sub(centerToEnd.multiply(dot1 / dot2));
}

function arcEndAngleXZ(startPoint, endPoint, circleCenter) {
    return Vector3.zero().atanY(calculateEndTangentVec(startPoint, endPoint, circleCenter));
}

function rotatedAngleXZ(rotationRad, angle) {
    return Vector3.zero().atanY(Vector3.fromAngleY(angle).rotate(rotationRad));
}

function curveLength(start, end, radius) {
    return Math.abs(2 * radius * Math.asin(start.distance(end) / (2 * radius)));
}

function bezierPointAtT(start, control1, control2, end, t) {
    const a1 = start.lerp(control1, t);
    const a2 = control1.lerp(control2, t);
    const a3 = control2.lerp(end, t);

    const b1 = a1.lerp(a2, t);
    const b2 = a2.lerp(a3, t);

    return b1.lerp(b2, t);
}

function transformStart(globalStart, globalRotationDeg, localStart, localRotationQuat) {
    const globalRotationRad = AngleHelper.rotationDegToRad(globalRotationDeg);
    const startPos = globalStart.add(localStart.rotate(globalRotationRad));
    const rotationQuat = Quaternion.fromEulerAnglesRad(globalRotationRad).multiply(localRotationQuat);
    const rotationRad = rotationQuat.toEulerAnglesRad();

    return {
        startPos,
        rotationQuat,
        rotationRad,
    };
}

const CurveHelper = {
    calculateCurveEnd,
    calculateCurveEndStandard,
    calculateEndTangentVec,
    arcEndAngleXZ,
    rotatedAngleXZ,
    curveLength,
    bezierPointAtT,
    transformStart,
};

export default CurveHelper;
