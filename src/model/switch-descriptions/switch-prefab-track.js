import ShapeFactory from "../shape/shape-factory";

export const SwitchTrackConnectionType = {
    INTERNAL: Symbol('SwitchTrackConnectionType.INTERNAL'),
    EXTERNAL: Symbol('SwitchTrackConnectionType.EXTERNAL'),
};

export default class SwitchPrefabTrack {
    startPos;
    endPos;
    radius;
    dataIndex;
    connections;

    constructor(startPos, endPos, radius, dataIndex, connections = []) {
        Object.assign(this, {
            startPos,
            endPos,
            radius,
            dataIndex,
            connections,
        });
    }

    toShape(switchRotDeg, switchStart) {
        return ShapeFactory.betweenPoints(switchRotDeg, switchStart, this.startPos, this.endPos, this.radius);
    }

    static point(pos, dataIndex, connections = []) {
        return new SwitchPrefabTrack(
            pos,
            pos,
            0,
            dataIndex,
            connections,
        );
    }
}
