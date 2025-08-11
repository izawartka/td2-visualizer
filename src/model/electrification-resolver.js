import Constants from "../helpers/constants";
import SceneryParserLog from "./scenery-parser-log";
import {ElectrificationStatus, ElectrificationResolutionStatus} from "./electrification-status";

export default class ElectrificationResolver {
    static hasWarnings = false;
    static propagationQueueHead = null;
    static propagationQueueTail = null;

    static resolveScenery(scenery) {
        this.hasWarnings = false;
        this.propagationQueueHead = null;
        this.propagationQueueTail = null;

        try {
            const routeTracks = this._findTracksAdjacentToRoutes(scenery);
            this._markNEVPTracks(scenery);

            routeTracks.forEach(({ track, routeTrack }) => {
                this._propagate(
                    track,
                    routeTrack.id,
                    routeTrack.electrificationStatus,
                );
            });

            this._runResolution();
        } catch (error) {
            scenery.electrificationResolved = ElectrificationResolutionStatus.RESOLVING_ERROR;
            SceneryParserLog.warn('electrificationResolverError', `Error resolving electrification: ${error.message}`);
            console.warn(error);
            return;
        }

        if(this.hasWarnings) {
            scenery.electrificationResolved = ElectrificationResolutionStatus.RESOLVED_WITH_WARNINGS;
            SceneryParserLog.warn('electrificationResolverWarnings', 'Electrification resolution completed with warnings');
            return;
        }

        scenery.electrificationResolved = ElectrificationResolutionStatus.RESOLVED;
    }

    static stepModeStep() {
        if (!Constants.parser.resolveElectrificationStepMode) return;

        try {
            return this._runResolutionStep();
        } catch (error) {
            console.error(error);
        }
    }

    static _passWarn(type, message) {
        this.hasWarnings = true;
        SceneryParserLog.warn(type, message);
    }

    static _findTracksAdjacentToRoutes(scenery) {
        return Object.values(scenery.objects.routes || {}).flatMap(route => {
            return route.segments[0]?.tracks.flatMap((routeTrack) => {
                return routeTrack.connections
                    .map((connection) => {
                        if (connection.otherTrack.type === 'RouteTrack') return null;
                        return { track: connection.otherTrack, routeTrack };
                    })
                    .filter((adjacent) => adjacent !== null);
            }) || [];
        });
    }

    static _markNEVPTracks(scenery) {
        Object.values(scenery.objects['track-objects'] || {}).forEach(trackObject => {
            if(trackObject.type !== 'NEVP') return;

            if(!trackObject.track) {
                this._passWarn(
                    'electrificationNevpNotApplied',
                    `NEVP object ${trackObject.name} (${trackObject.id}) at track ${trackObject.track_id} has not been applied. Electrification resolution may fail`
                );
                return;
            }

            trackObject.track.hasNEVP = true;
        });
    }

    static _runResolution() {
        if (Constants.parser.resolveElectrificationStepMode) return;

        while(this._runResolutionStep()) {}

        this.propagationQueueHead = null;
    }

    static _runResolutionStep() {
        const node = this.propagationQueueTail;
        if (!node) {
            return false;
        }

        const { track, skipTrackId, status, next } = node;
        this.propagationQueueTail = next;
        this._resolveTrack(track, skipTrackId, status);
        return true;
    }

    static _propagate(track, skipTrackId, status) {
        const newNode = {
            track,
            skipTrackId,
            status,
            next: null,
        };

        if (this.propagationQueueTail === null) {
            this.propagationQueueTail = newNode;
            this.propagationQueueHead = newNode;
        } else {
            this.propagationQueueHead.next = newNode;
            this.propagationQueueHead = newNode;
        }
    }

    static _resolveTrack(track, skipTrackId, status) {
        if (track.electrificationStatus === status) return; // already set
        if (Constants.parser.skipElectrificationErrorsPropagation && status === ElectrificationStatus.CONFLICT) {
            return;
        }
        if (track.electrificationStatus === ElectrificationStatus.CONFLICT) {
            return;
        }

        const fse = status === ElectrificationStatus.ELECTRIFIED;
        const fsne = status === ElectrificationStatus.NON_ELECTRIFIED;
        const tse = track.electrificationStatus === ElectrificationStatus.ELECTRIFIED;
        const tsne = track.electrificationStatus === ElectrificationStatus.NON_ELECTRIFIED;

        track.electrificationStatus = status;

        if (track.hasNEVP) {
            track.electrificationStatus = ElectrificationStatus.NON_ELECTRIFIED;
            if(!fse) return;
        } else if ((tse && fsne) || (tsne && fse)) {
            track.electrificationStatus = ElectrificationStatus.CONFLICT;
            this._passWarn(
                'electrificationConflict',
                `Track ${track.id} has conflicting electrification status (${skipTrackId}=>${status})`
            );
            return;
        }

        // only propagate NON_ELECTRIFIED status forward when NEVP is on a track with more than 2 connections
        let additionalSkipIds = [];
        if(track.hasNEVP && track.connections.length > 2) {
            const comingFromConnection = track.connections.find(connection => connection.otherTrackId === skipTrackId) || null;
            const comingFromEnd = comingFromConnection?.end || null;

            additionalSkipIds = track.connections
                .filter(connection => connection.end === comingFromEnd)
                .map(connection => connection.otherTrackId);
        }

        track.connections.forEach(connection => {
            if (skipTrackId === connection.otherTrackId) return;
            if (additionalSkipIds.includes(connection.otherTrackId)) return;
            this._propagate(connection.otherTrack, track.id, track.electrificationStatus);
        });
    }
};
