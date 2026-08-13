import { ElectrificationResolutionStatus } from './electrification-status.js';
import DynamicGradientBoundsItem from './dynamic-gradient-bounds-item.js';

export default class Scenery
{
    objects = {};
    signalBoxes = [];
    spawnPoints = [];
    bounds = { minX: Infinity, minZ: Infinity, maxX: -Infinity, maxZ: -Infinity };
    dynamicGradientBounds = {
        elevation: new DynamicGradientBoundsItem(),
        slope: new DynamicGradientBoundsItem(true),
        maxspeed: new DynamicGradientBoundsItem(true)
    };
    electrificationResolved = ElectrificationResolutionStatus.NOT_RESOLVED;

    getName() {
        return this.objects.special?.SceneryInfo?.name || null;
    }

    getBounds () {
        return { ...this.bounds };
    }

    addSignalBox(signalBox) {
        this.signalBoxes.push(signalBox);
    }

    addSpawnPoint(trackObject) {
        this.spawnPoints.push(trackObject);
    }

    addObject(object) {
        const category = object.category || 'unk';
        if(!this.objects[category]) {
            this.objects[category] = {};
        }

        const id = object.category === 'special' ? object.type : object.id;
        this.objects[category][id] = object;

        if(object.getRenderBounds) {
            this._updateBounds(object.getRenderBounds());
        }
        if (object.category === 'tracks') {
            this._updateDynamicGradientBounds(object);
        }
    }

    applyObjects() {
        const categories_order = [
            'switches', 'routes',   // switches and routes create tracks
            'tracks',
            'track-objects',        // track objects might refer to tracks
        ];

        categories_order.forEach((category) => this._applyCategory(category));

        // Remaining categories
        Object.keys(this.objects).forEach(category => {
            if (categories_order.includes(category)) return;
            this._applyCategory(category);
        });
    }

    getMainSignalBox() {
        if(this.signalBoxes.length === 0) return null;

        const mainSignalBoxName = this.objects.special?.SceneryInfo?.['main_signalbox'];
        const foundMainSignalBox = this.signalBoxes.find(sb => sb.name === mainSignalBoxName);
        return foundMainSignalBox || this.signalBoxes[0];
    }

    _applyCategory(category) {
        if(!this.objects[category]) return;

        Object.values(this.objects[category]).forEach(object => {
            if (object.applyObject) {
                object.applyObject(this);
            }
        });
    }

    getObject(category, id) {
        if(!this.objects[category]) return null;
        return this.objects[category][id] ?? null;
    }

    _updateBounds(objBounds) {
        if(!objBounds || !Array.isArray(objBounds)) return;

        objBounds.forEach(point => {
            if (point.x < this.bounds.minX) this.bounds.minX = point.x;
            if (point.z < this.bounds.minZ) this.bounds.minZ = point.z;
            if (point.x > this.bounds.maxX) this.bounds.maxX = point.x;
            if (point.z > this.bounds.maxZ) this.bounds.maxZ = point.z;
        });
    }

    _updateDynamicGradientBounds(trackObject) {
        [trackObject.points.start, trackObject.points.end].forEach(point => {
            this.dynamicGradientBounds.elevation.update(point.y);
        })

        this.dynamicGradientBounds.maxspeed.update(trackObject.maxspeed);
        this.dynamicGradientBounds.slope.update(trackObject.start_slope);
        this.dynamicGradientBounds.slope.update(trackObject.end_slope);
    }
}
