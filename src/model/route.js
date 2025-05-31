import SceneryObject from "./scenery-object";
import Vector3 from "./vector3";

export default class Route extends SceneryObject {
    track_count;
    route_name;
    electrified;
    track_offset;
    category = "routes";
    type = "Route";

    constructor(prefab_name, pos, rot, track_count, route_name, track_offset, electrified) {
        super(route_name, pos, rot);

        Object.assign(this, {
            prefab_name,
            track_count,
            route_name,
            track_offset,
            electrified,
        });
    }

    static fromText(text) {        
        const values = text.split(";");
        const route = new Route(
            values[2], // prefab_name
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
            parseInt(values[9]), // track_count
            values[10], // route_name
            parseFloat(values[11]), // track_offset
            values[13] === "True" || values[12] === "1" // electrified
        );

        return route;
    }

}