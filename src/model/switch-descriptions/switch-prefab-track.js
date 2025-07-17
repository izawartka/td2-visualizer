import ShapeFactory from "../shape/shape-factory";
import CurveHelper from "../../helpers/curveHelper";

export const SwitchTrackConnectionType = {
    INTERNAL: Symbol('SwitchTrackConnectionType.INTERNAL'),
    EXTERNAL: Symbol('SwitchTrackConnectionType.EXTERNAL'),
};

export default class SwitchPrefabTrack {
    localStartPos;
    localRotationQuat;
    radius;
    length;
    dataIndex;
    connections;
    startSlope;
    endSlope;

    constructor(localStartPos, localRotationQuat, radius, length, startSlope, endSlope, dataIndex, connections = []) {
        Object.assign(this, {
            localStartPos,
            localRotationQuat,
            radius,
            length,
            startSlope,
            endSlope,
            dataIndex,
            connections,
        });
    }

    toShape(switchRotDeg, switchStart) {
        const { startPos, rotationRad } = CurveHelper.transformStart(switchStart, switchRotDeg, this.localStartPos, this.localRotationQuat);
        return ShapeFactory.fromArcDescription(rotationRad, startPos, this.radius, this.length, this.startSlope, this.endSlope);
    }
}
