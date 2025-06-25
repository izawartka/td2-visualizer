import TrackRenderer from './object-renderers/TrackRenderer';
import SwitchNameRenderer from './object-renderers/SwitchNameRenderer';
import IsolationIdRenderer from './object-renderers/IsolationIdRenderer';
import TrackObjectRenderer from './object-renderers/TrackObjectRenderer';
import SignalRenderer from './object-renderers/SignalRenderer';
import RouteRenderer from './object-renderers/RouteRenderer';
import SignalBoxRenderer from './object-renderers/SignalBoxRenderer';
import SignRenderer from './object-renderers/SignRenderer';
import NEVPRenderer from './object-renderers/NEVPRenderer';
import DerailerRenderer from './object-renderers/DerailerRenderer';
import ElectrificationStatusPopup from './additional-layer-components/ElectrificationStatusPopup';
import SpawnPointRenderer from './object-renderers/SpawnPointRenderer';

const ObjectRendererQueue = [
    {
        'name': 'tracks',
        'category': 'tracks',
        'renderer': TrackRenderer,
        'additionalComponents': [
            ElectrificationStatusPopup
        ],
        'cond': (layers) => layers['tracks'],
        'pointerEvents': true
    },
    {
        'name': 'isolations-ids',
        'category': 'tracks',
        'renderer': IsolationIdRenderer,
        'cond': (layers) => layers['isolations-ids']
    },
    {
        'name': 'switches-names',
        'category': 'switches',
        'type': 'Switch',
        'renderer': SwitchNameRenderer,
        'cond': (layers) => layers['switches-names']
    },
    {
        'name': 'derailers',
        'category': 'track-objects',
        'type': 'Derailer',
        'renderer': DerailerRenderer,
        'cond': (layers) => layers['derailers']
    },
    {
        'name': 'nevps',
        'category': 'track-objects',
        'type': 'NEVP',
        'renderer': NEVPRenderer,
        'cond': (layers) => layers['nevps']
    },
    {
        'name': 'signals',
        'category': 'track-objects',
        'type': 'Signal',
        'renderer': SignalRenderer,
        'cond': (layers) => layers['signals']
    },
    {
        'name': 'signs',
        'category': 'track-objects',
        'type': 'Sign',
        'renderer': SignRenderer,
        'cond': (layers) => layers['signs']
    },
    {
        'name': 'spawn-points',
        'category': 'track-objects',
        'type': 'SpawnPoint',
        'renderer': SpawnPointRenderer,
        'cond': (layers) => layers['spawn-points'],
    },
    {
        'name': 'signalboxes',
        'category': 'misc',
        'type': 'SignalBox',
        'renderer': SignalBoxRenderer,
        'cond': (layers) => layers['signalboxes']
    },
    {
        'name': 'routes',
        'category': 'routes',
        'renderer': RouteRenderer,
        'cond': (layers) => layers['routes']
    },
    {
        'name': 'track-objects',
        'category': 'track-objects',
        'renderer': TrackObjectRenderer,
        'cond': (layers) => layers['track-objects'],
        'pointerEvents': true
    }
]

export default ObjectRendererQueue;