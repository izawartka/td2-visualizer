import Switch from './switch';
import StandardTrack from './standard-track';
import BezierTrack from './bezier-track';
import TrackObject from './track-object';
import Signal from './signal';

export default class Scenery
{
    objects = {};
    bounds = { minX: Infinity, minZ: Infinity, maxX: -Infinity, maxZ: -Infinity };

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

    static _parseObject(text) {
        const type = text.split(";", 2)[0];
        switch(type) {
            case 'Track':
                return Scenery._parseTrack(text);
            case 'TrackStructure':
                return Switch.fromText(text);
            case 'TrackObject':
                return Scenery._parseTrackObject(text);
            default:
                console.warn(`Unknown object type: ${type}`);
                return null;
        };
    }

    static _parseTrack(text) {
        /// TODO: remove
        const values = text.split(";");
        if(values.includes("none-slp,trans-mat,trans-mat")) return null; // skip invisible tracks

        const trackType = text.split(';', 4)[2];
        switch(trackType) {
            case 'Track':
                return StandardTrack.fromText(text);
            case 'BTrack':
                return BezierTrack.fromText(text);
            default:
                console.warn(`Unknown track type: ${trackType}`);
                return null;
        }
    }

    static _parseTrackObject(text) {
        const prefabName = text.split(";", 4)[2];
        switch(prefabName) {
            default:
                return TrackObject.fromText(text);
        if(Signal.isSignal(text)) {
            return Signal.fromText(text);
        } else {
            return TrackObject.fromText(text);
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