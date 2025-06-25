import SpecialObject from "./special-object";

export default class SceneryInfo extends SpecialObject {
    name;
    version;
    description;
    link;
    author;
    main_signalbox;
    type = "SceneryInfo";

    constructor(name, version, description, link, author, main_signalbox) {
        super();
        Object.assign(this, {
            name,
            version,
            description,
            link,
            author,
            main_signalbox
        });
    }

    static fromText(text) {
        const values = text.split(";");
        const sceneryInfo = new SceneryInfo(
            values[1], // name
            parseInt(values[2]), // version
            values[3], // description
            values[4], // link
            values[5], // author
            values[6]  // main_signalbox
        );

        return sceneryInfo;
    }
}