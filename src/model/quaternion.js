import Vector3 from "./vector3";

export default class Quaternion {
    w;
    x;
    y;
    z;

    constructor(w, x, y, z) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static fromEulerAngles(vector) {
        const halfZ = vector.z * 0.5;
        const halfX = vector.x * 0.5;
        const halfY = vector.y * 0.5;

        const sz = Math.sin(halfZ);
        const cz = Math.cos(halfZ);
        const sx = Math.sin(halfX);
        const cx = Math.cos(halfX);
        const sy = Math.sin(halfY);
        const cy = Math.cos(halfY);

        return new Quaternion(
            sx * sy * sz + cx * cy * cz,
            sx * cy * cz + cx * sy * sz,
            cx * sy * cz - sx * cy * sz,
            cx * cy * sz - sx * sy * cz
        )
    }

    toEulerAngles() {
        const sinr_cosp = 2 * (this.w * this.x + this.y * this.z);
        const cosr_cosp = 1 - 2 * (this.x * this.x + this.y * this.y);
        const roll = Math.atan2(sinr_cosp, cosr_cosp);

        const sinp = 2 * (this.w * this.y - this.z * this.x);
        let pitch;
        if (Math.abs(sinp) >= 1) {
            pitch = Math.sign(sinp) * Math.PI / 2; // use 90 degrees if out of range
        } else {
            pitch = -Math.asin(sinp);
        }

        const siny_cosp = 2 * (this.w * this.z + this.x * this.y);
        const cosy_cosp = 1 - 2 * (this.y * this.y + this.z * this.z);
        const yaw = Math.atan2(siny_cosp, cosy_cosp);

        return new Vector3(roll, pitch, yaw);
    }

    rotateVector(v) {
        const qv = new Quaternion(0, v.x, v.y, v.z);
        const conjugate = this.conjugate();
        const rotated = this.multiply(qv).multiply(conjugate);
        return new Vector3(rotated.x, rotated.y, rotated.z);
    }

    conjugate() {
        return new Quaternion(this.w, -this.x, -this.y, -this.z);
    }

    normalize() {
        const length = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
        if (length === 0) return new Quaternion(1, 0, 0, 0); // return identity quaternion if length is zero
        return new Quaternion(this.w / length, this.x / length, this.y / length, this.z / length);
    }

    multiply(q) {
        return new Quaternion(
            this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z,
            this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y,
            this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x,
            this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w
        );
    }

    multiplyScalar(scalar) {
        return new Quaternion(
            this.w * scalar,
            this.x * scalar,
            this.y * scalar,
            this.z * scalar
        );
    }

    getMiscYawData() {
        const forward = new Vector3(0, 0, -1);
        const rotatedForward = this.rotateVector(forward);

        const up = new Vector3(0, 1, 0);
        const rotatedUp = this.rotateVector(up);

        return {
            yaw: Math.atan2(rotatedForward.x, rotatedForward.z) * 180 / Math.PI,
            tilt: rotatedUp.x * rotatedUp.x + rotatedUp.z * rotatedUp.z
        }
    }
};