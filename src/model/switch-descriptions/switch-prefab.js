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

    static fork(radiusA, radiusB, curveLength, addedLength = 0.0) {
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

    static _createForkSwitchTracks(radius, curveLength, addedLength, side) {
        const { endPos: curveEnd, endAngle } = SwitchPrefab._calculateCurveEnd(Vector3.zero(), 0, radius, curveLength);

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

    static slip(totalLength, outerLength, transitionLength, radius, tangentInv, leftSlipEnabled, rightSlipEnabled) {
        const aAngle = Math.atan(1 / tangentInv / 2);
        const bAngle = -aAngle;
        const unitVectorA = Vector3.fromAngleY(aAngle);
        const unitVectorB = Vector3.fromAngleY(bAngle);

        const outerStart = totalLength / 2;
        const transitionStart = outerStart - outerLength;
        const innerStart = transitionStart - transitionLength;

        const makeSlipConfig = (radiusSign, unitVector, startAngle) => {
            const startPos = unitVector.multiply(transitionStart);
            const slipRadius = radiusSign * radius;
            const { endPos } = SwitchPrefab._calculateCurveEnd(startPos, startAngle, slipRadius, transitionLength);
            return {
                startPos,
                slipRadius,
                endPos,
            };
        };
        const slipPoints = {
            a_enter: makeSlipConfig(1, unitVectorA.negate(), aAngle),
            a_exit: makeSlipConfig(1, unitVectorA, aAngle + Math.PI),
            b_enter: makeSlipConfig(-1, unitVectorB.negate(), bAngle),
            b_exit: makeSlipConfig(-1, unitVectorB, bAngle + Math.PI),
        };

        let dataIndex = 0;
        const outerTrack = (unitVector, name) => [
            `outer_${name}`,
            new SwitchPrefabTrack(
                unitVector.multiply(outerStart),
                unitVector.multiply(transitionStart),
                0,
                dataIndex++,
                [
                    {
                        type: SwitchTrackConnectionType.EXTERNAL,
                        end: TrackConnectionEnd.START,
                    },
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: TrackConnectionEnd.END,
                        otherEnd: TrackConnectionEnd.START,
                        internalId: `transition_${name}`,
                    },
                ],
            ),
        ];
        const transitionTrack = (unitVector, path, end) => [
            `transition_${path}_${end}`,
            new SwitchPrefabTrack(
                unitVector.multiply(transitionStart),
                unitVector.multiply(innerStart),
                0,
                dataIndex++,
                [
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: TrackConnectionEnd.START,
                        otherEnd: TrackConnectionEnd.END,
                        internalId: `outer_${path}_${end}`,
                    },
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: TrackConnectionEnd.END,
                        otherEnd: end === 'enter' ? TrackConnectionEnd.START : TrackConnectionEnd.END,
                        internalId: `crossing_${path}`,
                    },
                ],
            ),
        ];
        const slipTransitionTrack = (path, side, end) => {
            const { startPos, slipRadius, endPos } = slipPoints[`${path}_${end}`];
            return [
                `slip_transition_${path}_${end}`,
                new SwitchPrefabTrack(
                    startPos,
                    endPos,
                    slipRadius,
                    dataIndex++,
                    [
                        {
                            type: SwitchTrackConnectionType.INTERNAL,
                            end: TrackConnectionEnd.START,
                            otherEnd: TrackConnectionEnd.END,
                            internalId: `outer_${path}_${end}`,
                        },
                        {
                            type: SwitchTrackConnectionType.INTERNAL,
                            end: TrackConnectionEnd.END,
                            otherEnd: end === 'enter' ? TrackConnectionEnd.START : TrackConnectionEnd.END,
                            internalId: `side_${side}`,
                        },
                    ],
                ),
            ];
        };
        const crossingTrack = (unitVector, path) => [
            `crossing_${path}`,
            new SwitchPrefabTrack(
                unitVector.multiply(-innerStart),
                unitVector.multiply(innerStart),
                0,
                dataIndex++,
                [
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: TrackConnectionEnd.START,
                        otherEnd: TrackConnectionEnd.END,
                        internalId: `transition_${path}_enter`,
                    },
                    {
                        type: SwitchTrackConnectionType.INTERNAL,
                        end: TrackConnectionEnd.END,
                        otherEnd: TrackConnectionEnd.END,
                        internalId: `transition_${path}_exit`,
                    },
                ],
            ),
        ];
        const sideTrack = (unitVectorEnter, unitVectorExit, enterPath, exitPath, side, slipEnabled) => {
            if (slipEnabled) {
                const enterConfig = slipPoints[`${enterPath}_enter`];
                const exitConfig = slipPoints[`${exitPath}_exit`];
                return [
                    `side_${side}`,
                    new SwitchPrefabTrack(
                        enterConfig.endPos,
                        exitConfig.endPos,
                        enterConfig.slipRadius,
                        dataIndex++,
                        [
                            {
                                type: SwitchTrackConnectionType.INTERNAL,
                                end: TrackConnectionEnd.START,
                                otherEnd: TrackConnectionEnd.END,
                                internalId: `slip_transition_${enterPath}_enter`,
                            },
                            {
                                type: SwitchTrackConnectionType.INTERNAL,
                                end: TrackConnectionEnd.END,
                                otherEnd: TrackConnectionEnd.END,
                                internalId: `slip_transition_${exitPath}_exit`,
                            },
                        ]
                    ),
                ];
            } else {
                return [
                    `side_${side}`,
                    new SwitchPrefabTrack(
                        unitVectorEnter.multiply(innerStart),
                        unitVectorExit.multiply(innerStart),
                        0,
                        dataIndex++,
                        [
                            {
                                type: SwitchTrackConnectionType.INTERNAL,
                                end: TrackConnectionEnd.START,
                                otherEnd: TrackConnectionEnd.END,
                                internalId: `transition_${enterPath}_enter`,
                            },
                            {
                                type: SwitchTrackConnectionType.INTERNAL,
                                end: TrackConnectionEnd.END,
                                otherEnd: TrackConnectionEnd.END,
                                internalId: `transition_${exitPath}_exit`,
                            },
                        ]
                    ),
                ];
            }
        };

        // the order is important, each function call increments dataIndex
        const trackList = [
            outerTrack(unitVectorA.negate(), 'a_enter'),
            outerTrack(unitVectorB.negate(), 'b_enter'),
            outerTrack(unitVectorA, 'a_exit'),
            outerTrack(unitVectorB, 'b_exit'),
            transitionTrack(unitVectorA.negate(), 'a', 'enter'),
            transitionTrack(unitVectorB.negate(), 'b', 'enter'),
        ];
        if (leftSlipEnabled) {
            trackList.push(slipTransitionTrack('a', 'left', 'enter'));
        }
        if (rightSlipEnabled) {
            trackList.push(slipTransitionTrack('b', 'right', 'enter'));
        }
        trackList.push(
            crossingTrack(unitVectorA, 'a'),
            crossingTrack(unitVectorB, 'b'),
            sideTrack(unitVectorA.negate(), unitVectorB, 'a', 'b', 'left', leftSlipEnabled),
            sideTrack(unitVectorB.negate(), unitVectorA, 'b', 'a', 'right', rightSlipEnabled),
            transitionTrack(unitVectorA, 'a', 'exit'),
            transitionTrack(unitVectorB, 'b', 'exit'),
        );
        if (rightSlipEnabled) {
            trackList.push(slipTransitionTrack('a', 'right', 'exit'));
        }
        if (leftSlipEnabled) {
            trackList.push(slipTransitionTrack('b', 'left', 'exit'));
        }

        const tracks = Object.fromEntries(trackList);

        const addSideConnection = (side, enter_path, exit_path, slipEnabled) => {
            if (slipEnabled) {
                tracks[`outer_${enter_path}_enter`].connections.push({
                    type: SwitchTrackConnectionType.INTERNAL,
                    end: TrackConnectionEnd.END,
                    otherEnd: TrackConnectionEnd.START,
                    internalId: `slip_transition_${enter_path}_enter`,
                });
                tracks[`outer_${exit_path}_exit`].connections.push({
                    type: SwitchTrackConnectionType.INTERNAL,
                    end: TrackConnectionEnd.END,
                    otherEnd: TrackConnectionEnd.START,
                    internalId: `slip_transition_${exit_path}_exit`,
                });
            } else {
                tracks[`transition_${enter_path}_enter`].connections.push({
                    type: SwitchTrackConnectionType.INTERNAL,
                    end: TrackConnectionEnd.END,
                    otherEnd: TrackConnectionEnd.START,
                    internalId: `side_${side}`,
                });
                tracks[`transition_${exit_path}_exit`].connections.push({
                    type: SwitchTrackConnectionType.INTERNAL,
                    end: TrackConnectionEnd.END,
                    otherEnd: TrackConnectionEnd.END,
                    internalId: `side_${side}`,
                });
            }
        };
        addSideConnection('left', 'a', 'b', leftSlipEnabled);
        addSideConnection('right', 'b', 'a', rightSlipEnabled);

        return new SwitchPrefab(tracks);
    }
}
