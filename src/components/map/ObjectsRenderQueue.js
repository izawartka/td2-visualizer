import TrackRenderer from './object-renderers/TrackRenderer';
import SwitchNameRenderer from './object-renderers/SwitchNameRenderer';
import IsolationIdRenderer from './object-renderers/IsolationIdRenderer';
import TrackObjectRenderer from './object-renderers/TrackObjectRenderer';
import SignalRenderer from './object-renderers/SignalRenderer';
import RouteRenderer from './object-renderers/RouteRenderer';

const ObjectRendererQueue = [
    {
        'name': 'tracks',
        'category': 'tracks',
        'renderer': TrackRenderer,
        'cond': (settings) => settings.layers['tracks']
    },
    {
        'name': 'isolations-ids',
        'category': 'tracks',
        'renderer': IsolationIdRenderer,
        'cond': (settings) => settings.layers['isolations-ids']
    },
    {
        'name': 'switches-names',
        'category': 'switches',
        'type': 'Switch',
        'renderer': SwitchNameRenderer,
        'cond': (settings) => settings.layers['switches-names']
    },
    {
        'name': 'track-objects',
        'category': 'track-objects',
        'renderer': TrackObjectRenderer,
        'cond': (settings) => settings.layers['track-objects']
    },
    {
        'name': 'signals',
        'category': 'track-objects',
        'type': 'Signal',
        'renderer': SignalRenderer,
        'cond': (settings) => settings.layers['signals']
    },
    {
        'name': 'routes',
        'category': 'routes',
        'renderer': RouteRenderer,
        'cond': (settings) => settings.layers['routes']
    }
]

export default ObjectRendererQueue;