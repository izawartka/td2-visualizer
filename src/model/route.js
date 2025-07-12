import SceneryObject from "./scenery-object";
import Vector3 from "./vector3";

export default class Route extends SceneryObject {
    track_count;
    route_name;
    electrified;
    track_offset;
    category = "routes";
    type = "Route";
    points = [];
    segments = [];

    constructor(prefab_name, pos, rot, track_count, route_name, track_offset, electrified) {
        super(route_name, pos, rot);

        Object.assign(this, {
            prefab_name,
            track_count,
            route_name,
            track_offset,
            electrified,
        });

        this.points = this._getConnectionPoints();
    }

    static fromText(text) {
        const values = text.split(";");
        const route = new Route(
            values[2], // prefab_name
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
            parseInt(values[9]), // track_count
            values[10], // route_name
            parseFloat(values[11]) || 0, // track_offset
            values[13] === "True" || values[12] === "1" // electrified
        );

        return route;
    }

    addSegment(length, radius, trackIds) {
        this.segments.push({ length, radius, trackIds });
    }

    _getConnectionPoints() {
        if (this.track_count === 1) {
            return [this.pos.clone()];
        }

        const angle = (this.rot.y + 90) * Math.PI / 180;
        const rightTrackOffset = Vector3.fromAngleY(angle, this.track_offset - 2);
        const leftTrackOffset = Vector3.fromAngleY(angle, this.track_offset + 2);

        return [
            this.pos.add(rightTrackOffset),
            this.pos.add(leftTrackOffset)
        ];
    }
}
