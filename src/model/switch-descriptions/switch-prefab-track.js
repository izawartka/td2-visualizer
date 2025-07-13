import Vector3 from "../vector3";
import {TrackConnectionEnd} from "../track-connection";
import CurveHelper from "../../helpers/curveHelper";
import ShapeFactory from "../shape/shape-factory";

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
    circleCenter;
    radius;
    connections;
    toShape;

    constructor(id, dataIndex, startAngle, startPos, endAngle, endPos, circleCenter, radius, connections, toShape) {
        Object.assign(this, {
            id,
            dataIndex,
            startAngle,
            startPos,
            endAngle,
            endPos,
            circleCenter,
            radius,
            connections: [...connections],
            toShape,
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

    static rawStraight(id, dataIndex, angle, startPos, endPos, connections = []) {
        const toShape = (switchRotDeg, switchStart) => {
            return ShapeFactory.rotatedStraight(switchRotDeg, switchStart, startPos, endPos, angle);
        };
        return new SwitchPrefabTrack(id, dataIndex, angle, startPos, angle, endPos, null, null, connections, toShape);
    }

    static rawArc(id, dataIndex, startAngle, startPos, endAngle, endPos, circleCenter, radius, length, connections = []) {
        if (!length) {
            length = CurveHelper.curveLength(startPos, endPos, radius);
        }
        const toShape = (switchRotDeg, switchStart) => {
            return ShapeFactory.rotatedArc(switchRotDeg, switchStart, startAngle, startPos, endAngle, endPos, circleCenter, radius, length);
        };
        return new SwitchPrefabTrack(id, dataIndex, startAngle, startPos, endAngle, endPos, circleCenter, radius, connections, toShape);
    }

    extend(id, dataIndex, length, radius = 0, connections = []) {
        let newTrack;
        if (radius === 0) {
            newTrack = SwitchPrefabTrack.rawStraight(
                id,
                dataIndex,
                this.endAngle,
                this.endPos,
                this.endPos.add(Vector3.fromAngleY(this.endAngle).multiply(length)),
                connections,
            );
        } else {
            const { endPos, endAngle, circleCenter } = CurveHelper.calculateCurveEnd(this.endPos, this.endAngle, radius, length);
            newTrack = SwitchPrefabTrack.rawArc(
                id,
                dataIndex,
                this.endAngle,
                this.endPos,
                endAngle,
                endPos,
                circleCenter,
                radius,
                length,
                connections,
            );
        }
        SwitchPrefabTrack.connect(this, newTrack);
        return newTrack;
    }

    static straight(id, dataIndex, angle, startPos, length, startOffset, connections = []) {
        const unitVector = Vector3.fromAngleY(angle);
        return SwitchPrefabTrack.rawStraight(
            id,
            dataIndex,
            angle,
            startPos.add(unitVector.multiply(startOffset)),
            startPos.add(unitVector.multiply(startOffset + length)),
            connections,
        );
    }

    static point(id,  dataIndex, angle, pos,connections = []) {
        return SwitchPrefabTrack.rawStraight(id, dataIndex, angle, pos, pos, connections);
    }
}
