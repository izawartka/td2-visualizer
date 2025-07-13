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

function normalizeDegAngle(angle) {
    if (angle < 0) {
        return angle + 360 * Math.ceil(Math.abs(angle) / 360);
    } else if (angle >= 360) {
        return angle - 360 * Math.floor(angle / 360);
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
