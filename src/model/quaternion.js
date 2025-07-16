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

    /**
     * If this quaternion is a rotation that rotates the vector [0, 0, 1] to the vector [x, y, z],
     * then this method returns a rotation that rotates the vector [0, 0, 1] to the vector [-x, y, z].
     */
    mirroredX() {
        const v = new Vector3(0, 0, 1).rotateByQuaternion(this);
        let adjustment;
        if (Math.abs(v.x) > 1 - 1e-7) {
            // in this case, denom would be almost 0
            adjustment = new Quaternion(0, 1, 0, 0);
        } else {
            const denom = Math.sqrt(1 - v.x*v.x)
            adjustment = new Quaternion(0, -v.x * v.z / denom, v.x * v.y / denom, denom)
        }
        return adjustment.multiply(this);
    }

    static fromVec(vec) {
        return new Quaternion(vec.x, vec.y, vec.z, 0);
    }

    static identity() {
        return new Quaternion(0, 0, 0, 1);
    }
}
