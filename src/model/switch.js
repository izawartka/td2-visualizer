import PointTrack from "./point-track.js";
import SceneryObject from "./scenery-object.js";
import SceneryParserLog from "./scenery-parser-log.js";
import Vector3 from "./vector3.js";
import DefinedSwitches from "./defined-switches.js";
import Constants from "../helpers/constants.js";

export default class Switch extends SceneryObject {
    model;
    data;
    id_isolation;
    id_switch;
    maxspeed;
    derailspeed;
    category = "switches";
    type = "Switch";
    applied = false;
    track_prefab_name;
    trackA;
    trackB;
    def = null;

    constructor(id, model, pos, rot, data, id_isolation, id_switch, maxspeed, derailspeed, track_prefab_name) {
        super(id, pos, rot);
        Object.assign(this, {
            model,
            data,
            id_switch, id_isolation,
            maxspeed, derailspeed,
            track_prefab_name
        });

        this.bare_model = model.split(',')[0]?.trim() || model.trim();
    }

    static fromText(text) {
        const values = text.split(";");

        const sw = new Switch(
            values[1], // id
            values[2], // model
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
            values[9], // data
            values[10], // id_isolation
            values[11], // id_switch
            parseFloat(values[13]) || 0, // maxspeed
            parseFloat(values[14]) || 0, // derailspeed
            values[15] // track_prefab_name
        );

        return sw;
    }

    applyObject(scenery) {
        if(this.applied) return; // already applied
        this.applied = true;

        if(!this.bare_model) {
            SceneryParserLog.warn('switchNoModel', `Switch ${this.id} has no model defined, apply`);
            return;
        }

        let def = DefinedSwitches[this.bare_model] || null;

        if(!def && !Constants.parser.forceAutoSwitches) {
            SceneryParserLog.warn('switchUndefinedModel', `Switch ${this.id} has an undefined model "${this.bare_model}", trying to generate auto model definition`);
        }

        if(!def || Constants.parser.forceAutoSwitches) {
            def = this._tryGetAutoDef(scenery);
        }
        
        if(def) {
            this._applySwitchFromDef(scenery, def);
        } else {
            SceneryParserLog.warn('switchAutoDefFailed', `Could not generate auto definition for switch ${this.id} with model "${this.bare_model}"`);
        }
    }

    _applySwitchFromDef(scenery, def) {
        const ids = this._getTrackIds(def[2]);
        if(!ids) return;
        
        this.def = def;

        const trackAAliases = [ids[0][0], ids[2][0]];
        this.trackA = this._createSwitchTrackFromDef(scenery, this.id+"A", def[0], ids[0][1], ids[2][1], def[3], def[5], trackAAliases);
        scenery.addObject(this.trackA);

        const trackBAliases = [ids[0][0], ids[2][0]].filter(alias => trackAAliases.includes(alias) === false);
        this.trackB = this._createSwitchTrackFromDef(scenery, this.id+"B", def[1], ids[1][1], ids[3][1], def[4], def[6], trackBAliases);
        this.trackB.hide_isolation = true; // hide isolation for the second track
        scenery.addObject(this.trackB);
    }

    _getTrackIds(outs) {
        const dataValues = this.data.split(",");
        const isCrossing = outs.length === 2;
        if(isCrossing) outs = [outs[0], outs[0], outs[1], outs[1]];

        return outs.map((out, index) => {
            const parts = dataValues[out]?.split(":");
            if(parts.length !== 3) {
                SceneryParserLog.warn('switchInvalidDataFormat', `Switch ${this.id} has invalid data: ${this.data}`);
                return null;
            }
            const trackId = parts[0].trim();
            let connectedId = parts[1].trim() || parts[2].trim() || null;
            if(isCrossing) connectedId = parts[index % 2 + 1].trim();

            return [trackId, connectedId];
        });
    }

