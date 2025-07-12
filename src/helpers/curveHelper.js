import Vector3 from "../model/vector3";

function calculateCurveEnd(startPos, startAngle, radius, curveLength) {
    if (curveLength === 0) {
        return { endPos: startPos, endAngle: startAngle };
    }
    if (radius === 0) {
        return { endPos: startPos.add(Vector3.fromAngleY(startAngle, curveLength)), endAngle: startAngle };
    }
    const centerToStart = Vector3.fromAngleY(startAngle + Math.sign(radius) * Math.PI / 2, Math.abs(radius));
    const circleCenter = startPos.add(centerToStart.negate());
    const endAngle = startAngle -curveLength / radius;
    const centerToEnd = Vector3.fromAngleY(endAngle + Math.sign(radius) * Math.PI / 2, Math.abs(radius));
    const endPos = circleCenter.add(centerToEnd);
    return { endPos, endAngle };
}

const CurveHelper = {
    calculateCurveEnd,
};

export default CurveHelper;
