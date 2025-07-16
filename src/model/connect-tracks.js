import TrackConnection, {TrackConnectionEnd} from "./track-connection";
import SceneryParserLog from "./scenery-parser-log";
import Constants from "../helpers/constants";

const connectionThresholdDistanceSq = 0.05;

export function connectTracks(scenery) {
    Object.values(scenery.objects['tracks'] || {}).forEach((track) => {
        track.connections.filter((connection) => 
            _applyTrackConnection(scenery, track, connection)
        );
    });

    // additional debugging for track connections
    if(!Constants.parser.runTracksConnectionTest) return;
    Object.values(scenery.objects['tracks'] || {}).forEach((track) => {
        track.connections.forEach((connection) => {
            _testTrackConnection(track, connection);
        });
    });
}

function _applyTrackConnection(scenery, track, connection) {
    if (connection.otherTrack !== null) return true;

    const otherTrack = scenery.getObject('tracks', connection.otherTrackId);
    if (!otherTrack) {
        SceneryParserLog.warn('connectTracksFailed', `Track ${track.id} has a non-existing ${connection.end === TrackConnectionEnd.START ? 'previous' : 'next'} track: ${connection.otherTrackId}`);
        return false;
    }

    connection.otherTrack = otherTrack;

    // route tracks dont have reverse connections saved in file, so we add them here
    const isRouteTrack = otherTrack.type === 'RouteTrack';
    if (isRouteTrack) {
        const reverseConnection = new TrackConnection(track, TrackConnectionEnd.START);
        otherTrack.connections.push(reverseConnection);
    }

    return true;
}

function _testTrackConnection(track, connection) {
    const reverseConnections = connection.otherTrack.connections.filter(
        (otherConnection) => otherConnection.otherTrackId === track.id,
    );

    if (reverseConnections.length > 1) {
        SceneryParserLog.warn(
            'tracksConnectionTest',
            `Track ${connection.otherTrack.id} has multiple connections to ${track.id}`,
        );
        return false;
    }
    if (reverseConnections.length === 0) {
        SceneryParserLog.warn(
            'tracksConnectionTest',
            `Track ${track.id} is connected to ${connection.otherTrackId} but there is no reverse connection`,
        );
        return false;
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

        if(track.switch) SceneryParserLog.warn(
            'tracksConnectionTestSwitchRelated',
            `The above warning may be related to switch ${track.switch.id}, model ${track.switch.bare_model}`
        )

        return false;
    }

    return true;
}
