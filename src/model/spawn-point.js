import SceneryParserLog from "./scenery-parser-log";
import SpawnInfo from "./spawn-info";
import TrackObject from "./track-object";
import Vector3 from "./vector3";

export default class SpawnPoint extends TrackObject {
    is_spawn;
    spawn_info;
    spawn_point_name;
    type = "SpawnPoint";
    applied = false;

    constructor(id, prefab_name, pos, rot, track_id, name, is_spawn, spawn_info, signal_name) {
        super(id, prefab_name, pos, rot, track_id, name);

        Object.assign(this, {
            is_spawn,
            spawn_info,
            signal_name
        });

        if (this.is_spawn && !this.spawn_info) {
            SceneryParserLog.warn('spawnWithoutSpawnInfo', `SpawnPoint ${this.id} is marked as spawn but has no spawn info`);
        }
    }

    getPrintableSpawnPointName() {
        return this.spawn_point_name?.trim() || this.name?.trim() || "Spawn Point";
    }

    /*
    Check if a TrackObject text is a SpawnPoint.
    @param {string} text - The text representation of the TrackObject.
    @returns {boolean} - Returns true if the text represents a SpawnPoint, false otherwise.
    @static
    @memberof Signal
    */
    static isSpawnPoint(text) {
        const values = text.split(";");
        if(values.length < 29) return false;
        
        const prefabName = values[2];
        return prefabName === "Spawn Point";
    }

    static fromText(text) {        
        const values = text.split(";");
        const signal = new SpawnPoint(
            values[1], // id
            values[2], // prefab_name
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
            values[9], // track_id
            values[11], // name,
            values[12] === "Spawn Signal", // is_spawn
            SpawnInfo.fromText(values[15]), // spawn_info
            values[29]
        );

        return signal;
    }

    applyObject(scenery) {
        if(this.applied) return; // already applied
        this.applied = true;

        if (this.is_spawn) {
            scenery.addSpawnPoint(this);
        }
    }

}