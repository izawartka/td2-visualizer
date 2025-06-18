import SceneryParserLog from './scenery-parser-log';

const connectionThresholdDistanceSq = 0.05;

export function tracksConnectionTest(scenery) {
    const tracks = scenery.objects['tracks'] || [];

    Object.values(tracks).forEach(track => {
        const trackStartPos = track.points.start;
        const trackEndPos = track.points.end;
        const aliases = track.aliases;

        if (track.nextid) {
            const nextTrackId = scenery.getTrackIdByAlias(track.nextid);
            const nextTrack = scenery.getObject('tracks', nextTrackId);

            if(!nextTrack) {
                SceneryParserLog.warn('tracksConnectionTest', `Track ${track.id} has non-existing next track: ${track.nextid} (${nextTrackId})`);
            } else {
                const nextTrackPrevTrackId = scenery.getTrackIdByAlias(nextTrack.previd);
                const nextTrackNextTrackId = scenery.getTrackIdByAlias(nextTrack.nextid);
                const directlyConnected = aliases.includes(nextTrackPrevTrackId) || nextTrackPrevTrackId === track.id;
                const reverseConnected = aliases.includes(nextTrackNextTrackId) || nextTrackNextTrackId === track.id;
                const connectionError = !directlyConnected && !reverseConnected;

                if (connectionError) {
                    SceneryParserLog.warn('tracksConnectionTest', `Track ${track.id} next track ${nextTrackId} does not match its previous or next track id: ${nextTrack.previd} (${nextTrackPrevTrackId}), ${nextTrack.nextid} (${nextTrackNextTrackId})`);
                } else if (directlyConnected) {
                    const nextTrackStartPos = nextTrack.points.start;
                    const distSq = trackEndPos.distanceSq(nextTrackStartPos);
                    if (distSq > connectionThresholdDistanceSq) {
                        SceneryParserLog.warn('tracksConnectionTest', `Track ${track.id} with end position ${trackEndPos.toString()} is too far from the next track ${nextTrackId} with start position ${nextTrackStartPos.toString()}. Distance: ${Math.sqrt(distSq).toFixed(3)}`);
                    }
                } else if (reverseConnected) {
                    const nextTrackEndPos = nextTrack.points.end;
                    const distSq = trackEndPos.distanceSq(nextTrackEndPos);
                    if (distSq > connectionThresholdDistanceSq) {
                        SceneryParserLog.warn('tracksConnectionTest', `Track ${track.id} with end position ${trackEndPos.toString()} is too far from the next track ${nextTrackId} with end position ${nextTrackEndPos.toString()}. Distance: ${Math.sqrt(distSq).toFixed(3)}`);
                    }
                }
            }
        }

        if (track.previd) {
            const prevTrackId = scenery.getTrackIdByAlias(track.previd);
            const prevTrack = scenery.getObject('tracks', prevTrackId);

            if(!prevTrack) {
                SceneryParserLog.warn('tracksConnectionTest', `Track ${track.id} has non-existing previous track: ${track.previd} (${prevTrackId})`);
            } else {
                const prevTrackNextTrackId = scenery.getTrackIdByAlias(prevTrack.nextid);
                const prevTrackPrevTrackId = scenery.getTrackIdByAlias(prevTrack.previd);
                const directlyConnected = track.aliases.includes(prevTrackNextTrackId) || prevTrackNextTrackId === track.id;
                const reverseConnected = track.aliases.includes(prevTrackPrevTrackId) || prevTrackPrevTrackId === track.id;
                const connectionError = !directlyConnected && !reverseConnected;

                if (connectionError) {
                    SceneryParserLog.warn('tracksConnectionTest', `Track ${track.id} previous track ${prevTrackId} does not match its next or previous track id: ${prevTrack.nextid} (${prevTrackNextTrackId}), ${prevTrack.previd} (${prevTrackPrevTrackId})`);
                } else if (directlyConnected) {
                    const prevTrackEndPos = prevTrack.points.end;
                    const distSq = trackStartPos.distanceSq(prevTrackEndPos);
                    if (distSq > connectionThresholdDistanceSq) {
                        SceneryParserLog.warn('tracksConnectionTest', `Track ${track.id} with start position ${trackStartPos.toString()} is too far from the previous track ${prevTrackId} with end position ${prevTrackEndPos.toString()}. Distance: ${Math.sqrt(distSq).toFixed(3)}`);
                    }
                } else if (reverseConnected) {
                    const prevTrackStartPos = prevTrack.points.start;
                    const distSq = trackStartPos.distanceSq(prevTrackStartPos);
                    if (distSq > connectionThresholdDistanceSq) {
                        SceneryParserLog.warn('tracksConnectionTest', `Track ${track.id} with start position ${trackStartPos.toString()} is too far from the previous track ${prevTrackId} with start position ${prevTrackStartPos.toString()}. Distance: ${Math.sqrt(distSq).toFixed(3)}`);
                    }
                }
            }
        }
    });
}