/*
NOTE: Order of signs defined in this dictionary dictates the order of signs rendered on the signal pole
*/

const DefinedSignalSigns = {
    "w1": {
        "regex": /^(?:wsk_)?w1(?:\D)?.*$/,
        "name": "W1",
        "icon": "w1.svg",
        "height": 1.28504,
    },
    "w2k": {
        "regex": /^w2k/,
        "name": "W2 K",
        "icon": "rect.svg",
        "text": "K"
    },
    "w2s": {
        "regex": /^w2s/,
        "name": "W2 S",
        "icon": "rect.svg",
        "text": "S"
    },
    "w26a": {
        "regex": /^(?:wsk_)?w26a/,
        "name": "W26a",
        "icon": "rect.svg",
        "text": "P"
    },
    "w26b": {
        "regex": /^(?:wsk_)?w26b/,
        "name": "W26b",
        "icon": "rect.svg",
        "text": "D"
    },
    "w18": {
        "regex": /^(?:wsk_)?w18(?:\D)?.*$/,
        "name": "W18",
        "icon": "w18.svg",
    },
    "w19": {
        "regex": /^(?:wsk_)?w19(?:\D)?.*$/,
        "name": "W19",
        "icon": "w19.svg",
    },
    "w20": {
        "regex": /^(?:wsk_)?w20(?:\D)?.*$/,
        "name": "W20",
        "icon": "w20.svg",
    },
    "w24": {
        "regex": /^(?:wsk_)?w24(?:\D)?.*$/,
        "name": "W24",
        "icon": "w24.svg",
    },
    "w21_led": {
        "regex": /^(?:wsk_)?w21_led_\d$/,
        "name": "W21 (LED)",
        "icon": "rect.svg",
        "text": "X"
    },
    "w21": {
        "regex": /^(?:wsk_)?w21(?!_led_)(?:\D)?.*$/,
        "name": "W21",
        "icon": "rect.svg",
        "textRegex": /w21_(\d+)(?:v2)?/
    }
};

export default DefinedSignalSigns;
