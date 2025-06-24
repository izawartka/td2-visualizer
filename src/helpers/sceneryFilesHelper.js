import Constants from "./constants";
import SceneryParser from "../model/scenery-parser";
import SceneryParserLog from "../model/scenery-parser-log";
import { showCustomDialog, showDialog } from "../services/dialogService";
import SceneryLoadedDialog from "../components/scenery-loaded-dialog/SceneryLoadedDialog";

export default class SceneryFilesHelper {
    static async fetch(url, toJson) {
        const response = await fetch(url);
            
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return toJson ? await response.json() : await response.blob();
    }

    static async getList() {
        try {
            const url = Constants.sceneryFiles.fetchListUrl;
            return await this.fetch(url, true);
        } catch(error) {
            console.error(`Failed to fetch sceneries list`, error);
            return null;
        }
    }

    static async getScenery(name) {
        const url = `${Constants.sceneryFiles.fetchBaseUrl}/${name}`;
        return await this.fetch(url, false);
    }

    static async load(name, centerFn = null) {
        let file;
        try {
            file = await this.getScenery(name);
        } catch (error) {
            console.error(`Failed to load scenery file ${name}`, error);
            showDialog(<>
                Failed to download scenery file<br />
                {error.message}
            </>);
            return null;
        }

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