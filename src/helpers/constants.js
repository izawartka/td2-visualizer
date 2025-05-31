const Constants = {
    map: {
        useTrackColors: false,
        zoomSensitivity: 0.002,
    },
    warnings: {
        all: false, // enable all warnings
        trackObjectCannotBeApplied: false,
        switchInvalidTrackConnection: true,
        unknownObjectType: true,
        unknownTrackType: true,
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
            default: false,
        },
        {
            id: 'track-objects',
            name: 'Track objects',
            default: false,
        },
        {
            id: 'signals',
            name: 'Signals',
            default: true,
        },
        {
            id: 'routes',
            name: 'Routes',
            default: true,
        }
    ]
};

export default Constants;