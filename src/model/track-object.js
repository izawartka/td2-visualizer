export default class TrackObject {
    id;
    prefab_name;
    x;
    y;
    z;
    rot;
    track_id;
    name;
    category = "track-objects";
    type = "TrackObject";
    track;

    constructor(id, prefab_name, x, y, z, rot, track_id, name) {
        Object.assign(this, {
            id, prefab_name,
            x, y, z,
            rot, track_id, name
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
            parseFloat(values[7]), // rot
            values[9], // track_id
            values[11] // name
        );

        return obj;
    }

    applyObject(scenery) {
        /* TODO */
    }

    getRenderBounds() {
        return [
            { x: this.x, z: this.z }
        ];
    }
}
