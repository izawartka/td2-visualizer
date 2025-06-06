import Switch from './switch';
import StandardTrack from './standard-track';
import BezierTrack from './bezier-track';
import TrackObject from './track-object';
import Signal from './signal';
import Route from './route';
import Misc from './misc';
import SceneryParserLog from './scenery-parser-log';
import SignalBox from './signalbox';

export default class Scenery
{
    objects = {};
    signalBoxes = [];
    spawnSignals = [];
    bounds = { minX: Infinity, minZ: Infinity, maxX: -Infinity, maxZ: -Infinity };
    trackAliases = {};
    static nextMiscId = 1;

    getBounds () {
        return { ...this.bounds };
    }

    static fromText(scText) {
        const lines = scText.split("\n").map(line => line.trim());
        const scenery = new Scenery();

        lines.forEach(line => {
            if(!line?.length) return; 
            const object = Scenery._parseObject(line);
            if(!object) return; // skip null objects
            scenery.addObject(object);
        });

        scenery.applyObjects();
        console.log(scenery);

        return scenery;
    }

    addSignalBox(signalBox) {
        this.signalBoxes.push(signalBox);
    }

    addSpawnSignal(signal) {
        this.spawnSignals.push(signal);
    }

    addObject(object) {
        const category = object.category || 'misc';
        if(!this.objects[category]) {
            this.objects[category] = {};
        }

        this.objects[category][object.id] = object;

        if(object.getRenderBounds) {
            this._updateBounds(object.getRenderBounds());
        }
    }
    
    applyObjects() {
        Object.keys(this.objects).forEach(category => {
            Object.values(this.objects[category]).forEach(object => {
                if(object.applyObject) {
                    object.applyObject(this);
                }
            });
        });
    }

    getObject(category, id) {
        if(!this.objects[category]) return null;
        return this.objects[category][id] ?? null;
    }

    addTrackAlias(id, alias) {
        if(this.trackAliases[alias]) {
            SceneryParserLog.warn('trackAliasAlreadyExists', `Track alias "${alias}" already exists for track "${this.trackAliases[alias]}". Cannot add alias for "${id}"`);
            return;
        }
        
        this.trackAliases[alias] = id;
    }

    getTrackIdByAlias(idOrAlias) {
        return this.trackAliases[idOrAlias] || idOrAlias;
    }

    static _parseObject(text) {
        const type = text.split(";", 2)[0];
        switch(type) {
            case 'Track':
                return Scenery._parseTrack(text);
            case 'TrackStructure':
                return Switch.fromText(text);
            case 'TrackObject':
                return Scenery._parseTrackObject(text);
            case 'Route':
                return Route.fromText(text);
            case 'Misc':
                return Scenery._parseMisc(text);
            case 'Empty':
            case 'EndRoute':
                return null;
            default:
                SceneryParserLog.warn('unknownObjectType', `Unknown object type: ${type}`);
                return null;
        };
    }

    static _parseTrack(text) {
        const trackType = text.split(';', 4)[2];
        switch(trackType) {
            case 'Track':
                return StandardTrack.fromText(text);
            case 'BTrack':
                return BezierTrack.fromText(text);
            default:
                SceneryParserLog.warn('unknownTrackType', `Unknown track type: ${trackType}`);
                return null;
        }
    }

    static _parseTrackObject(text) {
        if(Signal.isSignal(text)) {
            return Signal.fromText(text);
        } else {
            return TrackObject.fromText(text);
        }
    }

    static _parseMisc(text) {
        const prefabName = text.split(';', 4)[2];

        if(prefabName.startsWith("SignalBox")) {
            return SignalBox.fromText(Scenery.nextMiscId++, text);
        } else {
            return Misc.fromText(Scenery.nextMiscId++, text);
        }
    }

    _updateBounds(objBounds) {
        if(!objBounds || !Array.isArray(objBounds)) return;

        objBounds.forEach(point => {
            if(point.x < this.bounds.minX) this.bounds.minX = point.x;
            if(point.z < this.bounds.minZ) this.bounds.minZ = point.z;
            if(point.x > this.bounds.maxX) this.bounds.maxX = point.x;
            if(point.z > this.bounds.maxZ) this.bounds.maxZ = point.z;
        }
        );
    }
}