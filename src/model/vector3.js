export default class Vector3 {
    x;
    y;
    z;

    constructor(x = 0, y = 0, z = 0) {
        Object.assign(this, { x, y, z });
    }

    static fromText(text) {
        const values = text.split(";");
        return new Vector3(
            parseFloat(values[0]), // x
            parseFloat(values[1]), // y
            parseFloat(values[2])  // z
        );
    }

    static fromValuesArray(values, startIndex = 0) {
        return new Vector3(
            parseFloat(values[startIndex]),     // x
            parseFloat(values[startIndex + 1]), // y
            parseFloat(values[startIndex + 2])  // z
        );
    }

    static zero() {
        return new Vector3(0, 0, 0);
    }

    static fromAngleY(angleRad, length = 1) {
        return new Vector3(
            Math.sin(angleRad) * length,
            0,
            Math.cos(angleRad) * length
        );
    }

    rotate(rot) {
        const [ax, ay, az] = rot.toArray();

        const cosX = Math.cos(ax);
        const sinX = Math.sin(ax);
        const cosY = Math.cos(ay);
        const sinY = Math.sin(ay);
        const cosZ = Math.cos(az);
        const sinZ = Math.sin(az);

        // Rotate around Y
        let x = this.x * cosY + this.z * sinY;
        let z = -this.x * sinY + this.z * cosY;

        // Rotate around X
        let y = this.y * cosX - z * sinX;
        z = this.y * sinX + z * cosX;

        // Rotate around Z
        x = x * cosZ - y * sinZ;
        y = x * sinZ + y * cosZ;

        return new Vector3(x, y, z);
    }

    toPrecision(precision = 3) {
        return new Vector3(
            parseFloat(this.x.toFixed(precision)),
            parseFloat(this.y.toFixed(precision)),
            parseFloat(this.z.toFixed(precision))
        );
    }

    multiply(scalar) {
        return new Vector3(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar
        );
    }

    divide(scalar) {
        return new Vector3(
            this.x / scalar,
            this.y / scalar,
            this.z / scalar
        );
    }

    lerp(other, t) {
        return new Vector3(
            this.x + (other.x - this.x) * t,
            this.y + (other.y - this.y) * t,
            this.z + (other.z - this.z) * t
        );
    }

    atanY(other) {
        const dx = other.x - this.x;
        const dz = other.z - this.z;
        return Math.atan2(dx, dz);
    }

    add(other) {
        return new Vector3(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z
        );
    }

    sub(other) {
        return new Vector3(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z
        );
    }

    distanceSq(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;
        return dx * dx + dy * dy + dz * dz;
    }

    distanceSqExcludeY(other) {
        const dx = this.x - other.x;
        const dz = this.z - other.z;
        return dx * dx + dz * dz;
    }

    distance(other) {
        return Math.sqrt(this.distanceSq(other));
    }

    distanceExcludeY(other) {
        return Math.sqrt(this.distanceSqExcludeY(other));
    }

    mannhattanDistance(other) {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y) + Math.abs(this.z - other.z);
    }

    toLocal(parentPos, parentRot = Vector3.zero()) {
        const localPos = this.sub(parentPos);
        return localPos.rotate(parentRot.negate());
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    normalize() {
        const len = this.length();
        if (len === 0) return new Vector3(0, 0, 0);

        return new Vector3(
            this.x / len,
            this.y / len,
            this.z / len
        );
    }

    negate() {
        return new Vector3(-this.x, -this.y, -this.z);
    }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    toText() {
        return `${this.x};${this.y};${this.z}`;
    }

    toString() {
        return `(${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)})`;
    }

    toArray() {
        return [this.x, this.y, this.z];
    }

    toSVGCoords() {
        return [this.x, -this.z];
    }
}
