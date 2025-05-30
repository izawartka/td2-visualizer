export default class SceneryObject {
    id;
    x;
    y;
    z;

    constructor(id, x, y, z) {
        Object.assign(this, {
            id, x, y, z
        });
    }

    static fromText(text) {
        console.error("SceneryObject.fromText not implemented");
        return null;
    }

    applyObject(scenery) {
        
    }

    getRenderBounds() {
        return [
            { x: this.x, z: this.z }
        ];
    }
}