import DefinedSigns from "./defined-signs";
import SceneryParserLog from "./scenery-parser-log";
import TrackObject from "./track-object";
import Vector3 from "./vector3";

export default class Sign extends TrackObject {
    type = "Sign";
    data;
    def;

    constructor(id, prefab_name, pos, rot, track_id, name, data) {
        super(id, prefab_name, pos, rot, track_id, name);

        this.data = data || null;
        this.def = Sign.getDef(name, prefab_name);
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
        
        const prefabInfo = values[2]?.trim() || "";
        return prefabInfo.startsWith("sign_");
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
        const key = Object.keys(DefinedSigns).find(k => prefabName.startsWith(k));
        if (!key) {
            SceneryParserLog.warn('signUndefinedPrefabName', `Sign ${name} has an undefined prefab name ${prefabName}`);
            return null;
        }

        return DefinedSigns[key];
    }
}