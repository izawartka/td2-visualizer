import SignalElementsEnums from "../enums";
import SignalElements from "../signal-elements";
import SignalElementsParserCommon from "./common";

export default class SignalElementsParserSkDwarf {
    static parsers = [];

    static isAppliable(prefabName) {
        return prefabName === 'sk_tmk';
    }

    static fromPrefabText(id, text) {
        const entries = text.split(",");

        return new SignalElements(
            SignalElementsEnums.Type.DWARF,
            SignalElementsEnums.HeadPosition.NO_POLE,
            SignalElementsParserCommon.getUnits(entries, 2, 2, 1),
            SignalElementsEnums.BarType.NONE,
            []
        );
    }
}
