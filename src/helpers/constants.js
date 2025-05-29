const Constants = {
    map: {
        useTrackColors: false,
        zoomSensitivity: 0.002,
    },
    layers: [
        {
            id: 'tracks',
            name: 'Tracks',
            default: true,
        },
        {
            id: 'switches-names',
            name: 'Switches names',
            default: true,
        },
        {
            id: 'isolations-ids',
            name: 'Isolations IDs',
            default: true,
        },
        {
            id: 'track-objects',
            name: 'Track objects',
            default: false,
        }
    ]
};

export default Constants;