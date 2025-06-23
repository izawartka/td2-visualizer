import Constants from "./constants";
import SceneryParser from "../model/scenery-parser";
import SceneryParserLog from "../model/scenery-parser-log";
import { showCustomDialog } from "../services/dialogService";
import SceneryLoadedDialog from "../components/scenery-loaded-dialog/SceneryLoadedDialog";

export default class SceneryFilesHelper {
    static async fetch(url, toJson) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return toJson ? await response.json() : await response.blob();
        } catch (error) {
            console.error(`Failed to fetch from ${url}:`, error);
            throw error;
        }
    }

    static async getList() {
        try {
            const url = Constants.sceneryFiles.fetchListUrl;
            return await this.fetch(url, true);
        } catch(error) {
            console.error(`Failed to fetch sceneries list`);
            return null;
        }
    }

    static async getScenery(name) {
        const url = `${Constants.sceneryFiles.fetchBaseUrl}/${name}`;
        return await this.fetch(url, false);
    }

    static async load(name, centerFn = null) {
        const file = await this.getScenery(name);
        return await this.loadCustom(file, centerFn);
    }

    static async loadCustom(file, centerFn = null) {
        return new Promise((resolve, reject) => {
            SceneryParserLog.clear();
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                let scenery = null;
                let loadingError = null;
                try {
                    scenery = SceneryParser.fromText(e.target?.result);
                    const mainSignalBoxPos = scenery.signalBoxes?.[0]?.pos || null;
                    if (mainSignalBoxPos) centerFn(...mainSignalBoxPos.toSVGCoords());
                } catch (error) {
                    scenery = null;
                    loadingError = error;
                    console.error(error);
                } 

                showCustomDialog(<SceneryLoadedDialog loadingError={loadingError} />);
                resolve(scenery);
            }
        });
    }
}