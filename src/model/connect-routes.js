import TrackConnection, {TrackConnectionEnd} from "./track-connection";

export function connectRoutes(scenery) {
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
            routeTrack.connections.push(new TrackConnection(track.id, TrackConnectionEnd.START));
        });
    });
}
