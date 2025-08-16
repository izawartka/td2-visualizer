import DefinedSignalSigns from '../../defs/defined-signal-signs';
import SceneryParserLog from '../../parsing/scenery-parser-log';
import SignalElementsEnums from '../enums';

export default class SignalElementsParserCommon {
    static getAfterLastUnderscoreNoVersion(entry) {
        entry = entry?.trim();
        entry = entry?.replace(/_(old|new)$/, '');
        const afterLastUnderscore = entry?.lastIndexOf('_') + 1;
        return entry?.substring(afterLastUnderscore) || null;
    }

    static getHeadPosition(poleString) {
        const headPosition = this.getAfterLastUnderscoreNoVersion(poleString)?.[0];

        switch (headPosition) {
            case 'p':
                return SignalElementsEnums.HeadPosition.STANDARD;
            case 'r':
                return SignalElementsEnums.HeadPosition.RIGHT;
            case 'l':
                return SignalElementsEnums.HeadPosition.LEFT;
            default:
                return SignalElementsEnums.HeadPosition.UNKNOWN;
        }
    }

    static getUnitTypeFromTypeString(typeString) {
        typeString = typeString?.trim();
        if(!typeString) return SignalElementsEnums.UnitType.NONE;

        switch (typeString) {
            case 'b':
                return SignalElementsEnums.UnitType.WHITE;
            case 'c':
                return SignalElementsEnums.UnitType.RED;
            case 'n':
                return SignalElementsEnums.UnitType.BLUE;
            case 'p1':
                return SignalElementsEnums.UnitType.YELLOW_UPPER;
            case 'p2':
                return SignalElementsEnums.UnitType.YELLOW_LOWER;
            case 'p3':
                return SignalElementsEnums.UnitType.DWARF_YELLOW_S13;
            case 'wew':
                return SignalElementsEnums.UnitType.INNER;
            case 'w24':
                return SignalElementsEnums.UnitType.DWARF_W24;
            case 'z':
                return SignalElementsEnums.UnitType.GREEN;
            case 'z2':
                return SignalElementsEnums.UnitType.OLD_GREEN;
            case 'zas':
                return SignalElementsEnums.UnitType.UNUSED;
            case 'zb':
                return SignalElementsEnums.UnitType.BROKEN;
            default:
                return SignalElementsEnums.UnitType.UNKNOWN;
        }
    }

    static getUnits(entries, start, count, step, cutOff = true) {
        const units = [];

        for (let i = 0; i < count; i++) {
            const index = start + i * step;
            if (index >= entries.length) break;
            const typeString = this.getAfterLastUnderscoreNoVersion(entries[index]);
            const type = this.getUnitTypeFromTypeString(typeString);

            units[i] = type;
        }

        while (cutOff && units.length > 0) {
            const lastUnit = units[units.length - 1];
            if (lastUnit !== SignalElementsEnums.UnitType.NONE && lastUnit !== SignalElementsEnums.UnitType.UNKNOWN) break;

            units.pop();
        }

        return units;
    }

    static getBarType(barString) {
        const typeString = this.getAfterLastUnderscoreNoVersion(barString);

        switch (typeString) {
            case 'p':
                return SignalElementsEnums.BarType.YELLOW;
            case 'z':
                return SignalElementsEnums.BarType.GREEN;
            case 'pz':
                return SignalElementsEnums.BarType.YELLOW_GREEN;
            default:
                return SignalElementsEnums.BarType.UNKNOWN;
        }
    }

    static getSigns(entries, start, count, step) {
        const signs = {};

        for (let i = 0; i < count; i++) {
            const index = start + i * step;
            if (index >= entries.length) break;

            const entry = entries[index]?.trim();
            if(!entry) continue;

            const key = Object.entries(DefinedSignalSigns).find(([_, value]) => value.regex.test(entry))?.[0];

            if(!key) {
                SceneryParserLog.warn('signalElemsUnknownSign', `Unknown signal sign: ${entry}`);
                continue;
            }
            
            signs[key] = true;

            const def = DefinedSignalSigns[key];
            if(!def.textRegex) continue;

            const match = def.textRegex.exec(entry);
            if(!match) {
                SceneryParserLog.warn('signalElemsUnknownSignText', `Signal sign ${entry} does not match text regex for ${key}`);
                continue;
            }

            const text = match[1]?.trim();
            signs[key] = {
                text: text || null,
            }
        }

        return signs;
    }
}