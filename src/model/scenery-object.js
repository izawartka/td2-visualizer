export default class SceneryObject {
    id;
    x;
    y;
    z;
    rx;
    ry;
    rz;

    constructor(id, x, y, z, rx, ry, rz) {
        Object.assign(this, {
            id, 
            x, y, z,
            rx, ry, rz
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