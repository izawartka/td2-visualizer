const Constants = {
    map: {
        zoomSensitivity: 0.002,
        trackSlopeScale: 10,
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
            id: 'signalboxes',
            name: 'Signal boxes',
            default: true,
        },
        {
            id: 'routes',
            name: 'Routes',
            default: true,
        }
    ],
    trackColorModes: [
        {
            id: 'none',
            name: 'None',
        },
        {
            id: 'type',
            name: 'Type',
        },
        {
            id: 'slope',
            name: 'Slope'
        }
    ]
};

export default Constants;