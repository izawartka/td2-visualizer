import TrackObject from './track-object';
import Vector3 from '../vector3';

export default class NEVP extends TrackObject {
    type = "NEVP";

    static isNEVP(text) {
        const prefabName = text.split(";", 4)[2];
        return prefabName === 'No Electric Vehicles Point';
    }

    static fromText(text) {
        const values = text.split(";");
        const obj = new NEVP(
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
