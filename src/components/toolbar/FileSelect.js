import { useContext } from "react";
import MainContext from "../../contexts/MainContext";
import SceneryParser from "../../model/scenery-parser";
import { showCustomDialog } from "../../services/dialogService";
import SceneryLoadedDialog from "../scenery-loaded-dialog/SceneryLoadedDialog";
import SceneryParserLog from "../../model/scenery-parser-log";
import { useZoomPanEmitter } from "../../hooks/useZoomPubSub";

export default function FileSelect() {
    const {setScenery, setIsLoading} = useContext(MainContext);
    const { center } = useZoomPanEmitter();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        SceneryParserLog.clear();
        setIsLoading(true);
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
            let loadingError = null;
            try {
                const scenery = SceneryParser.fromText(e.target?.result);
                setScenery(scenery);

                const mainSignalBoxPos = scenery.signalBoxes?.[0]?.pos || null;
                if (mainSignalBoxPos) center(...mainSignalBoxPos.toSVGCoords());
            } catch (error) {
                loadingError = error;
                setScenery(null);
                console.error(error);
            } 

            setIsLoading(false);
            showCustomDialog(<SceneryLoadedDialog loadingError={loadingError} />);
        }
    };

    return (
        <div className='file-select'>
            <input type='file' id='file-input' onChange={handleFileChange} />
        </div>
    );
}