import Vector3 from "../vector3";
import SwitchPrefabTrack, {SwitchTrackConnectionType} from "./switch-prefab-track";
import SceneryParserLog from "../scenery-parser-log";
import {otherEnd, TrackConnectionEnd} from "../track-connection";
import Quaternion from "../quaternion";

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

    static _exportedConnection(end, ownId, otherId) {
        // Ignore connections to self, TD2 has them in Rkp switches
        if (ownId === otherId) return [];

        if (otherId === null) return [{
            type: SwitchTrackConnectionType.EXTERNAL,
            end,
        }];

        return [{
            type: SwitchTrackConnectionType.INTERNAL,
            end,
            internalId: otherId,
        }]
    }

    static _addMissingConnections(tracks, prefabName) {
        let addedMissing = 0;
        let foundExternal = 0;

        Object.entries(tracks).forEach(([internalId, track]) => {
            track.connections.forEach((connection) => {
                if (connection.type === SwitchTrackConnectionType.EXTERNAL) ++foundExternal;
                if (connection.type !== SwitchTrackConnectionType.INTERNAL) return;
                const otherTrack = tracks[connection.internalId];
                if (!otherTrack) {
                    SceneryParserLog.warn(
                        'switchInvalidInternalConnection',
                        `In switch prefab ${prefabName} the referenced internal track ${connection.internalId} in a connection of track ${internalId} not found`,
                    );
                    return;
                }
                const hasReverseConnection = otherTrack.connections.some(
                    (reverseConnection) => reverseConnection.type === SwitchTrackConnectionType.INTERNAL && reverseConnection.internalId === internalId,
                );
                if (!hasReverseConnection) {
                    ++addedMissing;
                    otherTrack.connections.push({
                        type: SwitchTrackConnectionType.INTERNAL,
                        internalId,

                        // This is a heuristic, it is correct for all existing prefabs
                        end: otherEnd(connection.end),
                    });
                }
            });
        });

        let expectedMissing = 1;
        let expectedExternal = 3;

        if (prefabName.startsWith("Crossing")) {
            expectedMissing = 0;
            expectedExternal = 4;
        } else if (prefabName.startsWith("Rkpd ")) {
            expectedMissing = 4;
            expectedExternal = 4;
        } else if (prefabName.startsWith("Rkp ")) {
            expectedMissing = 2;
            expectedExternal = 4;
        }

        if (addedMissing !== expectedMissing) {
            SceneryParserLog.warn("switchInvalidInternalConnection",
                `In switch prefab ${prefabName} expected to add ${expectedMissing} internal connections but added ${addedMissing}`,
            );
        }
        if (foundExternal !== expectedExternal) {
            SceneryParserLog.warn("switchInvalidInternalConnection",
                `In switch prefab ${prefabName} expected to find ${expectedExternal} external connections but found ${foundExternal}`,
            );
        }
    }

    static parseExported(prefabName, exportedTracks) {
        const trackList = exportedTracks.map((exportedTrack, index) => {
            const rotationQuat = new Quaternion(exportedTrack.rotation.x, exportedTrack.rotation.y, exportedTrack.rotation.z, exportedTrack.rotation.w);
            const startPos = new Vector3(exportedTrack.position.x, exportedTrack.position.y, exportedTrack.position.z);
            const startToEnd = SwitchPrefab._calculateCurveEnd(Vector3.zero(), 0 , exportedTrack.shape.radius, exportedTrack.shape.length).endPos;
            const endPos = startPos.add(startToEnd.rotateByQuaternion(rotationQuat));
            let radius = exportedTrack.shape.radius;
            if (exportedTrack.mirror_x) {
                startPos.x = -startPos.x;
                endPos.x = -endPos.x;
                radius = -radius;
            }

            const connections = [
                ...SwitchPrefab._exportedConnection(TrackConnectionEnd.START, exportedTrack.id, exportedTrack.prev_id),
                ...SwitchPrefab._exportedConnection(TrackConnectionEnd.END, exportedTrack.id, exportedTrack.next_id),
            ];

            return [
                exportedTrack.id,
                new SwitchPrefabTrack(startPos, endPos, radius, index, connections),
            ];
        });
        const tracks = Object.fromEntries(trackList);
        SwitchPrefab._addMissingConnections(tracks, prefabName);

        const isolationIdOffset = prefabName.startsWith("Rkp") || prefabName.startsWith("Crossing")
            ? Vector3.zero() : new Vector3(0, 0, 6);

        return new SwitchPrefab(tracks, isolationIdOffset, prefabName);
    }
}
