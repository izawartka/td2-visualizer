export const TrackConnectionEnd = {
    START: Symbol('TrackConnectionEnd.START'),
    END: Symbol('TrackConnectionEnd.END'),
};

export default class TrackConnection {
    otherTrackId;
    otherTrack = null;
    end;

    /**
     * If only an ID is passed as `otherTrack`,
     * it needs to be resolved later in the `connectTracks` function.
     */
    constructor(otherTrack, end) {
        this.end = end;
        if (typeof otherTrack === 'string') {
            this.otherTrackId = otherTrack;
            this.otherTrack = null;
        } else {
            this.otherTrackId = otherTrack.id;
            this.otherTrack = otherTrack;
        }
    }
}
