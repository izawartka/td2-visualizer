import SceneryParser from "../model/scenery-parser";
import SceneryParserLog from "../model/scenery-parser-log";
import { showCustomDialog } from "../services/dialogService";
import SceneryLoadedDialog from "../components/scenery-loaded-dialog/SceneryLoadedDialog";

export default class SceneryFilesHelper {
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