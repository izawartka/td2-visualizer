import TrackRenderer from './object-renderers/TrackRenderer';
import SwitchNameRenderer from './object-renderers/SwitchNameRenderer';
import IsolationIdRenderer from './object-renderers/IsolationIdRenderer';
import TrackObjectRenderer from './object-renderers/TrackObjectRenderer';
import SignalRenderer from './object-renderers/SignalRenderer';
import RouteRenderer from './object-renderers/RouteRenderer';
import SignalBoxRenderer from './object-renderers/SignalBoxRenderer';
import SignRenderer from './object-renderers/SignRenderer';
import NEVPRenderer from './object-renderers/NEVPRenderer';
import ElectrificationStatusPopup from './additional-layer-components/ElectrificationStatusPopup';

const ObjectRendererQueue = [
    {
        'name': 'tracks',
        'category': 'tracks',
        'renderer': TrackRenderer,
        'additionalComponents': [
            ElectrificationStatusPopup
        ],
        'cond': (layers) => layers['tracks']
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
        'name': 'signs',
        'category': 'track-objects',
        'type': 'Sign',
        'renderer': SignRenderer,
        'cond': (layers) => layers['signs']
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