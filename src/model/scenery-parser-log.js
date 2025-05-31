import Constants from "../helpers/constants";

export default class SceneryParserLog {
    static warn(type, message) {
        if(!Constants.warnings[type] && !Constants.warnings.all) return;

        console.warn(`[SceneryParserLog] ${message}`);
    }
}
