import SpecialObject from "./special-object";
import SceneryParserLog from '../parsing/scenery-parser-log';
import Constants from '../../helpers/constants';

export default class SceneryInfo extends SpecialObject {
    name;
    version;
    description;
    link;
    author;
    main_signalbox;
    uuid;
    infoVersion;
    type = "SceneryInfo";

    constructor(name, version, description, link, author, main_signalbox, uuid, infoVersion) {
        super();
        Object.assign(this, {
            name,
            version,
            description,
            link,
            author,
            main_signalbox,
            uuid,
            infoVersion
        });
    }

    static fromText(text) {
        const values = text.split(";");

        if(!values[0].startsWith("scv")) {
            SceneryParserLog.error('invalidSceneryInfo', `Invalid scenery info header: ${text}`);
            return null;
        }

        const infoVersion = parseInt(values[0].split("v")[1]);
        if(!infoVersion || infoVersion < Constants.parser.sceneryInfoVersionMin || infoVersion > Constants.parser.sceneryInfoVersionMax) {
            SceneryParserLog.warn('invalidSceneryInfoVersion', `Unsupported scenery info version: ${infoVersion}. Expected: ${Constants.parser.sceneryInfoVersionMin}-${Constants.parser.sceneryInfoVersionMax}`);
        }

        const sceneryInfo = new SceneryInfo(
            values[1], // name
            parseInt(values[2]), // version
            values[3], // description
            values[4], // link
            values[5], // author
            values[6], // main_signalbox
            values[7],  // uuid
            infoVersion
        );

        return sceneryInfo;
    }
}