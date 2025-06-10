import Misc from "./misc.js";
import SceneryParserLog from "./scenery-parser-log.js";
import Vector3 from "./vector3.js";
import DefinedSignalBoxes from "./defined-signalboxes.js";

export default class SignalBox extends Misc {
    type = "SignalBox";
    applied = false;
    def = null;

    constructor(id, misc_id, prefab_name, pos, rot, name) {
        super(id, misc_id, prefab_name, pos, rot, name);

        this.def = SignalBox.getDef(name, prefab_name);
    }

    getPrintableSignalBoxName() {
        return this.name?.replace(/<[^>]*>|\[[^\]]*\]/g, ' ')?.trim() || "Signal box"
    }

    applyObject(scenery) {
        if(this.applied) return; // already applied
        this.applied = true;

        scenery.addSignalBox(this);
    }

    static fromText(id, text) {        
        const values = text.split(";");
        const object = new SignalBox(
            id, // id
            values[1], // misc_id
            values[2], // prefab_name
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
            values[9] // name
        );

        return object;
    }

    static getDef(name, prefabName) {
        let def = DefinedSignalBoxes[prefabName];
        if (!def) {
            SceneryParserLog.warn('signalBoxUndefinedPrefabName', `SignalBox ${name} has an undefined prefab name ${prefabName}`);

            def = {
                rot: 0,
                undef: true,
            };
        }

        if (def.rot === undefined) def.rot = 0;
        def.skp = name.toLowerCase().indexOf('skp') >= 0 || !isNaN(parseFloat(name));
        def.icon = SignalBox.getIcon(def);

        return def;
    }

    static getIcon(def) {
        if (def.undef) {
            return 'signalbox-undef.svg';
        } else if (def.empty) {
            return 'signalbox-empty.svg';
        } else if (def.skp) {
            return 'signalbox-skp.svg';
        } else {
            return 'signalbox.svg';
        }
    }
}
