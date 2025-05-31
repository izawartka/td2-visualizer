export default class SceneryObject {
    id;
    pos;
    rot;

    constructor(id, pos, rot) {
        Object.assign(this, {
            id, 
            pos,
            rot
        });
    }

    static fromText(text) {
        console.error("SceneryObject.fromText not implemented");
        return null;
    }

    applyObject(scenery) {
        
    }

    getRenderBounds() {
        return this.pos;
    }
}