function degToRad(angle) {
    return angle * (Math.PI / 180);
}

function radToDeg(angle) {
    return angle * (180 / Math.PI);
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
    normalizeDegAngle,
}

export default AngleHelper;