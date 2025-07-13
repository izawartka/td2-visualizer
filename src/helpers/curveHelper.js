import Vector3 from "../model/vector3";

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

const CurveHelper = {
    calculateCurveEnd,
    calculateEndTangentVec,
    arcEndAngleXZ,
    rotatedAngleXZ,
};

export default CurveHelper;
