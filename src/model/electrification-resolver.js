import Constants from "../helpers/constants";
import SceneryParserLog from "./scenery-parser-log";
import {ElectrificationStatus, ElectrificationResolutionStatus} from "./electrification-status";

export default class ElectrificationResolver {
    static hasWarnings = false;
    static propagationQueue = [];

    static resolveScenery(scenery) {
        ElectrificationResolver.hasWarnings = false;
        ElectrificationResolver.propagationQueue = [];

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

        if(ElectrificationResolver.hasWarnings) {
            scenery.electrificationResolved = ElectrificationResolutionStatus.RESOLVED_WITH_WARNINGS;
            SceneryParserLog.warn('electrificationResolverWarnings', 'Electrification resolution completed with warnings');
            return;
        }

        scenery.electrificationResolved = ElectrificationResolutionStatus.RESOLVED;
    }

    static stepModeStep() {
        if (!Constants.parser.resolveElectrificationStepMode) return;
        if (ElectrificationResolver.propagationQueue.length === 0) return;

        try {
            ElectrificationResolver._runResolutionStep();
        } catch (error) {
            console.error(error);
        }

        return ElectrificationResolver.propagationQueue.length === 0;
    }

    static _passWarn(type, message) {
        ElectrificationResolver.hasWarnings = true;
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
                ElectrificationResolver._passWarn(
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

        while(ElectrificationResolver.propagationQueue.length > 0) {
            ElectrificationResolver._runResolutionStep();
        }
    }

    static _runResolutionStep() {
        const { track, skipTrackId, status } = ElectrificationResolver.propagationQueue.pop();
        ElectrificationResolver._resolveTrack(track, skipTrackId, status);
    }

    static _propagate(track, skipTrackId, status) {
        ElectrificationResolver.propagationQueue.push({ track, skipTrackId, status });
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
            ElectrificationResolver._passWarn(
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
