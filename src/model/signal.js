import SpawnInfo from "./spawn-info";
import TrackObject from "./track-object";

export default class Signal extends TrackObject {
    is_spawn;
    spawn_info;
    signal_name;
    type = "Signal";

    constructor(id, prefab_name, x, y, z, rx, ry, rz, track_id, name, is_spawn, spawn_info, signal_name) {
        super(id, prefab_name, x, y, z, rx, ry, rz, track_id, name);

        Object.assign(this, {
            is_spawn,
            spawn_info: is_spawn ? spawn_info : null,
            signal_name
        });
    }

    getPrintableSignalName() {
        if (!this.signal_name) {
            return this.name
        }

        // remove everything after the first '[' or '<' character (inclusive)
        const match = this.signal_name.match(/^[^[<]*/);
        if (match) {
            return match[0].trim();
        }
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
            parseFloat(values[3]), // x
            parseFloat(values[4]), // y
            parseFloat(values[5]), // z
            parseFloat(values[6]), // rx
            parseFloat(values[7]), // ry
            parseFloat(values[8]), // rz
            values[9], // track_id
            values[11], // name,
            values[12] === "Spawn Signal", // is_spawn
            SpawnInfo.fromText(values[15]), // spawn_info
            values[29]
        );

        return signal;
    }

}