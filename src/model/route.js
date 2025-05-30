import SceneryObject from "./scenery-object";

export default class Route extends SceneryObject {
    track_count;
    route_name;
    electrified;
    track_offset;
    category = "routes";
    type = "Route";

    constructor(prefab_name, x, y, z, rot, track_count, route_name, track_offset, electrified) {
        super(route_name, x, y, z);

        Object.assign(this, {
            prefab_name,
            rot,
            track_count,
            route_name,
            track_offset,
            electrified,
        });
    }

    // Route;;ConnectionForest;14418.61;-6.663832;8637.426;0;33.34996;0;2;Ol;2;;True

    static fromText(text) {        
        const values = text.split(";");
        const route = new Route(
            values[2], // prefab_name
            parseFloat(values[3]), // x
            parseFloat(values[4]), // y
            parseFloat(values[5]), // z
            parseFloat(values[7]), // rot
            parseInt(values[9]), // track_count
            values[10], // route_name
            parseFloat(values[11]), // track_offset
            values[13] === "True" || values[12] === "1" // electrified
        );

        return route;
    }

}