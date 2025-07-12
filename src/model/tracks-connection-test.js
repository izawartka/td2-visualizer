import SceneryParserLog from './scenery-parser-log';
import {TrackConnectionEnd} from "./track-connection";

const connectionThresholdDistanceSq = 0.05;

function trackEndConnectionTest(scenery, track, connection) {
    const otherTrack = scenery.getObject('tracks', connection.otherTrackId);
    if (!otherTrack) {
        SceneryParserLog.warn('tracksConnectionTest', `Track ${track.id} has a non-existing ${connection.end === TrackConnectionEnd.START ? 'previous' : 'next'} track: ${connection.otherTrackId}`);
        return;
    }

    const reverseConnections = otherTrack.connections.filter(
        (otherConnection) => otherConnection.otherTrackId === track.id,
    );
    if (reverseConnections.length > 1) {
        SceneryParserLog.warn(
            'tracksConnectionTest',
            `Track ${otherTrack.id} has multiple connections to ${track.id}`,
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

    const ownPosition = track.getEndPos(connection.end);
    const otherPosition = otherTrack.getEndPos(reverseConnection.end);
    const distSq = ownPosition.distanceSq(otherPosition);
    if (distSq > connectionThresholdDistanceSq) {
        SceneryParserLog.warn(
            'tracksConnectionTest',
            `Track ${track.id} with ${connection.end === TrackConnectionEnd.START ? 'start' : 'end'} position ${ownPosition.toString()} is too far from the track ${connection.otherTrackId} with ${connection.end === TrackConnectionEnd.START ? 'start' : 'end'} position ${otherPosition.toString()}. Distance: ${Math.sqrt(distSq).toFixed(3)}`,
        );
    }
}

export function tracksConnectionTest(scenery) {
    const tracks = scenery.objects['tracks'] || [];

    Object.values(tracks).forEach(track => {
        track.connections.forEach((connection) => {
            trackEndConnectionTest(scenery, track, connection);
        });
    });
}
