import Scenery from './scenery';
import Switch from './switch';
import StandardTrack from './tracks/standard-track';
import TrackObject from './track-objects/track-object';
import Signal from './track-objects/signal';
import Route from './route';
import Misc from './misc';
import SceneryParserLog from './scenery-parser-log';
import SignalBox from './signalbox';
import Constants from '../helpers/constants';
import SceneryInfo from './special-objects/scenery-info';
import Sign from './track-objects/sign';
import CameraHome from './special-objects/camera-home';
import MainCamera from './special-objects/main-camera';
import ElectrificationResolver from './electrification-resolver';
import NEVP from './track-objects/nevp';
import Derailer from './track-objects/derailer';
import SpawnPoint from './track-objects/spawn-point';
import { attachSigns } from './attach-signs';
import {connectTracks} from "./connect-tracks";

/*
TODO: add support for WorldRotation and WorldTranslation
*/

export default class SceneryParser {
    static fromText(scText) {
        const lines = scText.split("\n").map(line => line.trim());
        const scenery = new Scenery();

        let currentRoute = null;

        lines.forEach((line, index) => {
            if(index === 0) {
                const sceneryInfo = SceneryParser._parseSceneryInfo(line);
                if(sceneryInfo) scenery.addObject(sceneryInfo);
                return;
            }
            if(!line?.length) return;

            if (currentRoute !== null) {
                const foundRouteEnd = SceneryParser._parseRouteLine(line, currentRoute);
                if (foundRouteEnd) {
                    scenery.addObject(currentRoute);
                    currentRoute = null;
                }
            } else {
                const object = SceneryParser._parseObject(line);
                if(!object) return; // skip null objects
                if (object.type === 'Route') {
                    currentRoute = object;
                } else {
                    scenery.addObject(object);
                }
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

    static _parseObject(text) {
        const type = text.split(";", 2)[0];

        if (type === '' || type === 'EndRoute' || type.indexOf("Forest") !== -1 || type.indexOf("Empty") !== -1) {
            SceneryParserLog.warn('unknownObjectType', `Unexpected entry of type ${type} without a preceding Route object`);
            return null;
        }

        switch(type) {
            case 'Track':
                return StandardTrack.fromText(text);
            case 'TrackStructure':
                return Switch.fromText(text);
            case 'TrackObject':
                return SceneryParser._parseTrackObject(text);
            case 'Route':
                return Route.fromText(text);
            case 'Misc':
                return SceneryParser._parseMisc(text);
            case 'CameraHome':
                return CameraHome.fromText(text);
            case 'MainCamera':
                return MainCamera.fromText(text);
            case 'MiscGroup':
            case 'EndMiscGroup':
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
                return null;
            default:
                SceneryParserLog.warn('unknownObjectType', `Unknown object type: ${type}`);
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

    static _parseMisc(text) {
        const prefabName = text.split(';', 4)[2];

        if(prefabName.startsWith("SignalBox")) {
            return SignalBox.fromText(Scenery.nextMiscId++, text);
        } else {
            return Misc.fromText(Scenery.nextMiscId++, text);
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
