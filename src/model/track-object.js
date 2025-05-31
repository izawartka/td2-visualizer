import SceneryObject from './scenery-object';
import SceneryParserLog from './scenery-parser-log';
import Vector3 from './vector3';

export default class TrackObject extends SceneryObject {
    prefab_name;
    track_id;
    name;
    category = "track-objects";
    type = "TrackObject";
    track;

    constructor(id, prefab_name, pos, rot, track_id, name) {
        super(id, pos, rot);
        Object.assign(this, {
            prefab_name,
            track_id, 
            name
        });
    }

    static fromText(text) {
        const values = text.split(";");
        const obj = new TrackObject(
            values[1], // id
            values[2], // prefab_name
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
            values[9], // track_id
            values[11] // name
        );

        return obj;
    }

    applyObject(scenery) {
        const track = scenery.getObject('tracks', this.track_id);
        if (!track) {
            SceneryParserLog.warn('trackObjectCannotBeApplied', `TrackObject ${this.id} cannot be applied: track ${this.track_id} not found`)
            return;
        }

        this.track = track;
    }
}
