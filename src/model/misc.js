import SceneryObject from "./scenery-object";
import Vector3 from "./vector3";

export default class Misc extends SceneryObject {
    prefab_name;
    name;
    category = "misc";
    type = "Misc";
    applied = false;

    constructor(id, misc_id, prefab_name, pos, rot, name) {
        super(id, pos, rot);
        Object.assign(this, {
            misc_id,
            prefab_name,
            name,
        });
    }

    static fromText(id, text) {        
        const values = text.split(";");
        const object = new Misc(
            id, // id
            values[1], // misc_id
            values[2], // prefab_name
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
            values[9] // name
        );

        return object;
    }
}
