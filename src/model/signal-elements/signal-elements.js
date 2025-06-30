import SceneryParserLog from "../scenery-parser-log";
import SignalElementsEnums from "./enums";
import SignalElementsParsersList from "./parsers-list";

export default class SignalElements {
    type = SignalElementsEnums.Type.UNKNOWN;
    headPosition = SignalElementsEnums.HeadPosition.UNKNOWN;
    units = [];
    bar;
    signs = {};

    constructor(type, headPosition, units = [], bar = null, signs = []) {
        Object.assign(this, {
            type,
            headPosition,
            units,
            bar,
            signs
        });
    }

    isOverhead() {
        return this.headPosition === SignalElementsEnums.HeadPosition.UNKNOWN;
    }

    isDwarf() {
        return this.type === SignalElementsEnums.Type.DWARF || this.type === SignalElementsEnums.Type.DWARF_DOUBLE;
    }

    static fromPrefabText(id, text) {
        const prefabName = text.split(",", 2)[0].trim();

        for(const parser of Object.values(SignalElementsParsersList)) {
            if (!parser.regex.test(prefabName)) continue;

            for(const subtype of parser.subtypes) {
                if (subtype.isAppliable(prefabName)) {
                    return subtype.fromPrefabText(id, text);
                }
            }

            SceneryParserLog.warn('signalElemsRecognizedUnknownPrefab', `Signal ${id} recognized as ${parser.name} but has unknown prefab name: ${prefabName}`);
            return null;
        }

        SceneryParserLog.warn('signalElemsUnknownPrefab', `Signal ${id} has unknown prefab name: ${prefabName}`);
        return null;
    }
}
