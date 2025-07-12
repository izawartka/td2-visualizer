import Vector3 from "../vector3";
import {TrackConnectionEnd} from "../track-connection";
import CurveHelper from "../../helpers/curveHelper";

export const SwitchTrackConnectionType = {
    INTERNAL: Symbol('SwitchTrackConnectionType.INTERNAL'),
    EXTERNAL: Symbol('SwitchTrackConnectionType.EXTERNAL'),
};

export default class SwitchPrefabTrack {
    id;
    dataIndex;
    startAngle;
    startPos;
    endAngle;
    endPos;
    radius;
    connections;

    constructor(id, dataIndex, startAngle, startPos, endAngle, endPos, radius, connections = []) {
        Object.assign(this, {
            id,
            dataIndex,
            startAngle,
            startPos,
            endAngle,
            endPos,
            radius,
            connections: [...connections],
        });
    }

    static connect(prev, next, prevEnd = TrackConnectionEnd.END, nextEnd = TrackConnectionEnd.START) {
        prev.connections.push({
            type: SwitchTrackConnectionType.INTERNAL,
            end: prevEnd,
            otherEnd: nextEnd,
            internalId: next.id,
        });
        next.connections.push({
            type: SwitchTrackConnectionType.INTERNAL,
            end: nextEnd,
            otherEnd: prevEnd,
            internalId: prev.id,
        });
    }

    extend(id, dataIndex, length, radius = 0, connections = []) {
        const { endPos, endAngle } = CurveHelper.calculateCurveEnd(this.endPos, this.endAngle, radius, length);
        const newTrack = new SwitchPrefabTrack(
            id,
            dataIndex,
            this.endAngle,
            this.endPos,
            endAngle,
            endPos,
            radius,
            [...connections],
        );
        SwitchPrefabTrack.connect(this, newTrack);
        return newTrack;
    }

    static straight(id, dataIndex, angle, startPos, length, startOffset, connections = []) {
        const unitVector = Vector3.fromAngleY(angle);
        return new SwitchPrefabTrack(
            id,
            dataIndex,
            angle,
            startPos.add(unitVector.multiply(startOffset)),
            angle,
            startPos.add(unitVector.multiply(startOffset + length)),
            0,
            [...connections],
        );
    }

    static point(id,  dataIndex, angle, pos,connections = []) {
        return new SwitchPrefabTrack(id, dataIndex, angle, pos, angle, pos, 0, connections);
    }
}
