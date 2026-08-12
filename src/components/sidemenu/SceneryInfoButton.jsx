import { useContext } from "react";
import SceneryContext from "../../contexts/SceneryContext";
import { showCustomDialog } from "../../services/dialogService";
import SceneryInfoDialog from "../scenery-info-dialog/SceneryInfoDialog";

export default function SceneryInfoButton(props) {
    const { scenery } = useContext(SceneryContext);

    const onButtonClick = (event) => {
        showCustomDialog(<SceneryInfoDialog scenery={scenery}/>);
    };

    return (
        <div className="scenery-info-button">
            <button 
                onClick={onButtonClick}
                disabled={!scenery}
            >
                Scenery info
            </button>
        </div>
    );
}
