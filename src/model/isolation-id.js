import SceneryObject from "./scenery-object";
import Vector3 from "./vector3";

export default class IsolationId extends SceneryObject {
    category = "isolation-ids";
    type = "IsolationId";
    id_isolation;

    constructor(object_type, object_id, pos, id_isolation) {
        super(`${object_type}:${object_id}`, pos, Vector3.zero());
        Object.assign(this, {
            id_isolation,
        });
    }
}
