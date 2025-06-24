import { useContext } from "react";
import MainContext from "../../contexts/MainContext";
import { useZoomPanEmitter } from "../../hooks/useZoomPubSub";
import SceneryFilesHelper from "../../helpers/sceneryFilesHelper";
import { resetHoveredTracksStack } from "../../services/trackHoverInfoService";

export default function CustomFileSelect() {
    const {setScenery, setIsLoading} = useContext(MainContext);
    const { center } = useZoomPanEmitter();

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsLoading(true);
        const scenery = await SceneryFilesHelper.loadCustom(file, center);
        setScenery(scenery);
        resetHoveredTracksStack();
        setIsLoading(false);
    };

    return (
        <div className='custom-file-select'>
            <input type='file' id='custom-file-input' onChange={handleFileChange} />
        </div>
    );
}
