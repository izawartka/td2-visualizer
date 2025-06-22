const DefinedSigns = {
    "w32_L": {
        "name": "W32",
        "icon": "w32.svg",
        "offsetY": -1.4364,
        "text": "data",
        "textSize": 0.22,
        "textOffsetX": 1.89,
        "textOffsetY": 2.75,
        "rot": 2
    },
    "w32": {
        "name": "W32",
        "icon": "w32.svg",
        "offsetY": -1.4364,
        "text": "data",
        "textSize": 0.22,
        "textOffsetX": 1.89,
        "textOffsetY": 2.75,
        "rot": 2
    },
    "w27a": {alias: "w27"},
    "w27": {
        "name": "W27",
        "icon": "w27.svg",
        "offsetY": -1.4364,
        "text": ["fun", "data"],
        "textFun": (object) => object.prefab_name?.match(/^(?:sign_)?w27_(\d+)/)?.[1] || null,
        "textSize": 0.22,
        "textOffsetX": 1.89,
        "textOffsetY": 1.2
    },
    "w28": {
        "name": "W28",
        "icon": "w28.svg",
        "offsetY": -1.4364,
        "text": ["fun", "data"],
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
    "w11p_1": {alias: "w11p_200m"},
    "w11p_2": {alias: "w11p_400m"},
    // TODO: separate icons for W11a signs
    "w11a_4": {
        "name": "W11a 400m",
        "icon": "w11_4.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11a_3": {
        "name": "W11a 300m",
        "icon": "w11_3.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11a_2": {
        "name": "W11a 200m",
        "icon": "w11_2.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11a_1": {
        "name": "W11a 100m",
        "icon": "w11_1.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11a_400m": {alias: "w11a_4"},
    "w11a_300m": {alias: "w11a_3"},
    "w11a_200m": {alias: "w11a_2"},
    "w11a_100m": {alias: "w11a_1"},
    "w11b_4": {
        "name": "W11b 400m",
        "icon": "w11b_4.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11b_3": {
        "name": "W11b 300m",
        "icon": "w11b_3.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11b_2": {
        "name": "W11b 200m",
        "icon": "w11b_2.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11b_1": {
        "name": "W11b 100m",
        "icon": "w11b_1.svg",
        "offsetY": -3.3264,
        "height": 1.5
    },
    "w11b_400m": {alias: "w11b_4"},
    "w11b_300m": {alias: "w11b_3"},
    "w11b_200m": {alias: "w11b_2"},
    "w11b_100m": {alias: "w11b_1"},
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
    "w11_400m": {alias: "w11_4"},
    "w11_300m": {alias: "w11_3"},
    "w11_200m": {alias: "w11_2"},
    "w11_100m": {alias: "w11_1"},
    "w12": {
        "name": "W12",
        "icon": "w12.svg",
        "offsetY": -1.4364
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
    "w14": { alias: "w9" },
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
    "w16": {
        "name": "W16",
        "icon": "w16.svg",
        "width": 1.2,
        "offsetX": -0.378,
        "offsetY": -1.4364
    },
    "w17": {
        "name": "W17",
        "icon": "w17.svg"
    },
    "w18": {
        "name": "W18",
        "icon": "w18.svg",
        "offsetY": 3.89
    },
    "w19": {
        "name": "W19",
        "icon": "w19.svg",
        "offsetY": 3.89
    },
    "w20": {
        "name": "W20",
        "icon": "w20.svg",
        "offsetY": 3.89
    },
    "w1": {
        "name": "W1",
        "icon": "w1.svg",
        "offsetY": 3.89
    },
    "latarnia_w4": {alias: "w4"},
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
    "d6": { alias: "w8" },
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
    "w9a_oneside": {
        "name": "W9",
        "icon": "w9a.svg",
        "offsetY": -1.4364
    },
    "w9b_oneside": {
        "name": "W9",
        "icon": "w9b.svg",
        "offsetY": -1.4364
    },
    "latarnia_z1": {alias: "z1"},
    "z1": {
        "name": "Z1",
        "icon": "z1.svg",
        "offsetY": -1.4364
    },
    "d1": {
        "name": "D1",
        "icon": "d1.svg",
        "offsetY": -1.4364,
    },
    "d0": {
        "name": "D0",
        "icon": "d0.svg",
        "offsetY": -1.4364,
    }
};

export default DefinedSigns;
