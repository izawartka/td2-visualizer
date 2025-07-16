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
        throw new Error("fromText() must be implemented in subclass");
    }

    applyObject(scenery) {
        
    }

    getRenderBounds() {
        return [this.pos];
    }
}