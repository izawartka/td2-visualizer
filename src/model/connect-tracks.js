import TrackConnection, {TrackConnectionEnd} from "./track-connection";
import SceneryParserLog from "./scenery-parser-log";
import Constants from "../helpers/constants";

const connectionThresholdDistanceSq = 0.05;

export function connectTracks(scenery) {
    _connectRoutes(scenery);
    _connectRemainingTracks(scenery);
}

function _connectRoutes(scenery) {
    const routeTracks = new Map();

    Object.values(scenery.objects['routes'] || {}).forEach((route) => {
        if (!route.segments[0]) return;
        route.segments[0].tracks.forEach((track) => {
            routeTracks.set(track.id, track);
        });
    });

    Object.values(scenery.objects['tracks'] || {}).forEach((track) => {
        track.connections.forEach((connection) => {
            const routeTrack = routeTracks.get(connection.otherTrackId);
            if (!routeTrack) return;
            const alreadyConnected = routeTrack.connections.some(
                (reverseConnection) => reverseConnection.otherTrackId === track.id,
            );
            if (alreadyConnected) return;
            routeTrack.connections.push(new TrackConnection(track, TrackConnectionEnd.START));
        });
    });
}

function _connectRemainingTracks(scenery) {
    Object.values(scenery.objects['tracks'] || {}).forEach((track) => {
        track.connections.forEach((connection) => {
            _checkConnection(scenery, track, connection);
        });
        track.connections = track.connections.filter((connection) => connection.otherTrack !== null);
    });
}

function _checkConnection(scenery, track, connection) {
    if (connection.otherTrack === null) {
        const otherTrack = scenery.getObject('tracks', connection.otherTrackId);
        if (!otherTrack) {
            SceneryParserLog.warn('connectTracksFailed', `Track ${track.id} has a non-existing ${connection.end === TrackConnectionEnd.START ? 'previous' : 'next'} track: ${connection.otherTrackId}`);
            return;
        }
        connection.otherTrack = otherTrack;
    }

    if (!Constants.parser.runTracksConnectionTest) return;

    const reverseConnections = connection.otherTrack.connections.filter(
        (otherConnection) => otherConnection.otherTrackId === track.id,
    );
    if (reverseConnections.length > 1) {
        SceneryParserLog.warn(
            'tracksConnectionTest',
            `Track ${connection.otherTrack.id} has multiple connections to ${track.id}`,
        );
    }
    if (reverseConnections.length === 0) {
        SceneryParserLog.warn(
            'tracksConnectionTest',
            `Track ${track.id} is connected to ${connection.otherTrackId} but there is no reverse connection`,
        );
        return;
    }
    const reverseConnection = reverseConnections[0];

    const ownPosition = track.shape.getEndPos(connection.end);
    const otherPosition = connection.otherTrack.shape.getEndPos(reverseConnection.end);
    const distSq = ownPosition.distanceSq(otherPosition);
    if (distSq > connectionThresholdDistanceSq) {
        SceneryParserLog.warn(
            'tracksConnectionTest',
            `Track ${track.id} with ${connection.end === TrackConnectionEnd.START ? 'start' : 'end'} position ${ownPosition.toString()} is too far from the track ${connection.otherTrackId} with ${connection.end === TrackConnectionEnd.START ? 'start' : 'end'} position ${otherPosition.toString()}. Distance: ${Math.sqrt(distSq).toFixed(3)}`,
        );
    }
}
