import Quaternion from "../quaternion";
import SceneryObject from "../scenery-object";
import Vector3 from "../vector3";
import AngleHelper from "../../helpers/angleHelper";

export default class Misc extends SceneryObject {
    prefab_name;
    name;
    yawData;
    category = "misc";
    type = "Misc";

    constructor(id, misc_id, prefab_name, pos, rot, yawData, name) {
        super(id, pos, rot);
        Object.assign(this, {
            misc_id,
            prefab_name,
            name,
            yawData
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
        const localRotRad = localRot.multiply(Math.PI / 180);
        let worldQuat = Quaternion.fromEulerAnglesRad(localRotRad).normalize();
        let worldPos = localPos.clone();

        for (const group of miscGroups) {
            const groupQuat = group.getQuaternion();
            worldPos = groupQuat.rotateVector(worldPos).add(group.pos);
            worldQuat = groupQuat.multiply(worldQuat).normalize();
        }

        const worldRot = AngleHelper.rotationRadToDeg(worldQuat.toEulerAnglesRad());
        const yawData = worldQuat.getMiscYawData();

        return [ worldPos, worldRot, yawData ];
    }
}
