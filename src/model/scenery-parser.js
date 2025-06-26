import Scenery from './scenery';
import { tracksConnectionTest } from './tracks-connection-test';
import Switch from './switch';
import StandardTrack from './tracks/standard-track';
import BezierTrack from './tracks/bezier-track';
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

/*
TODO: add support for WorldRotation and WorldTranslation
*/

export default class SceneryParser {
    static fromText(scText) {
        const lines = scText.split("\n").map(line => line.trim());
        const scenery = new Scenery();

        lines.forEach((line, index) => {
            if(index === 0) {
                const sceneryInfo = SceneryParser._parseSceneryInfo(line);
                if(sceneryInfo) scenery.addObject(sceneryInfo);
                return;
            }
            if(!line?.length) return; 

            const object = SceneryParser._parseObject(line);
            if(!object) return; // skip null objects
            scenery.addObject(object);
        });

        scenery.applyObjects();

        if(Constants.parser.resolveElectrification) ElectrificationResolver.resolveScenery(scenery);
        if(Constants.parser.runTracksConnectionTest) tracksConnectionTest(scenery);
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

        if(type.indexOf("Forest") !== -1 || type.indexOf("Empty") !== -1) {
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
                return SceneryParser._parseMisc(text);
            case 'CameraHome':
                return CameraHome.fromText(text);
            case 'MainCamera':
                return MainCamera.fromText(text);
            case 'EndRoute':
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
            case '':
                return null;
            default:
                SceneryParserLog.warn('unknownObjectType', `Unknown object type: ${type}`);
                return null;
        };
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

    static _parseMisc(text) {
        const prefabName = text.split(';', 4)[2];

        if(prefabName.startsWith("SignalBox")) {
            return SignalBox.fromText(Scenery.nextMiscId++, text);
        } else {
            return Misc.fromText(Scenery.nextMiscId++, text);
        }
    }
}