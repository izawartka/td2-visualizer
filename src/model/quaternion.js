import Vector3 from "./vector3";

export default class Quaternion {
    x;
    y;
    z;
    w;

    constructor(x = 0, y = 0, z = 0, w = 0) {
        Object.assign(this, { x, y, z, w });
    }

    conjugate() {
        return new Quaternion(-this.x, -this.y, -this.z, this.w);
    }

    multiply(other) {
        return new Quaternion(
            this.w * other.x + this.x * other.w + this.y * other.z - this.z * other.y,
            this.w * other.y - this.x * other.z + this.y * other.w + this.z * other.x,
            this.w * other.z + this.x * other.y - this.y * other.x + this.z * other.w,
            this.w * other.w - this.x * other.x - this.y * other.y - this.z * other.z,
        );
    }

    static fromVec(vec) {
        return new Quaternion(vec.x, vec.y, vec.z, 0);
    }

    /**
     * Convert a Unity rotation vector (extrinsic z-x-y) in radians to a quaternion.
     */
    static fromEulerAnglesRad(vec) {
        const cosX = Math.cos(vec.x/2);
        const sinX = Math.sin(vec.x/2);
        const cosY = Math.cos(vec.y/2);
        const sinY = Math.sin(vec.y/2);
        const cosZ = Math.cos(vec.z/2);
        const sinZ = Math.sin(vec.z/2);

        return new Quaternion(
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
}
