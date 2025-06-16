import SceneryParserLog from './scenery-parser-log.js';

export default class Scenery
{
    sceneryInfo = null; // SceneryInfo object
    objects = {};
    signalBoxes = [];
    spawnSignals = [];
    bounds = { minX: Infinity, minZ: Infinity, maxX: -Infinity, maxZ: -Infinity };
    trackAliases = {};
    static nextMiscId = 1;

    getBounds () {
        return { ...this.bounds };
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