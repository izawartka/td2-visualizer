import Constants from "../../helpers/constants";

export default class SceneryParserLog {
    static log = [];
    static hasWarnings = false;
    static hasErrors = false;

    static clear() {
        SceneryParserLog.log = [];
        SceneryParserLog.hasWarnings = false;
        SceneryParserLog.hasErrors = false;
    }

    static warn(type, message) {
        if(!Constants.warnings[type] && !Constants.warnings.all) return;
        SceneryParserLog.hasWarnings = true;
        SceneryParserLog.log.push({logType: 'warn', type, message});

        console.warn(`[SceneryParserLog] ${message}`);
    }

    static error(type, message) {
        SceneryParserLog.hasErrors = true;
        SceneryParserLog.log.push({logType: 'error', type, message});

        throw new Error(`[SceneryParserLog] ${message}`);
    }

    static getLog() {
        return [...SceneryParserLog.log];
    }
}
