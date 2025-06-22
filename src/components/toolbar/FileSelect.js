import { useContext } from "react";
import MainContext from "../../contexts/MainContext";
import { useZoomPanEmitter } from "../../hooks/useZoomPubSub";
import SceneryFilesHelper from "../../helpers/sceneryFilesHelper";

export default function FileSelect() {
    const {setScenery, setIsLoading} = useContext(MainContext);
    const { center } = useZoomPanEmitter();

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsLoading(true);
        const scenery = await SceneryFilesHelper.loadCustom(file, center);
        setScenery(scenery);
        setIsLoading(false);
    };

    return (
        <div className='file-select'>
            <input type='file' id='file-input' onChange={handleFileChange} />
        </div>
    );
}