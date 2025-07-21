import Vector3 from "./vector3";
import Quaternion from "./quaternion";

export default class MiscGroup {
    pos;
    rot;
    quaternion;

    constructor(pos, rot) {
        this.pos = pos;
        this.rot = rot;
    }

    static fromText(text) {        
        const values = text.split(";");
        const object = new MiscGroup(
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
        );

        return object;
    }

    getQuaternion() {
        if (!this.quaternion) {
            this.quaternion = Quaternion.fromEulerAngles(this.rot.multiply(Math.PI / 180));
        }
        
        return this.quaternion;
    }
}
