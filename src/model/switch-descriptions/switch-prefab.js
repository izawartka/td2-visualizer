import Vector3 from "../vector3";
import SwitchPrefabTrack, {SwitchTrackConnectionType} from "./switch-prefab-track";
import SceneryParserLog from "../scenery-parser-log";
import {TrackConnectionEnd} from "../track-connection";
import CurveHelper from "../../helpers/curveHelper";

export default class SwitchPrefab {
    tracks = {};
    isolation_id_offset;

    constructor(tracks, isolation_id_offset) {
        Object.assign(this, {
            tracks,
            isolation_id_offset,
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

    static fork(radiusA, radiusB, curveLength, addedLength = 0.0) {
        const startTrack = SwitchPrefabTrack.point('start', 0, 0, Vector3.zero(), [
            {
                type: SwitchTrackConnectionType.EXTERNAL,
                end: TrackConnectionEnd.START,
            },
        ]);

        const tracks = SwitchPrefab._joinTrackList([
            startTrack,
            ...SwitchPrefab._createForkSwitchTracks(
                startTrack,
                radiusA,
                curveLength,
                addedLength,
                'a',
            ),
            ...SwitchPrefab._createForkSwitchTracks(
                startTrack,
                radiusB,
                curveLength,
                addedLength,
                'b',
            ),
        ]);

        const midpointA = CurveHelper.calculateCurveEnd(Vector3.zero(), 0, radiusA, curveLength / 2).endPos;
        const midpointB = CurveHelper.calculateCurveEnd(Vector3.zero(), 0, radiusB, curveLength / 2).endPos;
        const isolationIdOffset = midpointA.lerp(midpointB, 0.5);
        return new SwitchPrefab(tracks, isolationIdOffset);
    }

    static _createForkSwitchTracks(startPrefab, radius, curveLength, addedLength, side) {
        const sideTracks = [
            startPrefab.extend(`curve_${side}`, side === 'a' ? 1 : 2, curveLength, radius),
        ];

        if (addedLength > 0) {
            sideTracks.push(sideTracks[sideTracks.length - 1].extend(
                `added_${side}`,
                side === 'a' ? 3 : 4,
                addedLength,
                0,
            ));
        }

        sideTracks.push(sideTracks[sideTracks.length - 1].extend(
            `end_${side}`,
            addedLength > 0 ?
                (side === 'a' ? 5 : 6) : // A fork switch with added length has the track A before B
                (side === 'a' ? 4 : 3),  // and without any added length, track B before A,
            0,
            0,
            [
                {
                    type: SwitchTrackConnectionType.EXTERNAL,
                    end: TrackConnectionEnd.END,
                },
            ],
        ));

        return sideTracks;
    }

    static crossing(length, tangentInv) {
        const angleA = Math.atan(1 / tangentInv / 2);
        const angleB = -angleA;
        const tracks = SwitchPrefab._joinTrackList([
            SwitchPrefabTrack.straight(
                'a',
                0,
                angleA,
                Vector3.zero(),
                length,
                -length/2,
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
            SwitchPrefabTrack.straight(
                'b',
                1,
                angleB,
                Vector3.zero(),
                length,
                -length/2,
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
        ]);

        return new SwitchPrefab(tracks, Vector3.zero());
    }

    static slip(totalLength, outerLength, transitionLength, radius, tangentInv, leftSlipEnabled, rightSlipEnabled) {
        const aAngle = Math.atan(1 / tangentInv / 2);
        const bAngle = -aAngle;

        const tracks = {};
        const addTrack = (track) => {
            tracks[track.id] = track;
        };

        let dataIndex = 0;
        const outerTrack = (angle, name) => {
            addTrack(SwitchPrefabTrack.straight(
                `outer_${name}`,
                dataIndex++,
                angle,
                Vector3.zero(),
                outerLength,
                -(totalLength / 2),
                [
                    {
                        type: SwitchTrackConnectionType.EXTERNAL,
                        end: TrackConnectionEnd.START,
                    },
                ],
            ));
        };
        const transitionTrack = (name) => {
            addTrack(tracks[`outer_${name}`].extend(
                `transition_${name}`,
                dataIndex++,
                transitionLength,
            ));
        };
        const slipTransitionTrack = (name, radiusSign) => {
            addTrack(tracks[`outer_${name}`].extend(
                `slip_transition_${name}`,
                dataIndex++,
                transitionLength,
                radius * radiusSign,
            ));
        };
        const crossingTrack = (path) => {
            const previous = tracks[`transition_${path}_enter`];
            const next = tracks[`transition_${path}_exit`];
            const track = SwitchPrefabTrack.rawStraight(
                `crossing_${path}`,
                dataIndex++,
                previous.endAngle,
                previous.endPos,
                next.endPos,
            );
            SwitchPrefabTrack.connect(previous, track);
            SwitchPrefabTrack.connect(track, next, TrackConnectionEnd.END, TrackConnectionEnd.END);
            addTrack(track);
        };
        const sideTrack = (enterPath, exitPath, side, slipEnabled) => {
            let enter, exit, track;
            if (slipEnabled) {
                enter = tracks[`slip_transition_${enterPath}_enter`];
                exit = tracks[`slip_transition_${exitPath}_exit`];
                track = SwitchPrefabTrack.rawArc(
                    `side_${side}`,
                    dataIndex++,
                    enter.endAngle,
                    enter.endPos,
                    exit.endAngle + Math.PI,
                    exit.endPos,
                    enter.circleCenter,
                    enter.radius,
                    0, // TODO
                );
            } else {
                enter = tracks[`transition_${enterPath}_enter`];
                exit = tracks[`transition_${exitPath}_exit`];
                track = SwitchPrefabTrack.rawStraight(
                    `side_${side}`,
                    dataIndex++,
                    0,
                    enter.endPos,
                    exit.endPos,
                );
            }
            SwitchPrefabTrack.connect(enter, track);
            SwitchPrefabTrack.connect(track, exit, TrackConnectionEnd.END, TrackConnectionEnd.END);
            addTrack(track);
        };

        // the order is important, each function call increments dataIndex
        outerTrack(aAngle,'a_enter');
        outerTrack(bAngle, 'b_enter');
        outerTrack(aAngle + Math.PI, 'a_exit');
        outerTrack(bAngle + Math.PI, 'b_exit');
        transitionTrack('a_enter');
        transitionTrack('b_enter');
        if (leftSlipEnabled) {
            slipTransitionTrack('a_enter', 1);
        }
        if (rightSlipEnabled) {
            slipTransitionTrack('b_enter', -1);
        }
        const innerIndexesStart = dataIndex;
        dataIndex += 4;
        transitionTrack('a_exit');
        transitionTrack('b_exit');
        if (rightSlipEnabled) {
            slipTransitionTrack('a_exit', 1);
        }
        if (leftSlipEnabled) {
            slipTransitionTrack('b_exit', -1);
        }

        dataIndex = innerIndexesStart;
        crossingTrack('a');
        crossingTrack('b');
        sideTrack('a', 'b', 'left', leftSlipEnabled);
        sideTrack('b', 'a', 'right', rightSlipEnabled);

        return new SwitchPrefab(tracks, Vector3.zero());
    }

    static _joinTrackList(list) {
        return Object.fromEntries(list.map((track) => [track.id, track]));
    }
}
