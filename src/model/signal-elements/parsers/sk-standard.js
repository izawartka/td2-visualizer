import SignalElementsEnums from "../enums";
import SignalElements from "../signal-elements";
import SignalElementsParserCommon from "./common";

export default class SignalElementsParserSkStandard {
    static parsers = [];

    static isAppliable(prefabName) {
        const regex = /^sk_(ps|sbl|sp|tm|to)_(p|r|l)$/;
        return regex.test(prefabName);
    }

    static fromPrefabText(id, text) {
        const entries = text.split(",");

        return new SignalElements(
            SignalElementsEnums.Type.STANDARD,
            SignalElementsParserCommon.getHeadPosition(entries[1]),
            SignalElementsParserCommon.getUnits(entries, 4, 5, 1),
            SignalElementsParserCommon.getBarType(entries[9]),
            SignalElementsParserCommon.getSigns(entries, 10, 5, 1)
        );
    }
}
