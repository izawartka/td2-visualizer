import SignalElementsEnums from "../enums";
import SignalElements from "../signal-elements";
import SignalElementsParserCommon from "./common";

export default class SignalElementsParserEhaEriStandardV2 {
    static parsers = [];

    static isAppliable(prefabName) {
        const regex = /^(eha|eri)_(ps|sbl|sp|tm|to)_(p|r|l)_v2$/;
        return regex.test(prefabName);
    }

    static fromPrefabText(id, text) {
        const entries = text.split(",");

        return new SignalElements(
            SignalElementsEnums.Type.STANDARD,
            SignalElementsParserCommon.getHeadPosition(entries[1]),
            SignalElementsParserCommon.getUnits(entries, 6, 6, 4),
            SignalElementsParserCommon.getBarType(entries[30]),
            SignalElementsParserCommon.getSigns(entries, 31, 5, 1)
        );
    }
}
