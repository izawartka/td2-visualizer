import TrackObject from './track-object';
import Vector3 from '../vector3';
import SceneryParserLog from "../parsing/scenery-parser-log";

export default class Derailer extends TrackObject {
    type = "Derailer";
    is_left;

    constructor(id, prefab_name, pos, rot, track_id, name) {
        super(id, prefab_name, pos, rot, track_id, name);
        this.is_left = Derailer._isLeft(prefab_name);
    }

    getPrintableDerailerName() {
        return this.name || "Derailer";
    }

    static isDerailer(text) {
        const prefabName = text.split(";", 4)[2];
        const regex = /^wykolejnica(?!_(?:latarnia|belka)).*$/;
        return regex.test(prefabName);
    }

    static _isLeft(prefabName) {
        const regex = /^wykolejnica(?!_(?:latarnia|belka)).*_([lr])(?:[_,].+)?$/;
        const match = regex.exec(prefabName);
        if (match === null) {
            SceneryParserLog.warn('derailerUnknownDirection', `Failed to determine the direction of derailer: ${prefabName}`);
            return false;
        }
        return match[1] === 'l';
    }

    static fromText(text) {
        const values = text.split(";");
        const obj = new Derailer(
            values[1], // id
            values[2], // prefab_name
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
            values[9], // track_id
            values[11] // name
        );

        return obj;
    }
}
