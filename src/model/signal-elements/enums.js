const SignalElementsEnums = {
    Type: {
        UNKNOWN: 0,
        STANDARD: 1,
        DWARF: 2,
        DWARF_DOUBLE: 3,
        TOP: 4,
        MECHANICAL: 5
    },
    HeadPosition: {
        UNKNOWN: 0,
        STANDARD: 1,
        RIGHT: 2,
        LEFT: 3,
        DWARF: 4,
    },
    UnitType: {
        UNKNOWN: 0,
        WHITE: 1,
        RED: 2,
        BLUE: 3,
        YELLOW_UPPER: 4,
        YELLOW_LOWER: 5,
        DWARF_YELLOW_S13: 6,
        INNER: 7,
        DWARF_W24: 8,
        GREEN: 9,
        OLD_GREEN: 10,
        UNUSED: 11,
        BROKEN: 12,
        NONE: 13,
    },
    BarType: {
        UNKNOWN: 0,
        NONE: 1,
        YELLOW: 2,
        GREEN: 3,
        YELLOW_GREEN: 4,
    },
    MechType: {
        UNKNOWN: 0,
        HOME_SINGLE: 1,
        HOME_DOUBLE: 2,
        SHUNTING: 3,
        DISTANT_SINGLE: 4,
        DISTANT_DOUBLE: 5,
        STOP: 6
    }
}

export default SignalElementsEnums;
