import SignalElementsEnums from "../enums";
import SignalElements from "../signal-elements";
import SignalElementsParserCommon from "./common";

export default class SignalElementsParserEhaEriDwarfPs {
    static parsers = [];

    static isAppliable(prefabName) {
        const regex = /^(eha|eri)_(ps)_k$/;
        return regex.test(prefabName);
    }

    static fromPrefabText(id, text) {
        const entries = text.split(",");
        const isDouble = entries[8]?.trim().length > 0;
        const mainUnits = SignalElementsParserCommon.getUnits(entries, 2, 3, 2, false);
        const secondaryUnits = isDouble ? SignalElementsParserCommon.getUnits(entries, 5, 3, 2) : [];

        return new SignalElements(
            isDouble ? SignalElementsEnums.Type.DWARF_DOUBLE : SignalElementsEnums.Type.DWARF,
            SignalElementsEnums.HeadPosition.NO_POLE,
            [mainUnits, secondaryUnits].flat(),
            SignalElementsEnums.BarType.NONE,
            SignalElementsParserCommon.getSigns(entries, 15, 1, 1)
        );
    }
}
