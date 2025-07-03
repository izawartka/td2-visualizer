import TrackObject from './track-object';
import Vector3 from '../vector3';

export default class Derailer extends TrackObject {
    type = "Derailer";
    
    getPrintableDerailerName() {
        return this.name || "Derailer";
    }

    static isDerailer(text) {
        const prefabName = text.split(";", 4)[2];
        const regex = /^wykolejnica(?!_(?:latarnia|belka)).*$/;
        return regex.test(prefabName);
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
