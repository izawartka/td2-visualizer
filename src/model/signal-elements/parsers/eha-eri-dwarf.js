import SignalElementsEnums from "../enums";
import SignalElements from "../signal-elements";
import SignalElementsParserCommon from "./common";

export default class SignalElementsParserEhaEriDwarf {
    static parsers = [];

    static isAppliable(prefabName) {
        const regex = /^(eha|eri)_(sp|tm|to)_k$/;
        return regex.test(prefabName);
    }

    static fromPrefabText(id, text) {
        const entries = text.split(",");

        return new SignalElements(
            SignalElementsEnums.Type.DWARF,
            SignalElementsEnums.HeadPosition.DWARF,
            SignalElementsParserCommon.getUnits(entries, 2, 3, 2),
            SignalElementsEnums.BarType.NONE,
            []
        );
    }
}
