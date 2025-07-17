import Vector3 from "../model/vector3";

function degToRad(angle) {
    return angle * (Math.PI / 180);
}

function radToDeg(angle) {
    return angle * (180 / Math.PI);
}

function rotationDegToRad(vector) {
    return new Vector3(
        degToRad(vector.x),
        degToRad(vector.y),
        degToRad(vector.z),
    );
}

function rotationRadToDeg(vector) {
    return new Vector3(
        radToDeg(vector.x),
        radToDeg(vector.y),
        radToDeg(vector.z),
    );
}

function normalizeDegAngle(angle, max = 360) {
    if (angle < 0) {
        return angle + max * Math.ceil(Math.abs(angle) / max);
    } else if (angle >= max) {
        return angle - max * Math.floor(angle / max);
    } else {
        return angle;
    }
}

const AngleHelper = {
    degToRad,
    radToDeg,
    rotationDegToRad,
    rotationRadToDeg,
    normalizeDegAngle,
}

export default AngleHelper;
