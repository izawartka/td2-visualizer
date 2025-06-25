import SpecialObject from "./special-object.js";
import Vector3 from "../vector3.js";

export default class CameraHome extends SpecialObject {
    pos;
    rot;
    type = "CameraHome";

    constructor(pos, rot) {
        super();
        Object.assign(this, {
            pos, rot
        });
    }

    static fromText(text) {        
        const values = text.split(";");
        const cameraHome = new CameraHome(
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
        );

        return cameraHome;
    }
}
