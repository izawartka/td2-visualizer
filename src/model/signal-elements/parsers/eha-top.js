import SignalElementsEnums from "../enums";
import SignalElements from "../signal-elements";
import SignalElementsParserCommon from "./common";

export default class SignalElementsParserEhaTop {
    static parsers = [];

    static isAppliable(prefabName) {
        const regex = /^eha_top_(r|l)$/;
        return regex.test(prefabName);
    }

    static fromPrefabText(id, text) {
        const entries = text.split(",");

        return new SignalElements(
            SignalElementsEnums.Type.TOP,
            SignalElementsParserCommon.getHeadPosition(entries[1]),
            [],
            SignalElementsEnums.BarType.NONE,
            {}
        );
    }
}
