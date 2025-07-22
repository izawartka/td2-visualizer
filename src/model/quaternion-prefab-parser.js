import Vector3 from "./vector3";
import AngleHelper from "../helpers/angleHelper";

export default class QuaternionPrefabParser {
    x;
    y;
    z;
    w;

    constructor(x = 0, y = 0, z = 0, w = 0) {
        Object.assign(this, { x, y, z, w });
    }

    rotateVector(vector) {
        const resultQuat = this
            .multiply(QuaternionPrefabParser.fromVec(vector))
            .multiply(this.conjugate());
        return new Vector3(resultQuat.x, resultQuat.y, resultQuat.z);
    }

    conjugate() {
        return new QuaternionPrefabParser(-this.x, -this.y, -this.z, this.w);
    }

    normalize() {
        const length = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
        if (length === 0) return QuaternionPrefabParser.identity();
        return new QuaternionPrefabParser(this.x / length, this.y / length, this.z / length, this.w / length);
    }

    multiply(other) {
        return new QuaternionPrefabParser(
            this.w * other.x + this.x * other.w + this.y * other.z - this.z * other.y,
            this.w * other.y - this.x * other.z + this.y * other.w + this.z * other.x,
            this.w * other.z + this.x * other.y - this.y * other.x + this.z * other.w,
            this.w * other.w - this.x * other.x - this.y * other.y - this.z * other.z,
        );
    }

    multiplyScalar(scalar) {
        return new QuaternionPrefabParser(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar,
            this.w * scalar,
        );
    }

    getMiscYawData() {
        const forward = new Vector3(0, 0, -1);
        const rotatedForward = this.rotateVector(forward);

        const up = new Vector3(0, 1, 0);
        const rotatedUp = this.rotateVector(up);

        return {
            yaw: AngleHelper.radToDeg(Math.atan2(rotatedForward.x, rotatedForward.z)),
            tilt: rotatedUp.x * rotatedUp.x + rotatedUp.z * rotatedUp.z
        }
    }

    static fromVec(vec) {
        return new QuaternionPrefabParser(vec.x, vec.y, vec.z, 0);
    }

    /**
     * Convert a Unity rotation vector (extrinsic z-x-y) in radians to a quaternion.
     */
    static fromEulerAnglesRad(vector) {
        const halfZ = vector.z * 0.5;
        const halfX = vector.x * 0.5;
        const halfY = vector.y * 0.5;

        const cosZ = Math.cos(halfZ);
        const sinZ = Math.sin(halfZ);
        const cosX = Math.cos(halfX);
        const sinX = Math.sin(halfX);
        const cosY = Math.cos(halfY);
        const sinY = Math.sin(halfY);

        return new QuaternionPrefabParser(
            cosY * sinX * cosZ + sinY * cosX * sinZ,
            sinY * cosX * cosZ - cosY * sinX * sinZ,
            cosY * cosX * sinZ - sinY * sinX * cosZ,
            cosY * cosX * cosZ + sinY * sinX * sinZ,
        );
    }

    toEulerAnglesRad() {
        const sinX = Math.min(Math.max(-1, 2 * (this.w * this.x - this.y * this.z)), 1);
        const xRad = Math.asin(sinX);
        const yRad = Math.atan2(
            2 * (this.x * this.z + this.w * this.y),
            1 - 2 * (this.x * this.x + this.y * this.y)
        );

        if (Math.abs(sinX) > 1 - 1e-6) {
            return new Vector3(xRad, yRad, 0);
        }

        const zRad = Math.atan2(
            2 * (this.x * this.y + this.w * this.z),
            1 - 2 * (this.x * this.x + this.z * this.z)
        );
        return new Vector3(xRad, yRad, zRad);
    }

    static identity() {
        return new QuaternionPrefabParser(0, 0, 0, 1);
    }
}
