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
        const { x: rotX, y: rotY, z: rotZ } = vector;

        const cz = Math.cos(rotZ * 0.5);
        const sz = Math.sin(rotZ * 0.5);
        const cx = Math.cos(rotX * 0.5);
        const sx = Math.sin(rotX * 0.5);
        const cy = Math.cos(rotY * 0.5);
        const sy = Math.sin(rotY * 0.5);
      
        const w = cx * cy * cz + sx * sy * sz;
        const x = sx * cy * cz + cx * sy * sz;
        const y = cx * sy * cz - sx * cy * sz;
        const z = cx * cy * sz - sx * sy * cz;
      
        return new Quaternion(w, x, y, z);
    }

    rotateVector(v) {
        const vecQuat = new Quaternion(0, v.x, v.y, v.z);
        const resultQuat = this.multiply(vecQuat).multiply(this.conjugate());
        return new Vector3(resultQuat.x, resultQuat.y, resultQuat.z);
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
        const w = this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z;
        const x = this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y;
        const y = this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x;
        const z = this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w;

        return new Quaternion(w, x, y, z);
    }
};