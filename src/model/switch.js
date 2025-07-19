import PointTrack from "./tracks/point-track.js";
import SceneryObject from "./scenery-object.js";
import SceneryParserLog from "./scenery-parser-log.js";
import Vector3 from "./vector3.js";
import {DefinedSwitches, SwitchTrackConnectionType} from "./defs/defined-switches.js";
import TrackConnection, {TrackConnectionEnd} from "./track-connection";
import CurveHelper from "../helpers/curveHelper";
import AngleHelper from "../helpers/angleHelper";

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
    isolation_id_pos = null;

    constructor(id, model, pos, rot, data, id_isolation, id_switch, maxspeed, derailspeed, track_prefab_name) {
        super(id, pos, rot);
        Object.assign(this, {
            model,
            data,
            id_switch,
            id_isolation,
            maxspeed,
            derailspeed,
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

        const def = DefinedSwitches[this.bare_model] || null;

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
            return this._createSwitchTrackFromDef(scenery, def, track, trackIds);
        });

        if (tracks.some(track => !track)) return;

        this.tracks = tracks;
        this.def = def;

        const rotRad = AngleHelper.rotationDegToRad(this.rot);
        this.isolation_id_pos = this.pos.add(def.isolationLabelPos.rotate(rotRad));
        super.applyObject(scenery);
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

    _createTrackConnections(switchDef, trackDef, ids) {
        const connections = [];
        const [_, prevId, nextId] = ids[trackDef.dataIndex];
        trackDef.connections.forEach((connection) => {
            if (connection.type === SwitchTrackConnectionType.INTERNAL) {
                const otherTrackDef = switchDef.tracks[connection.internalId];
                if (!otherTrackDef) {
                    SceneryParserLog.warn(
                        'switchMissingTrackId',
                        `Switch ${this.id} with model ${this.bare_model} does not have the internal track ${connection.internalId}`,
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
                    connections.push(new TrackConnection(otherTrackId, connection.end));
                }
            } else if (connection.type === SwitchTrackConnectionType.EXTERNAL) {
                const otherTrackId = connection.end === TrackConnectionEnd.START ? prevId : nextId;
                if (otherTrackId) {
                    connections.push(new TrackConnection(otherTrackId, connection.end));
                }
            }
        });
        return connections;
    }

    _createSwitchTrackFromDef(scenery, switchDef, trackDef, ids) {
        const rotRad = AngleHelper.rotationDegToRad(this.rot);
        if (trackDef.dataIndex >= ids.length) {
            SceneryParserLog.warn(
                'switchMissingTrackId',
                `Switch ${this.id} with model ${this.bare_model} is missing an id for the track at index ${trackDef.dataIndex}`,
            );
            return null;
        }
        const trackId = ids[trackDef.dataIndex][0];
        const connections = this._createTrackConnections(switchDef, trackDef, ids);

        const localEndPos = CurveHelper
            .calculateCurveEndStandard(trackDef.radius, trackDef.length)
            .endPos
            .rotateByQuaternion(trackDef.rot)
            .add(trackDef.pos);

        const trackObj = new PointTrack(
            trackId,
            this.pos.add(trackDef.pos.rotate(rotRad)),
            this.pos.add(localEndPos.rotate(rotRad)),
            trackDef.radius,
            connections,
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

        return trackObj;
    }
}
