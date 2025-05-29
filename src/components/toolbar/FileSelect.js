import { useContext } from "react";
import MainContext from "../../contexts/MainContext";
import Scenery from "../../model/scenery";

export default function FileSelect() {
    const {setScenery, setIsLoading} = useContext(MainContext);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsLoading(true);
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
            setIsLoading(false);
            if(!e.target || !e.target.result) {
                console.error("File reading failed or no content found.");
            }

            const scenery = Scenery.fromText(e.target.result);
            setScenery(scenery);
        }
    };

    return (
        <div className='file-select'>
            <input type='file' id='file-input' onChange={handleFileChange} />
        </div>
    );
}