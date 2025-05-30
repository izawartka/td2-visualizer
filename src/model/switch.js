import PointTrack from "./point-track.js";
import SceneryObject from "./scenery-object.js";

export default class Switch extends SceneryObject {
    model;
    rot;
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

    constructor(id, model, x, y, z, rot, data, id_isolation, id_switch, maxspeed, derailspeed) {
        super(id, x, y, z);
        Object.assign(this, {
            model,
            rot, data,
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
            parseFloat(values[7]), // rot
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

        this.trackA = this._createSwitchTrack(scenery, this.id+"A", this.outs[0], this.outs[2], 0);
        this.trackB = this._createSwitchTrack(scenery, this.id+"B", this.outs[1], this.outs[3], r);

        if(!this.trackA || !this.trackB) {
            console.error("Couldn't create switch tracks for switch #"+this.id);
            return;
        }

        scenery.addObject(this.trackA);
        scenery.addObject(this.trackB);
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

    _createSwitchTrack(scenery, name, from, to, r) {
        const startTrack = scenery.getObject("tracks", from);
        const endTrack = scenery.getObject("tracks", to);

        if(!startTrack || !endTrack) {
            console.error("Couldn't create track from #"+from+" to #"+to+". One of them doesn't exist!");
            return;
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
