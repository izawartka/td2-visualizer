import Constants from "../helpers/constants";
import SceneryParserLog from "./scenery-parser-log";
import {ElectrificationStatus, ElectrificationResolutionStatus} from "./electrification-status";

class RouteTrack {
    route;
    track;
    electrified;

    constructor(route, track, electrified) {
        Object.assign(this, { route, track, electrified });
    }
}

export default class ElectrificationResolver {
    static hasWarnings = false;
    static propagationQueue = [];

    static resolveScenery(scenery) {
        ElectrificationResolver.hasWarnings = false;
        ElectrificationResolver.propagationQueue = [];

        try {
            const routeTracks = this._findRouteTracks(scenery);
            this._markNEVPTracks(scenery);

            routeTracks.forEach(routeTrack => {
                this._propagate(
                    routeTrack.track, 
                    [], 
                    routeTrack.electrified ? ElectrificationStatus.ELECTRIFIED : ElectrificationStatus.NON_ELECTRIFIED
                );
            });

            this._runResolution();
        } catch (error) {
            scenery.electrificationResolved = ElectrificationResolutionStatus.ERROR;
            SceneryParserLog.warn('electrificationResolverError', `Error resolving electrification: ${error.message}`);
            return;
        }

        if(ElectrificationResolver.hasWarnings) {
            scenery.electrificationResolved = ElectrificationResolutionStatus.RESOLVED_WITH_WARNINGS;
            SceneryParserLog.warn('electrificationResolverWarnings', 'Electrification resolution completed with warnings');
            return;
        }

        scenery.electrificationResolved = ElectrificationResolutionStatus.RESOLVED;
    }

    static _passWarn(type, message) {
        ElectrificationResolver.hasWarnings = true;
        SceneryParserLog.warn(type, message);
    }

    static _checkTrackConnectedToRoute(track, routePoint) {
        const mStartDist = track.points.start.mannhattanDistance(routePoint.point);
        if(mStartDist <= Constants.parser.maxRouteConnectionDistance) {
            const startDistSq = track.points.start.distanceSq(routePoint.point);
            if(startDistSq <= Constants.parser.maxRouteConnectionDistance ** 2) {
                return true;
            }
        }

        const mEndDist = track.points.end.mannhattanDistance(routePoint.point);
        if(mEndDist <= Constants.parser.maxRouteConnectionDistance) {
            const endDistSq = track.points.end.distanceSq(routePoint.point);
            if(endDistSq <= Constants.parser.maxRouteConnectionDistance ** 2) {
                return true;
            }
        }

        return false;
    }

    static _findRouteTracks(scenery) {
        const routePoints = Object.values(scenery.objects.routes || {})
            .map(route => route.points.map(point => ({ route, point }))).flat();

        const results = [];

        Object.values(scenery.objects.tracks || {}).forEach(track => {
            routePoints.forEach(routePoint => {
                if (this._checkTrackConnectedToRoute(track, routePoint)) {
                    results.push(new RouteTrack(routePoint.route, track, routePoint.route.electrified));
                }
            });
        });

        if(results.length < routePoints.length) {
            ElectrificationResolver._passWarn(
                'electrificationMissingRouteTracks', 
                `While resolving electrification, found ${results.length} tracks connected to routes, but expected ${routePoints.length}`
            );
        }

        return results;
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
        while(ElectrificationResolver.propagationQueue.length > 0) {
            const { track, skipTrackIds, status } = ElectrificationResolver.propagationQueue.shift();
            ElectrificationResolver._resolveTrack(track, skipTrackIds, status);
        }
    }

    static _propagate(track, skipTrackIds, status) {
        ElectrificationResolver.propagationQueue.push({ track, skipTrackIds, status });
    }

    static _resolveTrack(track, skipTrackIds, status) {
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
                `Track ${track.id} has conflicting electrification status (=>${status})`
            );
            return;
        }

        const propagation = track.connections.map(conn => conn.otherTrack);
        const nextSkipIds = [track.id];

        if (track.switch) {
            nextSkipIds.push(track.switch.trackA.id, track.switch.trackB.id);
        }

        propagation.forEach(nextTrack => {
            if (skipTrackIds.includes(nextTrack.id)) return;

            this._propagate(nextTrack, nextSkipIds, track.electrificationStatus);
        });

        // Additional propagation for double switches
        if (!track.switch || track.switch.def?.[2]?.length <= 2 || track.hasNEVP) return;

        const otherSwitchTrack = track.switch.trackA === track ? track.switch.trackB : track.switch.trackA;
        this._propagate(otherSwitchTrack, [track.id, ...propagation.map(track => track.id)], track.electrificationStatus);
    }
};