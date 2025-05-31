import PointTrack from "./point-track.js";
import SceneryObject from "./scenery-object.js";

export default class Switch extends SceneryObject {
    model;
    data;
    id_isolation;
    id_switch;
    maxspeed;
    derailspeed;
    category = "switches";
    type = "Switch";
    outs = [];
    applied = false;
    trackA;
    trackB;

    constructor(id, model, x, y, z, rx, ry, rz, data, id_isolation, id_switch, maxspeed, derailspeed) {
        super(id, x, y, z, rx, ry, rz);
        Object.assign(this, {
            model,
            data,
            id_switch, id_isolation,
            maxspeed, derailspeed
        });
    }

    static fromText(text) {
        const values = text.split(";");

        const sw = new Switch(
            values[1], // id
            values[2], // model
            parseFloat(values[3]), // x
            parseFloat(values[4]), // y
            parseFloat(values[5]), // z
            parseFloat(values[6]), // rx
            parseFloat(values[7]), // ry
            parseFloat(values[8]), // rz
            values[9], // data
            values[10], // id_isolation
            values[11], // id_switch
            parseFloat(values[13]), // maxspeed
            parseFloat(values[14]) // derailspeed
        );

        return sw;
    }

    applyObject(scenery) {
        if(this.applied) return; // already applied

        this.outs = Switch.getOutsFromData(this.data);
        const r = Switch.getRadiusFromModel(this.model);

        this.trackA = this._createGetSwitchTrack(scenery, this.id+"A", this.outs[0], this.outs[2], 0);
        if(this.trackA) {
            scenery.addObject(this.trackA);
        }
 
        this.trackB = this._createGetSwitchTrack(scenery, this.id+"B", this.outs[1], this.outs[3], r);
        if(this.trackB) {
            scenery.addObject(this.trackB);
        }
    }

    static getOutsFromData(data) {
        const cts = data.split(",");

        const tou = [];
        cts.forEach((ct, i) => {
            cts[i] = ct.split(":");
            if(cts[i][1] === "") cts[i][1] = cts[i][2];
            tou.push(cts[i][1]);
        });

        return [
            tou[0],
            tou[1] || tou[0],
            tou[2] || tou[3] || tou[5],
            tou[4] || tou[6] || tou[3]
        ];
    }

    static getRadiusFromModel(model) {
        if(/Rkpd|Crossing/.test(model)) return 0;
        
        const radiusText = model.replace(/(Rz 60E1-)|-1_.*/g, "");
        const radius = parseInt(radiusText) || 0;
        const side = model.split(",")[0];
        const isRight = side[side.length-1] === "R";

        return isRight ? -radius : radius;
    }

    _createGetSwitchTrack(scenery, name, from, to, r) {
        if(!from) {
            console.error(`Switch #${this.id}, track ${name} has no 'from' track set!`);
            return null;
        } else if(!to) {
            console.error(`Switch #${this.id}, track ${name} has no 'to' track set!`);
            return null;
        }

        const startTrack = scenery.getObject("tracks", from);
        const endTrack = scenery.getObject("tracks", to);

        if(!startTrack) {
            console.error(`Switch #${this.id}, track ${name}, 'from' track ${from} not found!`);
            return null;
        } else if(!endTrack) {
            console.error(`Switch #${this.id}, track ${name}, 'to' track ${to} not found!`);
            return null;
        }

        const startTrackEnd = startTrack.getCloserEnd(this.x, this.y, this.z);
        const endTrackEnd = endTrack.getCloserEnd(this.x, this.y, this.z);

        let trackObj = new PointTrack(
            name,
            ...startTrackEnd,
            ...endTrackEnd, 
            r,
            from, 
            to, 
            this.id_switch, 
            this.id_isolation, 
            this.maxspeed, 
            this.derailspeed
        );

        return trackObj;
    }
}
