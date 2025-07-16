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
}
