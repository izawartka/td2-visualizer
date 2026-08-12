import { useContext } from "react";
import SceneryContext from "../../contexts/SceneryContext";

export default function CustomFileSelect() {
    const {loadCustomScenery} = useContext(SceneryContext);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        await loadCustomScenery(file);
    };

    return (
        <div className='custom-file-select'>
            <input type='file' id='custom-file-input' onChange={handleFileChange} />
        </div>
    );
}
