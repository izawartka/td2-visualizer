import SceneryObject from "../scenery-object";
import Vector3 from "../vector3";

export default class Misc extends SceneryObject {
    prefab_name;
    name;
    category = "misc";
    type = "Misc";

    constructor(id, misc_id, prefab_name, pos, rot, name) {
        super(id, pos, rot);
        Object.assign(this, {
            misc_id,
            prefab_name,
            name
        });
    }

    static fromText(id, text, miscGroups = []) {        
        const values = text.split(";");

        const object = new Misc(
            id, // id
            values[1], // misc_id
            values[2], // prefab_name
            ...Misc.applyGroupTransforms(
                Vector3.fromValuesArray(values, 3), // pos
                Vector3.fromValuesArray(values, 6), // rot
                miscGroups
            ),
            values[9] // name
        );

        return object;
    }

    static applyGroupTransforms(localPos, localRot, miscGroups) {
        let worldPos = localPos.clone();
        let worldRot = localRot.clone();
      
        for (const group of miscGroups) {
            worldPos = group.getQuaternion().rotateVector(worldPos).add(group.pos);
            worldRot = worldRot.add(group.rot);
        }
      
        return [ worldPos, worldRot ];
    }
}
