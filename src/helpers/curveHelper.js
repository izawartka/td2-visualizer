import Vector3 from "../model/vector3";
import AngleHelper from "./angleHelper";
import Quaternion from "../model/quaternion";

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

function transformStart(globalStart, globalRotationDeg, localStart, localRotationQuat) {
    const globalRotationRad = AngleHelper.rotationDegToRad(globalRotationDeg);
    const startPos = globalStart.add(localStart.rotate(globalRotationRad));
    const rotationQuat = Quaternion.fromEulerAnglesRad(globalRotationRad).multiply(localRotationQuat);
    const rotationRad = rotationQuat.toEulerAnglesRad();
    const rotationDeg = AngleHelper.rotationRadToDeg(rotationRad);

    return {
        startPos,
        rotationQuat,
        rotationDeg,
    };
}

const CurveHelper = {
    calculateCurveEnd,
    calculateCurveEndStandard,
    transformStart,
};

export default CurveHelper;
