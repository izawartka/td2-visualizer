import SignalElementsEnums from "../enums";
import SignalElements from "../signal-elements";

export default class SignalElementsParserMech {
    static parsers = [];

    static isAppliable(prefabName) {
        return true;
    }

    static getMechType(prefabName) {
        if(prefabName.startsWith('sk12')) return SignalElementsEnums.MechType.HOME_DOUBLE;
        if(prefabName.startsWith('sk1')) return SignalElementsEnums.MechType.HOME_SINGLE;
        if(prefabName.startsWith('tmk')) return SignalElementsEnums.MechType.SHUNTING;
        if(prefabName.startsWith('tok3')) return SignalElementsEnums.MechType.DISTANT_DOUBLE;
        if(prefabName.startsWith('tok')) return SignalElementsEnums.MechType.DISTANT_SINGLE;
        if(prefabName.startsWith('tzk')) return SignalElementsEnums.MechType.STOP;

        return SignalElementsEnums.MechType.UNKNOWN;
    }

    static getMechSigns(prefabName) {
        if(prefabName.startsWith('tok')) return ['w1'];

        return [];
    }

    static fromPrefabText(id, text) {
        const entries = text.split(",");
        const prefabName = entries[0].trim();

        return SignalElements.createMech(
            this.getMechType(prefabName),
            this.getMechSigns(prefabName)
        );
    }
}
