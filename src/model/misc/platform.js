import Misc from "./misc.js";
import SceneryParserLog from "../parsing/scenery-parser-log.js";
import Vector3 from "../vector3.js";
import DefinedPlatforms from "../defs/defined-platforms.js";

export default class Platform extends Misc {
    type = "Platform";
    def = null;

    constructor(id, misc_id, prefab_name, pos, rot, yawData, name) {
        super(id, misc_id, prefab_name, pos, rot, yawData, name);

        this.def = Platform.getDef(name, prefab_name);
    }

    static isPlatform(prefabName) {
        const regex = /^(platform|peron|wgt_peron)(?!_cover)/i;
        return regex.test(prefabName);
    }

    static fromText(id, text, miscGroups = []) {
        const values = text.split(";");
        const object = new Platform(
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

    static getDef(name, prefabName) {
        let def = DefinedPlatforms[prefabName];
        if (!def) {
            SceneryParserLog.warn('platformUndefinedPrefabName', `Platform ${name} has an undefined prefab name ${prefabName}`);
            return null;
        }

        if(def.alias) return Platform.getDef(name, def.alias);
        return def;
    }
}
