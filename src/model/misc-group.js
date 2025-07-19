import Vector3 from "./vector3";

export default class MiscGroup {
    pos;
    rot;

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
}
