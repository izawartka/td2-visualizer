import { useContext } from "react";
import SceneryContext from "../../contexts/SceneryContext";
import ExportHelper from "../../helpers/exportHelper";

export default function ExportViewButton() {
    const { scenery } = useContext(SceneryContext);

    const onButtonClick = () => {
        const filename = (scenery.getName() || 'export') + '.svg';
        ExportHelper.exportSvg(filename);
    };

    return (
        <div className="export-view-button">
            <button 
                onClick={onButtonClick}
                disabled={!scenery}
            >
                Export current view
            </button>
        </div>
    );
}
