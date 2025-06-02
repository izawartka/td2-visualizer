import SceneryParserLog from "./scenery-parser-log";
import SpawnInfo from "./spawn-info";
import TrackObject from "./track-object";
import Vector3 from "./vector3";

export default class Signal extends TrackObject {
    is_spawn;
    spawn_info;
    signal_name;
    type = "Signal";
    applied = false;

    constructor(id, prefab_name, pos, rot, track_id, name, is_spawn, spawn_info, signal_name) {
        super(id, prefab_name, pos, rot, track_id, name);

        Object.assign(this, {
            is_spawn,
            spawn_info: is_spawn ? spawn_info : null,
            signal_name
        });

        if (this.is_spawn && !this.spawn_info) {
            SceneryParserLog.warn('signalWithoutSpawnInfo', `Signal ${this.id} is marked as spawn but has no spawn info`);
        }
    }

    getPrintableSignalName() {
        let name = this.signal_name.trim();
        if (!name) return this.name;

        // remove any leading '<' or '[' tags and their content
        while(name?.match(/^[<[]/)) {
            name = name.replace(/^[<[][^>\]]*[\]>]/, '').trim();
        }

        // remove everything after the first '[' or '<' character (inclusive)
        const match = name.match(/^[^<[]*/);
        if (match) {
            name = match[0].trim();
        }

        return name?.trim() || this.name || "Signal";
    }

    /*
    Check if a TrackObject text is a Signal.
    @param {string} text - The text representation of the TrackObject.
    @returns {boolean} - Returns true if the text represents a Signal, false otherwise.
    @static
    @memberof Signal
    */
    static isSignal(text) {
        const values = text.split(";");
        if(values.length < 29) return false;
        
        const prefabInfo = values[2].split(",");
        if(prefabInfo.length < 2) return false;

        return true;
    }

    static fromText(text) {        
        const values = text.split(";");
        const signal = new Signal(
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
            scenery.addSpawnSignal(this);
        }
    }

}