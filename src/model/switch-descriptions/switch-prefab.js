import Vector3 from "../vector3";
import SwitchPrefabTrack, {SwitchTrackConnectionEnd, SwitchTrackConnectionType} from "./switch-prefab-track";
import SceneryParserLog from "../scenery-parser-log";

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
                            `In a switch prefab the internal track ${internalId} is connected to ${connection.internalId} but there is not reverse connection`,
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
                        end: SwitchTrackConnectionEnd.PREV,
                    },
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: SwitchTrackConnectionEnd.NEXT,
                        otherEnd: SwitchTrackConnectionEnd.PREV,
                        internalId: 'curve_a',
                    },
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: SwitchTrackConnectionEnd.NEXT,
                        otherEnd: SwitchTrackConnectionEnd.PREV,
                        internalId: 'curve_b',
                    },
                ],
            ),
            ...SwitchPrefab._createSwitchTracks(
                radiusA,
                curveLength,
                addedLength,
                'a',
            ),
            ...SwitchPrefab._createSwitchTracks(
                radiusB,
                curveLength,
                addedLength,
                'b',
            ),
        };

        return new SwitchPrefab(tracks);
    }

    static _createSwitchTracks(radius, curveLength, addedLength, side) {
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
                        end: SwitchTrackConnectionEnd.PREV,
                        otherEnd: SwitchTrackConnectionEnd.NEXT,
                        internalId: 'start',
                    },
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: SwitchTrackConnectionEnd.NEXT,
                        otherEnd: SwitchTrackConnectionEnd.PREV,
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
                        end: SwitchTrackConnectionEnd.PREV,
                        otherEnd: SwitchTrackConnectionEnd.NEXT,
                        internalId: `curve_${side}`,
                    },
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: SwitchTrackConnectionEnd.NEXT,
                        otherEnd: SwitchTrackConnectionEnd.PREV,
                        internalId: `end_${side}`,
                    },
                ],
            );
        }

        tracks[`end_${side}`] = SwitchPrefabTrack.point(
            end,
            addedLength > 0 ?
                (side === 'a' ? 5 : 6) :
                (side === 'a' ? 3 : 4),
            [
                {
                    type: SwitchTrackConnectionType.INTERNAL,
                    end: SwitchTrackConnectionEnd.PREV,
                    otherEnd: SwitchTrackConnectionEnd.NEXT,
                    internalId: addedLength > 0 ? `added_${side}` : `curve_${side}`,
                },
                {
                    type: SwitchTrackConnectionType.EXTERNAL,
                    end: SwitchTrackConnectionEnd.NEXT,
                },
            ]
        );

        return tracks;
    }
}
