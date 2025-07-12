import Vector3 from "../vector3";
import SwitchPrefabTrack, {SwitchTrackConnectionType} from "./switch-prefab-track";
import SceneryParserLog from "../scenery-parser-log";
import {TrackConnectionEnd} from "../track-connection";

export default class SwitchPrefab {
    tracks = {};

    constructor(tracks) {
        Object.assign(this, {
            tracks,
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
                            `In a switch  prefab the referenced internal track ${connection.internalId} in a connection of track ${internalId} not found`,
                        );
                        return;
                    }

                    const reverseConnection = otherTrack.connections.find(
                        (otherConnection) => otherConnection.type === SwitchTrackConnectionType.INTERNAL && otherConnection.internalId === internalId,
                    );
                    if (!reverseConnection) {
                        SceneryParserLog.warn(
                            'switchInvalidInternalConnection',
                            `In a switch prefab the internal track ${internalId} is connected to ${connection.internalId} but there is no reverse connection`,
                        );
                        return;
                    }

                    if (reverseConnection.end !== connection.otherEnd) {
                        SceneryParserLog.warn(
                            'switchInvalidInternalConnection',
                            `In a switch prefab the connection between tracks internal tracks ${internalId} and ${connection.internalId} has mismatched ends`,
                        );
                    }
                }
            });
        });
    }

    static fork(radiusA, radiusB, curveLength, addedLength) {
        const tracks = {
            start: new SwitchPrefabTrack(
                Vector3.zero(),
                Vector3.zero(),
                radiusA,
                0,
                [
                    {
                        type: SwitchTrackConnectionType.EXTERNAL,
                        end: TrackConnectionEnd.START,
                    },
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: TrackConnectionEnd.END,
                        otherEnd: TrackConnectionEnd.START,
                        internalId: 'curve_a',
                    },
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: TrackConnectionEnd.END,
                        otherEnd: TrackConnectionEnd.START,
                        internalId: 'curve_b',
                    },
                ],
            ),
            ...SwitchPrefab._createForkSwitchTracks(
                radiusA,
                curveLength,
                addedLength,
                'a',
            ),
            ...SwitchPrefab._createForkSwitchTracks(
                radiusB,
                curveLength,
                addedLength,
                'b',
            ),
        };

        return new SwitchPrefab(tracks);
    }

    static _createForkSwitchTracks(radius, curveLength, addedLength, side) {
        let curveEnd;
        let endAngle;
        if (radius === 0) {
            curveEnd = new Vector3(0, 0, curveLength);
            endAngle = 0;
        } else {
            const circleCenter = new Vector3(-radius, 0, 0);
            endAngle = -curveLength / radius;
            const centerToEnd = Vector3.fromAngleY(endAngle + Math.sign(radius) * Math.PI / 2, Math.abs(radius));
            curveEnd = circleCenter.add(centerToEnd);
        }

        const tracks = {
            [`curve_${side}`]: new SwitchPrefabTrack(
                Vector3.zero(),
                curveEnd,
                radius,
                side === 'a' ? 1 : 2,
                [
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: TrackConnectionEnd.START,
                        otherEnd: TrackConnectionEnd.END,
                        internalId: 'start',
                    },
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: TrackConnectionEnd.END,
                        otherEnd: TrackConnectionEnd.START,
                        internalId: addedLength > 0 ? `added_${side}` : `end_${side}`,
                    },
                ],
            ),
        };

        let end = curveEnd;
        if (addedLength > 0) {
            end = end.add(Vector3.fromAngleY(endAngle, addedLength));
            tracks[`added_${side}`] = new SwitchPrefabTrack(
                curveEnd,
                end,
                0,
                side === 'a' ? 3 : 4,
                [
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: TrackConnectionEnd.START,
                        otherEnd: TrackConnectionEnd.END,
                        internalId: `curve_${side}`,
                    },
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: TrackConnectionEnd.END,
                        otherEnd: TrackConnectionEnd.START,
                        internalId: `end_${side}`,
                    },
                ],
            );
        }

        tracks[`end_${side}`] = SwitchPrefabTrack.point(
            end,
            addedLength > 0 ?
                (side === 'a' ? 5 : 6) : // A fork switch with added length has the track A before B
                (side === 'a' ? 4 : 3), // and without any added length, track B before A,
            [
                {
                    type: SwitchTrackConnectionType.INTERNAL,
                    end: TrackConnectionEnd.START,
                    otherEnd: TrackConnectionEnd.END,
                    internalId: addedLength > 0 ? `added_${side}` : `curve_${side}`,
                },
                {
                    type: SwitchTrackConnectionType.EXTERNAL,
                    end: TrackConnectionEnd.END,
                },
            ]
        );

        return tracks;
    }

    static crossing(length, tangentInv) {
        const vectorA = Vector3.fromAngleY(Math.atan(1 / tangentInv / 2), length / 2);
        const vectorB = Vector3.fromAngleY(-Math.atan(1 / tangentInv / 2), length / 2);
        const tracks = {
            a: new SwitchPrefabTrack(
                vectorA.negate(),
                vectorA,
                0,
                0,
                [
                    {
                        type: SwitchTrackConnectionType.EXTERNAL,
                        end: TrackConnectionEnd.START,
                    },
                    {
                        type: SwitchTrackConnectionType.EXTERNAL,
                        end: TrackConnectionEnd.END,
                    },
                ],
            ),
            b: new SwitchPrefabTrack(
                vectorB.negate(),
                vectorB,
                0,
                1,
                [
                    {
                        type: SwitchTrackConnectionType.EXTERNAL,
                        end: TrackConnectionEnd.START,
                    },
                    {
                        type: SwitchTrackConnectionType.EXTERNAL,
                        end: TrackConnectionEnd.END,
                    },
                ],
            ),
        };

        return new SwitchPrefab(tracks);
    }
}
