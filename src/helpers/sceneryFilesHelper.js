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

    static async load(name, setCameraFn = null) {
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

        return await this.loadCustom(file, setCameraFn);
    }

    static async loadCustom(file, setCameraFn = null) {
        return new Promise((resolve, reject) => {
            SceneryParserLog.clear();
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                let scenery = null;
                let loadingError = null;
                try {
                    scenery = SceneryParser.fromText(e.target?.result);
                    const mainSignalBox = scenery.signalBoxes?.[0];
                    if(mainSignalBox) {
                        const sbPos = mainSignalBox.pos.toSVGCoords();
                        const sbRot = -mainSignalBox.getFinalRotation();
                        setCameraFn(...sbPos, sbRot, Constants.map.zoomDefault);
                    }
                    else setCameraFn(0, 0, 0, Constants.map.zoomDefault);
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