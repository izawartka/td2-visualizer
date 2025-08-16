import Scenery from '../scenery';
import Switch from '../switch';
import StandardTrack from '../tracks/standard-track';
import BezierTrack from '../tracks/bezier-track';
import TrackObject from '../track-objects/track-object';
import Signal from '../track-objects/signal';
import Route from '../route';
import Misc from '../misc/misc';
import SceneryParserLog from './scenery-parser-log';
import SignalBox from '../misc/signalbox';
import Constants from '../../helpers/constants';
import SceneryInfo from '../special-objects/scenery-info';
import Sign from '../track-objects/sign';
import CameraHome from '../special-objects/camera-home';
import MainCamera from '../special-objects/main-camera';
import ElectrificationResolver from './electrification-resolver';
import NEVP from '../track-objects/nevp';
import Derailer from '../track-objects/derailer';
import SpawnPoint from '../track-objects/spawn-point';
import Platform from '../misc/platform';
import { attachSigns } from './attach-signs';
import {connectTracks} from "./connect-tracks";
import MiscGroup from '../misc-group';

export default class SceneryParser {
    static nextMiscId = 1;

    static fromText(scText) {
        SceneryParser.nextMiscId = 1;
        const lines = scText.split("\n").map(line => line.trim());
        const scenery = new Scenery();

        let currentRoute = null;
        const currentMiscGroups = [];

        lines.forEach((line, index) => {
            if(index === 0) {
                const sceneryInfo = SceneryParser._parseSceneryInfo(line);
                if(sceneryInfo) scenery.addObject(sceneryInfo);
                return;
            }

            if(!line?.length) return;

            if (currentRoute !== null) {
                const isRouteEnd = SceneryParser._parseRouteLine(line, currentRoute);
                
                if (isRouteEnd) {
                    scenery.addObject(currentRoute);
                    currentRoute = null;
                }

                return;
            }

            const object = SceneryParser._parseObject(line, currentMiscGroups);
            if(!object) return; // skip null objects

            switch(object.type) {
                case 'Route':
                    currentRoute = object;
                    return; // do not add Route object yet
                default:
                    scenery.addObject(object);
                    break;
            }
        });

        scenery.applyObjects();
        connectTracks(scenery);

        if(Constants.parser.resolveElectrification) ElectrificationResolver.resolveScenery(scenery);
        if(Constants.parser.attachSigns) attachSigns(scenery);
        if(Constants.parser.logSceneryAfterFinished) console.log(scenery);

        return scenery;
    }

    static _parseSceneryInfo(text) {
        const infoHeader = text.split(";", 2)[0];
        if(!infoHeader.startsWith("scv")) {
            SceneryParserLog.error('invalidSceneryInfo', `Invalid scenery info header: ${infoHeader}`);
        }

        const version = parseInt(infoHeader.split("v")[1]);
        if(version !== Constants.parser.sceneryInfoVersion) {
            SceneryParserLog.warn('invalidSceneryInfoVersion', `Invalid scenery info version: ${version}. Expected: ${Constants.parser.sceneryInfoVersion}`);
        }

        return SceneryInfo.fromText(text);
    }

    static _parseObject(text, currentMiscGroups) {
        const type = text.split(";", 2)[0];

        if (type === 'EndRoute' || type.indexOf("Forest") !== -1 || type.indexOf("Empty") !== -1) {
            SceneryParserLog.warn('unknownObjectType', `Unexpected entry of type ${type} without a preceding Route object`);
            return null;
        }

        switch(type) {
            case 'Track':
                return SceneryParser._parseTrack(text);
            case 'TrackStructure':
                return Switch.fromText(text);
            case 'TrackObject':
                return SceneryParser._parseTrackObject(text);
            case 'Route':
                return Route.fromText(text);
            case 'Misc':
                return SceneryParser._parseMisc(text, currentMiscGroups);
            case 'CameraHome':
                return CameraHome.fromText(text);
            case 'MainCamera':
                return MainCamera.fromText(text);
            case 'MiscGroup':
                const group = MiscGroup.fromText(text);
                currentMiscGroups.unshift(group);

                return null;
            case 'EndMiscGroup':
                if(!currentMiscGroups.shift()) {
                    SceneryParserLog.warn('endMiscGroupWithoutStart', 'Unexpected EndMiscGroup found without a preceding MiscGroup');
                }

                return null;
            case 'Wires':
            case 'Fence':
            case 'TerrainPoint':
            case 'shv001':
            case 'WorldRotation':
            case 'WorldTranslation':
            case 'SSPRepeater':
            case 'SSPController':
            case 'TerrainGroup':
            case 'EndTerrainGroup':
            case '':
                return null;
            default:
                SceneryParserLog.warn('unknownObjectType', `Unknown object type: ${type}`);
                return null;
        }
    }

    static _parseTrack(text) {
        const trackType = text.split(';', 4)[2];
        switch(trackType) {
            case 'Track':
                return StandardTrack.fromText(text);
            case 'BTrack':
                return BezierTrack.fromText(text);
            default:
                SceneryParserLog.warn('unknownTrackType', `Unknown track type: ${trackType}`);
                return null;
        }
    }

    static _parseTrackObject(text) {
        if(Sign.isSign(text)) {
            return Sign.fromText(text);
        } else if(Signal.isSignal(text)) {
            return Signal.fromText(text);
        } else if(Derailer.isDerailer(text)) {
            return Derailer.fromText(text);
        } else if(NEVP.isNEVP(text)) {
            return NEVP.fromText(text);
        } else if(SpawnPoint.isSpawnPoint(text)) {
            return SpawnPoint.fromText(text);
        } else {
            return TrackObject.fromText(text);
        }
    }

    static _parseMisc(text, miscGroups) {
        const prefabName = text.split(';', 4)[2];
        const id = SceneryParser.nextMiscId++;

        if (Platform.isPlatform(prefabName)) {
            if(Constants.parser.skipPlatforms) return null;
            return Platform.fromText(id, text, miscGroups);
        } else if(SignalBox.isSignalBox(prefabName)) {
            return SignalBox.fromText(id, text, miscGroups);
        } else {
            if(Constants.parser.skipBaseMisc) return null;
            return Misc.fromText(id, text, miscGroups);
        }
    }

    // Returns true if EndRoute was found, false otherwise
    static _parseRouteLine(text, route) {
        if (text === 'EndRoute') return true;
        const fields = text.split(';');
        if (fields.length < 4) {
            SceneryParserLog.warn('routeInvalidSegment', `Invalid route segment: "${text}", not enough fields`);
            return;
        }
        const trackIds = fields[3]
            .split(',')
            .map(segment => {
                const id = segment.split(':')[0].trim();
                if (id === '') return null;
                return id;
            });
        if (trackIds.some(id => id === null || isNaN(id))) {
            SceneryParserLog.warn('routeInvalidSegment', `Invalid route segment track IDs: ${fields[3]}`);
            return;
        }
        route.addSegment(
            parseInt(fields[1]), // length
            parseInt(fields[2]), // radius
            trackIds,
        );
        return false;
    }
}
