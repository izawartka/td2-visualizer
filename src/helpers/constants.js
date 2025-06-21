const Constants = {
    map: {
        zoomSensitivity: 0.002,
        trackSlopeScale: 10,
        trackMaxSpeedScale: 1.5,
        forcePointerEvents: false
    },
    parser: {
        forceAutoSwitches: false,
        logNewAutoSwitches: true,
        logSceneryAfterFinished: true,
        sceneryInfoVersion: 29,
        alwaysShowLogDialog: false,
        runTracksConnectionTest: false,
        resolveElectrification: true,
        maxRouteConnectionDistance: 0.2,
    },
    warnings: {
        all: false, // enable all warnings
        trackObjectCannotBeApplied: false,
        switchInvalidTrackConnection: true,
        unknownObjectType: true,
        unknownTrackType: true,
        signalWithoutSpawnInfo: true,
        trackAliasAlreadyExists: true,
        trackAliasNoTrack: true,
        switchUndefinedModel: true,
        switchAutoDefFailed: true,
        switchInvalidDataFormat: true,
        switchNoModel: true,
        signalBoxUndefinedPrefabName: true,
        invalidSceneryInfoVersion: true,
        signUndefinedPrefabName: true,
        tracksConnectionTest: true,
        electrificationNevpNotApplied: false,
        electrificationConflict: false,
        electrificationMissingRouteTracks: true,
        electrificationResolverError: true,
        electrificationResolverWarnings: true,
    },
    errors: {
        invalidSceneryInfo: true
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
            id: 'signs',
            name: 'Signs',
            default: true,
        },
        {
            id: 'nevps',
            name: 'No Electric Vehicles Points',
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
            id: 'electrification',
            name: 'Electrification'
        },
        {
            id: 'type',
            name: 'Type',
        },
        {
            id: 'slope',
            name: 'Slope'
        },
        {
            id: 'max-speed',
            name: 'Max speed'
        }
    ]
};

export default Constants;