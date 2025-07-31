export default class SpawnInfo {
    max_length;
    allow_electric;
    multiple_units_only;
    light_only;
    name;

    constructor(max_length, allow_electric, multiple_units_only, light_only, name) {
        Object.assign(this, {
            max_length,
            allow_electric,
            multiple_units_only,
            light_only,
            name
        });
    }

    static fromText(text) {
        const values = text.split(",");
        return new SpawnInfo(
            parseFloat(values[0]), // max_length
            values[1] === "1", // allow_electric
            values[2] === "1", // multiple_units_only
            values[3] === "1",  // light_only
            values[4] // name
        );
    }
}