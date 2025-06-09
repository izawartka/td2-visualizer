import { useContext } from "react";
import MainContext from "../../contexts/MainContext";
import Scenery from "../../model/scenery";
import { showCustomDialog } from "../../services/dialogService";
import SceneryLoadedDialog from "../scenery-loaded-dialog/SceneryLoadedDialog";
import SceneryParserLog from "../../model/scenery-parser-log";

export default function FileSelect() {
    const {setScenery, setIsLoading} = useContext(MainContext);

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
                const scenery = Scenery.fromText(e.target?.result);
                setScenery(scenery);
            } catch (error) {
                loadingError = error;
                setScenery(null);
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