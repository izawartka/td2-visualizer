import DefinedSigns from "../defs/defined-signs";
import SceneryParserLog from "../scenery-parser-log";
import TrackObject from "./track-object";
import Vector3 from "../vector3";

export default class Sign extends TrackObject {
    type = "Sign";
    data;
    def;
    attached_to = null;

    constructor(id, prefab_name, pos, rot, track_id, name, data) {
        super(id, prefab_name, pos, rot, track_id, name);

        this.data = data || null;
        this.def = Sign.getDef(name, prefab_name);
    }

    getPrintableSignData() {
        let data = this.data?.trim();
        if (!data) return null;
        
        // remove any <size=...>, [size=...], </size> or [/size] tags
        data = this.data.replace(/[<[]size=[^>\]]*[\]>]/g, '')?.trim();

        // remove any leading '<' or '[' tags and their content
        while(data?.match(/^[<[]/)) {
            data = data.replace(/^[<[][^>\]]*[\]>]/, '')?.trim();
        }

        // remove everything before the last underscore (inclusive)
        const parts = data?.split("_");
        return parts?.[parts?.length - 1]?.trim() || null;
    }

    /*
    Check if a TrackObject text is a Sign.
    @param {string} text - The text representation of the TrackObject.
    @returns {boolean} - Returns true if the text represents a Sign, false otherwise.
    @static
    @memberof Sign
    */
    static isSign(text) {
        const values = text.split(";");
        
        const prefabName = values[2]?.trim() || "";
        const regex = /^(?!.*,)(?:.*_)?(?:sign_.*|[wdz]\d+.*)$/;
        return regex.test(prefabName);
    }

    static fromText(text) {        
        const values = text.split(";");
        const sign = new Sign(
            values[1], // id
            values[2], // prefab_name
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
            values[9], // track_id
            values[11], // name
            values[12] // data
        );

        return sign;
    }

    static getDef(name, prefabName) {
        const key = Object.entries(DefinedSigns).find(([key, value]) => {
            if (!value.pattern) {
                const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                value.pattern = new RegExp(`^(sign_)?${escapedKey}([_v].*)?$`, 'i');
            }

            return value.pattern.test(prefabName);
        })?.[0] || null;
        
        if (!key) {
            SceneryParserLog.warn('signUndefinedPrefabName', `Sign ${name} has an undefined prefab name ${prefabName}`);
            return null;
        }

        const alias = DefinedSigns[key].alias;
        if(alias) return DefinedSigns[alias];

        return DefinedSigns[key];
    }
}