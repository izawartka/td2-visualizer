const Constants = {
    buildVersion: '1.4.0',
    map: {
        zoomSensitivity: 0.002,
        zoomMin: 0.03,
        zoomMax: 200.0,
        rotationSensitivity: 0.2,
        forcePointerEvents: false
    },
    parser: {
        logSceneryAfterFinished: true,
        sceneryInfoVersion: 29,
        alwaysShowLogDialog: false,
        runTracksConnectionTest: false,
        resolveElectrification: true,
        skipElectrificationErrorsPropagation: false,
        attachSigns: true,
        attachSignsNeedsSameTrack: false,
        attachSignsMaxDistanceZ: 1.0,
        attachSignsMaxDistanceX: 0.3,
        attachSignsGridSize: 10,
        logAttachedSigns: false,
        skipBaseMisc: true
    },
    warnings: {
        all: false, // enable all warnings
        trackObjectCannotBeApplied: false,
        switchInvalidTrackConnection: true,
        unknownObjectType: true,
        unknownTrackType: true,
        spawnWithoutSpawnInfo: true,
        switchUndefinedModel: true,
        switchInvalidDataFormat: true,
        switchNoModel: true,
        switchMissingTrackId: true,
        switchInvalidInternalConnection: true,
        signalBoxUndefinedPrefabName: true,
        invalidSceneryInfoVersion: true,
        signUndefinedPrefabName: true,
        tracksConnectionTest: true,
        tracksConnectionTestSwitchRelated: true,
        electrificationNevpNotApplied: false,
        electrificationConflict: false,
        electrificationResolverError: true,
        electrificationResolverWarnings: true,
        signalElemsUnknownPrefab: true,
        signalElemsRecognizedUnknownPrefab: true,
        attachSignsOutOfBounds: true,
        signalElemsUnknownSign: true,
        signalElemsUnknownSignText: true,
        connectTracksFailed: true,
        routeInvalidSegment: true,
        derailerUnknownDirection: true,
        platformUndefinedPrefabName: true,
        endMiscGroupWithoutStart: true,
    },
    errors: {
        invalidSceneryInfo: true
    },
    sceneryFiles: {
        fetchDisable: true,
        fetchBaseUrl: `${process.env.PUBLIC_URL}/sceneries/`,
        fetchListUrl: `${process.env.PUBLIC_URL}/sceneries/sceneries.json`,
    },
    layers: [
        {
            id: 'tracks',
            name: 'Tracks',
            default: true,
        },
        {
            id: 'switches-names',
            name: 'Switch names',
            default: false,
        },
        {
            id: 'isolations-ids',
            name: 'Isolations',
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
            id: 'spawn-points',
            name: 'SpawnPoints',
            default: true,
        },
        {
            id: 'derailers',
            name: 'Derailers',
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
    trackColorModeDefault: 'standard',
    trackColorModes: {
        'standard': {
            name: 'Standard',
            optionDefault: 'default',
            options: {
                'default': ['#aaa', 'Standard track'],
                'invisible': ['#444', 'Invisible track'],
            }
        },
        'electrification': {
            name: 'Electrification',
            optionDefault: 'conflict',
            options: {
                'electrified': ['#aaf', 'Electrified'],
                'non-electrified': ['#aaa', 'Non-electrified'],
                'not-checked': ['#aa4', 'Unknown'],
                'conflict': ['#f44', 'Error / Conflict'],
            }
        },
        'type': {
            name: 'Type',
            optionDefault: 'standard-track',
            options: {
                'standard-track': ['#00a', 'Standard track'],
                'point-track': ['#0a0', 'Switch track'],
                'bezier-track': ['#aa8', 'Bezier track'],
                'route-track': ['#a6d', 'Route track'],
            }
        },
        'slope': {
            name: 'Slope',
            gradient: {
                base: [128, 0, 128],
                diff: [0, 25.6, 0],
                legendMin: 0,
                legendMax: 10,
                unit: '‰',
            }
        },
        'max-speed': {
            name: 'Max speed',
            type: 'gradient',
            gradient: {
                base: [128, 0, 128],
                diff: [0, 1.5, 0],
                legendMin: 0,
                legendMax: 170,
                unit: 'km/h',
            },
            options: {
                'derail': ['#f22', 'Derail track'],
                'unknown': ['#aaa', 'Unknown speed'],
            }
        }
    }
};

export default Constants;
