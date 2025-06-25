import SpecialObject from "./special-object.js";
import Vector3 from "../vector3.js";

export default class MainCamera extends SpecialObject {
    pos;
    rot;
    type = "MainCamera";

    constructor(pos, rot) {
        super();
        Object.assign(this, {
            pos, rot
        });
    }

    static fromText(text) {        
        const values = text.split(";");
        const mainCamera = new MainCamera(
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
        );

        return mainCamera;
    }
}
