export const TrackConnectionType = {
    END: 0,
    START: 1,
}

export default class TrackConnection {
    tracks;
    otherTrack;
    type;
    otherType;

    constructor(track, otherTrack, type, otherType) {
        Object.assign(this, {
            track,
            otherTrack,
            type,
            otherType
        });
    }
}
