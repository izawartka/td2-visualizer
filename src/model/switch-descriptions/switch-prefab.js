import Vector3 from "../vector3";

export default class SwitchPrefab {
    tracks = {};
    isolation_id_offset;

    constructor(tracks, isolation_id_offset) {
        Object.assign(this, {
            tracks,
            isolation_id_offset,
        });
    }

    static parseExported(prefabName, def) {
        const isolationIdOffset = prefabName.startsWith("Rkp") || prefabName.startsWith("Crossing")
            ? Vector3.zero() : new Vector3(0, 0, 6);

        return new SwitchPrefab(def.tracks, isolationIdOffset);
    }
}
