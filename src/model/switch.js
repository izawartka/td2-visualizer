import PointTrack from "./tracks/point-track.js";
import SceneryObject from "./scenery-object.js";
import SceneryParserLog from "./scenery-parser-log.js";
import Vector3 from "./vector3.js";
import DefinedSwitches from "./defs/defined-switches.js";
import {SwitchTrackConnectionEnd, SwitchTrackConnectionType} from "./switch-descriptions/switch-prefab-track";

export default class Switch extends SceneryObject {
    model;
    bare_model;
    data;
    id_isolation;
    id_switch;
    maxspeed;
    derailspeed;
    category = "switches";
    type = "Switch";
    applied = false;
    track_prefab_name;
    tracks = [];
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

        if (!def) {
            SceneryParserLog.warn('switchUndefinedModel', `Switch ${this.id} has an undefined model "${this.bare_model}"`);
            return;
        }

        this._applySwitchFromDef(scenery, def);
    }

    _applySwitchFromDef(scenery, def) {
        const trackIds = this._getTrackIds();
        if (!trackIds) return;

        const tracks = Object.entries(def.tracks).map(([key, track]) => {
            return this._createSwitchTrackFromDef(scenery, def, track, trackIds)
        });

        if (tracks.some(track => !track)) return;

        this.tracks = tracks;
        this.def = def;
    }

    _getTrackIds() {
        const ids = this.data
            .split(",")
            .filter(part => part.trim() !== '')
            .map(
                (value) => value.split(":").map((part) => part.trim()),
            );
        if (ids.some((part) => part.length !== 3)) {
            SceneryParserLog.warn('switchInvalidDataFormat', `Switch ${this.id} has invalid data: ${this.data}`);
        }
        return ids;
    }

    _createSwitchTrackFromDef(scenery, switchDef, trackDef, ids) {
        const rotRad = this.rot.multiply(Math.PI / 180);
        if (trackDef.dataIndex >= ids.length) {
            SceneryParserLog.warn(
                'switchMissingTrackId',
                `Switch ${this.id} with model ${this.bare_model} is missing an id for the track at index ${trackDef.dataIndex}`,
            );
            return null;
        }
        const [trackId, prevId, nextId] = ids[trackDef.dataIndex];

        const endIds = {
            [SwitchTrackConnectionEnd.PREV]: [],
            [SwitchTrackConnectionEnd.NEXT]: [],
        };
        trackDef.connections.forEach((connection) => {
            if (connection.type === SwitchTrackConnectionType.INTERNAL) {
                const otherTrackDef = switchDef.tracks[connection.internalId];
                if (!otherTrackDef) {
                    SceneryParserLog.warn(
                        'switchMissingTrackId',
                        `Switch prefab for model with model ${this.bare_model} of track ${this.id} does not have the internal track ${connection.internalId}`,
                    );
                    return;
                }
                if (otherTrackDef.dataIndex >= ids.length) {
                    SceneryParserLog.warn(
                        'switchMissingTrackId',
                        `Switch ${this.id} with model ${this.bare_model} is missing an id for the track at index ${otherTrackDef.dataIndex}`,
                    );
                    return;
                }
                const otherTrackId = ids[otherTrackDef.dataIndex][0];
                if (otherTrackId) {
                    endIds[connection.end].push(otherTrackId);
                }
            } else if (connection.type === SwitchTrackConnectionType.EXTERNAL) {
                const otherTrackId = connection.end === SwitchTrackConnectionEnd.PREV ? prevId : nextId;
                if (otherTrackId) {
                    endIds[connection.end].push(otherTrackId);
                }
            }
        });

        const trackObj = new PointTrack(
            trackId,
            this.pos.add(trackDef.startPos.rotate(rotRad)),
            this.pos.add(trackDef.endPos.rotate(rotRad)),
            trackDef.radius,
            endIds[SwitchTrackConnectionEnd.PREV][0], // TODO: Pass the array
            endIds[SwitchTrackConnectionEnd.NEXT][0], // TODO: --||--
            this.id_switch,
            0, // start_slope
            0, // end_slope
            this.id_isolation,
            this.track_prefab_name,
            this.maxspeed,
            this.derailspeed
        );

        trackObj.switch = this;
        scenery.addObject(trackObj);
        scenery.addTrackAlias(trackId, trackId);

        return trackObj;
    }
}
