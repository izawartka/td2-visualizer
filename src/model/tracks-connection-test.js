import SceneryParserLog from './scenery-parser-log';

const connectionThresholdDistanceSq = 0.05;

function trackEndConnectionTest(scenery, track, isPrev) {
    const vNext = isPrev ? track.previd : track.nextid;
    if (!vNext) return;
    
    const vEndPos = isPrev ? track.points.start : track.points.end;
    const vNextTrackId = scenery.getTrackIdByAlias(vNext);
    const vNextTrack = scenery.getObject('tracks', vNextTrackId);

    if (!vNextTrack) {
        SceneryParserLog.warn('tracksConnectionTest', `Track ${track.id} has non-existing ${isPrev ? 'previous' : 'next'} track: ${isPrev ? track.previd : track.nextid} (${vNextTrackId})`);
        return;
    }

    const [vNextTrackNext, vNextTrackPrev] = isPrev ? [vNextTrack.previd, vNextTrack.nextid] : [vNextTrack.nextid, vNextTrack.previd];
    const vNextTrackNextId = scenery.getTrackIdByAlias(vNextTrackNext);
    const vNextTrackPrevId = scenery.getTrackIdByAlias(vNextTrackPrev);
    const directlyConnected = track.aliases.includes(vNextTrackPrevId) || vNextTrackPrevId === track.id;
    const reverseConnected = track.aliases.includes(vNextTrackNextId) || vNextTrackNextId === track.id;
    const isSwitchBTrackPrev = isPrev && track.id.at(-1) === 'B';

    if (directlyConnected) {
        const vNextTrackStartPos = isPrev ? vNextTrack.points.end : vNextTrack.points.start;
        const distSq = vEndPos.distanceSq(vNextTrackStartPos);
        if (distSq > connectionThresholdDistanceSq) {
            SceneryParserLog.warn('tracksConnectionTest', `Track ${track.id} with ${isPrev ? 'start' : 'end'} position ${vEndPos.toString()} is too far from the ${isPrev ? 'previous' : 'next'} track ${vNextTrackId} with ${isPrev ? 'end' : 'start'} position ${vNextTrackStartPos.toString()}. Distance: ${Math.sqrt(distSq).toFixed(3)}`);
            return;
        }
    } else if (reverseConnected) {
        const vNextTrackEndPos = isPrev ? vNextTrack.points.start : vNextTrack.points.end;
        const distSq = vEndPos.distanceSq(vNextTrackEndPos);
        if (distSq > connectionThresholdDistanceSq) {
            SceneryParserLog.warn('tracksConnectionTest', `Track ${track.id} with ${isPrev ? 'start' : 'end'} position ${vEndPos.toString()} is too far from the ${isPrev ? 'previous' : 'next'} track ${vNextTrackId} with ${isPrev ? 'start' : 'end'} position ${vNextTrackEndPos.toString()}. Distance: ${Math.sqrt(distSq).toFixed(3)}`);
            return;
        }
    } else if(!isSwitchBTrackPrev) {
        SceneryParserLog.warn('tracksConnectionTest', `Track ${track.id} ${isPrev ? 'previous' : 'next'} track ${vNextTrackId} does not match its ${isPrev ? 'next' : 'previous'} track id: ${vNextTrackNext} (${vNextTrackNextId}), ${vNextTrackPrev} (${vNextTrackPrevId})`);
        return;
    }
}

export function tracksConnectionTest(scenery) {
    const tracks = scenery.objects['tracks'] || [];

    Object.values(tracks).forEach(track => {
        trackEndConnectionTest(scenery, track, false);
        trackEndConnectionTest(scenery, track, true);
    });
}