import Vector3 from "../vector3";
import SwitchPrefabTrack, {SwitchTrackConnectionType} from "./switch-prefab-track";
import SceneryParserLog from "../scenery-parser-log";
import MiscHelper from "../../helpers/miscHelper";

export default class SwitchPrefab {
    tracks = {};
    isolation_id_offset;
    prefab_name;

    constructor(tracks, isolation_id_offset, prefab_name) {
        Object.assign(this, {
            tracks,
            isolation_id_offset,
            prefab_name,
        });
        this._verifyConnections();
    }

    _verifyConnections() {
        // TODO: Should SceneryParserLog be used here?
        Object.entries(this.tracks).forEach(([internalId, track]) => {
            track.connections.forEach((connection) => {
                if (connection.type === SwitchTrackConnectionType.INTERNAL) {
                    const otherTrack = this.tracks[connection.internalId];
                    if (!otherTrack) {
                        SceneryParserLog.warn(
                            'switchInvalidInternalConnection',
                            `In switch prefab ${this.prefab_name} the referenced internal track ${connection.internalId} in a connection of track ${internalId} not found`,
                        );
                        return;
                    }

                    const reverseConnections = otherTrack.connections.filter(
                        (otherConnection) => otherConnection.type === SwitchTrackConnectionType.INTERNAL && otherConnection.internalId === internalId,
                    );
                    if (reverseConnections.length === 0) {
                        SceneryParserLog.warn(
                            'switchInvalidInternalConnection',
                            `In switch prefab ${this.prefab_name} the internal track ${internalId} is connected to ${connection.internalId} but there is no reverse connection`,
                        );
                    } else if (reverseConnections.length > 1) {
                        SceneryParserLog.warn(
                            'switchInvalidInternalConnection',
                            `In switch prefab ${this.prefab_name} the internal track ${connection.internalId} is connected to ${internalId} multiple times`,
                        );
                    }
                }
            });
        });
    }

    static _calculateCurveEnd(startPos, startAngle, radius, curveLength) {
        if (radius === 0) {
            return { endPos: Vector3.fromAngleY(startAngle, curveLength), endAngle: startAngle };
        }
        const centerToStart = Vector3.fromAngleY(startAngle + Math.sign(radius) * Math.PI / 2, Math.abs(radius));
        const circleCenter = startPos.add(centerToStart.negate());
        const endAngle = startAngle -curveLength / radius;
        const centerToEnd = Vector3.fromAngleY(endAngle + Math.sign(radius) * Math.PI / 2, Math.abs(radius));
        const endPos = circleCenter.add(centerToEnd);
        return { endPos, endAngle };
    }

    static parseExported(prefabName, def) {
        const tracks = MiscHelper.mapObject(def.tracks, (exportedTrack) => {
            const startPos = exportedTrack.pos;
            const startToEnd = SwitchPrefab._calculateCurveEnd(Vector3.zero(), 0 , exportedTrack.radius, exportedTrack.length).endPos;
            const endPos = startPos.add(startToEnd.rotateByQuaternion(exportedTrack.rot));
            return new SwitchPrefabTrack(startPos, endPos, exportedTrack.radius, exportedTrack.dataIndex, exportedTrack.connections);
        });

        const isolationIdOffset = prefabName.startsWith("Rkp") || prefabName.startsWith("Crossing")
            ? Vector3.zero() : new Vector3(0, 0, 6);

        return new SwitchPrefab(tracks, isolationIdOffset, prefabName);
    }
}
