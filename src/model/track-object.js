import Constants from '../helpers/constants';
import SceneryObject from './scenery-object';
import SceneryParserLog from './scenery-parser-log';

export default class TrackObject extends SceneryObject {
    prefab_name;
    track_id;
    name;
    category = "track-objects";
    type = "TrackObject";
    track;

    constructor(id, prefab_name, x, y, z, rx, ry, rz, track_id, name) {
        super(id, x, y, z, rx, ry, rz);
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
            parseFloat(values[3]), // x
            parseFloat(values[4]), // y
            parseFloat(values[5]), // z
            parseFloat(values[6]), // rx
            parseFloat(values[7]), // ry
            parseFloat(values[8]), // rz
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
