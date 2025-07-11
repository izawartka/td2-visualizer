export const TrackConnectionEnd = {
    START: Symbol('TrackConnectionEnd.START'),
    END: Symbol('TrackConnectionEnd.END'),
};

export default class TrackConnection {
    otherTrackId;
    end;

    constructor(otherTrackId, end) {
        Object.assign(this, {
            otherTrackId, end,
        });
    }
}
