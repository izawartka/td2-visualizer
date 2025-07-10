import SceneryParserLog from "./scenery-parser-log";
import TrackConnection, { TrackConnectionType } from "./track-connection";

export function connectTracks(scenery) {
    const tracks = scenery.objects['tracks'] || {};
    
    Object.values(tracks).forEach(track => {
        connectTrack(scenery, track, false);
        connectTrack(scenery, track, true);
    });
}

function connectTrack(scenery, track, isPrev) {
    const vNext = isPrev ? track.previd : track.nextid;
    if (!vNext) return;
    
    const vNextTrackId = scenery.getTrackIdByAlias(vNext);
    const vNextTrack = scenery.getObject('tracks', vNextTrackId);
    
    if (!vNextTrack) {
        SceneryParserLog.warn('connectTracks', `Track ${track.id} has non-existing ${isPrev ? 'previous' : 'next'} track: ${isPrev ? track.previd : track.nextid} (${vNextTrackId})`);
        return;
    }
    
    const vNextTrackNextId = scenery.getTrackIdByAlias(vNextTrack.nextid);
    const vNextTrackPrevId = scenery.getTrackIdByAlias(vNextTrack.previd);
    const isConnectedAsNext = vNextTrackPrevId === track.id || track.aliases.includes(vNextTrackPrevId);
    const isConnectedAsPrev = vNextTrackNextId === track.id || track.aliases.includes(vNextTrackNextId);
    
    let otherConnectionType = isConnectedAsNext ? TrackConnectionType.START : TrackConnectionType.END;
    let addReverseConnection = false;
    
    if (!isConnectedAsNext && !isConnectedAsPrev) {
        // switch connection
        if(!track.switch) {
            SceneryParserLog.warn('connectTracksFailed', `${isPrev ? 'Previous' : 'Next'} track ${vNextTrackId} is not connected back to track ${track.id} (${track.previd} / ${track.nextid}). Cannot connect tracks`);
            return;
        }
        
        const switchId = track.switch.id;
        const isConnectedAsSwitchNext = vNextTrackNextId.slice(0, -1) === switchId;
        const isConnectedAsSwitchPrev = vNextTrackPrevId.slice(0, -1) === switchId;
        
        if(!isConnectedAsSwitchNext && !isConnectedAsSwitchPrev) {
            SceneryParserLog.warn('connectTracksFailed', `${isPrev ? 'Previous' : 'Next'} track ${vNextTrackId} is not connected back to switch track ${track.id} (${track.previd} / ${track.nextid}). Cannot connect tracks`);
            return;
        }
        
        otherConnectionType = isConnectedAsSwitchNext ? TrackConnectionType.START : TrackConnectionType.END;
        addReverseConnection = true;
    }
    
    const mainConnectionType = isPrev ? TrackConnectionType.START : TrackConnectionType.END;
    
    track.connections.push(new TrackConnection(
        track,
        vNextTrack,
        mainConnectionType,
        otherConnectionType
    ));
    
    if(!addReverseConnection) return;
    
    vNextTrack.connections.push(new TrackConnection(
        vNextTrack,
        track,
        otherConnectionType,
        mainConnectionType
    ));
}