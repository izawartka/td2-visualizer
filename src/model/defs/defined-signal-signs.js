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
    "w21x": {
        "regex": /^(?:wsk_)?w21_led_\d$/,
        "name": "W21",
        "icon": "w21x.svg",
    },
    "w21": {
        "regex": /^(?:wsk_)?w21(?!_led_)(?:\D)?.*$/,
        "name": "W21",
        "icon": "w21.svg",
        "textRegex": /w21_(\d+)(?:v2)?/
    },
};

export default DefinedSignalSigns;