    _createSwitchTrackFromDef(scenery, id, r, previd, nextid, startPos, endPos, aliases = []) {
        const rotRad = this.rot.multiply(Math.PI / 180);

        const trackObj = new PointTrack(
            id,
            this.pos.add(startPos.rotate(rotRad)),
            this.pos.add(endPos.rotate(rotRad)),
            r,
            nextid, 
            previd, 
            this.id_switch, 
            0, // start_slope
            0, // end_slope
            this.id_isolation, 
            this.track_prefab_name,
            this.maxspeed, 
            this.derailspeed
        );

        aliases.forEach(alias => {
            scenery.addTrackAlias(id, alias);
        });

        return trackObj;
    }

    _tryGetAutoDef(scenery) {
        const outs = Switch.autoGetOutsFromData(this.data);
        if(!outs) return null;

        const radiuses = Switch.autoGetRadiusesFromModel(this.bare_model);
        if(!radiuses) return null;
        const [ra, rb] = radiuses;

        const ids = this._getTrackIds(outs);
        if(!ids) return null;

        const trackPoints = ids.map(idsVal => 
            this._autoFindClosestTrackEnd(scenery, idsVal[1])
        );

        if(trackPoints.length !== 4 || trackPoints.some(point => !point)) return null;

        const rotRadNeg = this.rot.multiply(-Math.PI / 180);
        const transformedPoints = trackPoints.map(point => point.sub(this.pos).rotate(rotRadNeg).toPrecision(3));

        const newDef = [
            ra,
            rb,
            outs,
            ...transformedPoints
        ];

        if(!DefinedSwitches[this.bare_model]) DefinedSwitches[this.bare_model] = newDef;
        if(Constants.parser.logNewAutoSwitches) console.log(this.bare_model, newDef);
        return newDef;
    }

    static autoGetOutsFromData(data) {
        const tracks = data.split(",");

        if(tracks.length === 3) return [0, 1]; // Crossing

        if(tracks.length < 4) {
            SceneryParserLog.warn('switchInvalidDataFormat', `Switch data "${data}" is invalid, expected at least 4 tracks`);
            return null;
        }

        const outs = [];
        tracks.forEach((ct, i) => {
            const ctv = ct.split(":");
            outs.push(ctv[1] || ctv[2]);
        });

        return [
            0,
            outs[1] ? 1 : 0, // if no second track, use first track
            outs[2] ? 2 : (outs[3] ? 3 : 5), // if no third track, use fourth or sixth track
            outs[4] ? 4 : (outs[6] ? 6 : 3) // if no fourth track, use sixth or third track
        ];
    }

    static autoGetRadiusesFromModel(model) {
        const bareModel = (model.split(',')[0] || model).trim();
        if(/Rkp|Crossing/.test(bareModel)) return [0, 0];
        const right = bareModel.at(-1) === "R";
        const [prefix, rText] = bareModel.split("-");
        const r = parseFloat(rText) || 0;
        const [r1, r2] = rText.split('_').map(value => parseFloat(value || 0));

        switch(prefix) {
            case 'Rz 60E1':
                return [0, right ? -r : r];
            case 'Rld 60E1':
                return right ? [r1, -r2] : [-r1, r2];
            case 'Rlds 60E1':
                return [-r1, r2];
            case 'Rlj 60E1':
                return right ? [-r1, -r2] : [r1, r2];
            default:
                SceneryParserLog.warn('switchCannotResolveModel', `Switch model ${model} cannot be auto-resolved to radiuses`);
                return null;                
        }
    }

    _autoFindClosestTrackEnd(scenery, trackId) {
        if(!trackId) {
            SceneryParserLog.warn('switchInvalidTrackConnection', `Switch ${this.id}, trackId of one of the required connections is empty`);
            return null;
        }

        const track = scenery.getObject("tracks", trackId);

        if(!track) {
            SceneryParserLog.warn('switchInvalidTrackConnection', `Switch ${this.id}, track ${trackId} that the switch connects to not found`);
            return null;
        }

        return track.getCloserEndPos(this.pos);
    }
}
