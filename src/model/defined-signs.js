// remember to place sign_w1X before sign_w1 etc.
 
const DefinedSigns = {
    "sign_w27": {
        "name": "W27",
        "icon": "w27.svg",
        "offsetY": -1.4364,
        "text": ["fun", "data"],
        "textFun": (object) => object.prefab_name?.match(/^(?:sign_)?w27_(\d+)/)?.[1] || null,
        "textSize": 0.22,
        "textOffsetX": 1.89,
        "textOffsetY": 1.2
    },
    "sign_w28": {
        "name": "W28",
        "icon": "w28.svg",
        "offsetY": -1.4364,
        "text": ["fun"],
        "textFun": (object) => {
            const channel = object.prefab_name?.match(/^(?:sign_)?w28_(\d+)/)?.[1];
            return channel ? `R${channel}` : null;
        },
        "textSize": 0.22,
        "textOffsetX": 1.89,
        "textOffsetY": 1.25
    },
    "w11p_400m": {
        "name": "W11p 400m",
        "icon": "w11p_2.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11p_200m": {
        "name": "W11p 200m",
        "icon": "w11p_1.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    // TODO: separate icons for W11a signs
    "w11a_400m": {
        "name": "W11a 400m",
        "icon": "w11_4.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11a_300m": {
        "name": "W11a 300m",
        "icon": "w11_3.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11a_200m": {
        "name": "W11a 200m",
        "icon": "w11_2.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11a_100m": {
        "name": "W11a 100m",
        "icon": "w11_1.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11_4": {
        "name": "W11 400m",
        "icon": "w11_4.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11_3": {
        "name": "W11 300m",
        "icon": "w11_3.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11_2": {
        "name": "W11 200m",
        "icon": "w11_2.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11_1": {
        "name": "W11 100m",
        "icon": "w11_1.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w13a": {
        "name": "W13a",
        "icon": "w13a.svg",
        "offsetY": -2.01096,
        "height": 1.4
    },
    "w13": {
        "name": "W13",
        "icon": "w13.svg",
        "offsetY": -2.01096,
        "height": 1.4
    },
    "w15_p": {
        "name": "W15 Right",
        "icon": "w15_r.svg",
        "offsetY": -1.4364,
    },
    "w15_l": {
        "name": "W15 Left",
        "icon": "w15_l.svg",
        "offsetY": -1.4364
    },
    "sign_w17": {
    "w17": {
        "name": "W17",
        "icon": "w17.svg"
    },
    // TODO: make it somehow not conflict with unknown W1X signs
    "w1": {
        "name": "W1",
        "icon": "w1.svg",
        "offsetY": 3.89
    },
    "w4": {
        "name": "W4",
        "icon": "w4.svg",
        "offsetY": -1.4364
    },
    "w5": {
        "name": "W5",
        "icon": "w5.svg",
        "offsetY": -1.4364
    },
    "w6b": {
        "name": "W6b",
        "icon": "w6b.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w6a": {
        "name": "W6a",
        "icon": "w6a.svg",
        "offsetY": -1.4364
    },
    "w6": {
        "name": "W6",
        "icon": "w6.svg",
        "offsetY": -1.4364
    },
    "w7": {
        "name": "W7",
        "icon": "w7.svg",
        "offsetY": -1.4364
    },
    "w8_0": {
        "name": "W8",
        "icon": "w8.svg",
        "offsetY": -1.4364,
        "text": "static",
        "staticText": "X",
        "textSize": 0.14,
        "textOffsetX": 1.89,
        "textOffsetY": 0.9
    },
    "w8": {
        "name": "W8",
        "icon": "w8.svg",
        "offsetY": -1.4364,
        "text": ["fun", "data"],
        "textFun": (object) => object.prefab_name?.match(/^(?:sign_)?w8_(\d+)/)?.[1] || null,
        "textSize": 0.14,
        "textOffsetX": 1.89,
        "textOffsetY": 0.9
    },
    "w9": {
        "name": "W9",
        "icon": "w9.svg",
        "offsetY": -2.528064,
        "height": 1.76
    },
    "z1": {
        "name": "Z1",
        "icon": "z1.svg",
        "offsetY": -1.4364
    }
};

export default DefinedSigns;