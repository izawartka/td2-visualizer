import Vector3 from "./vector3";
import Quaternion from "./quaternion";
import AngleHelper from "../helpers/angleHelper";

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
            const rotRad = AngleHelper.vectorDegToRad(this.rot);
            this.quaternion = Quaternion.fromEulerAnglesRad(rotRad).normalize();
        }

        return this.quaternion;
    }
}
