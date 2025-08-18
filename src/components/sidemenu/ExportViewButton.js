import { useCallback, useContext } from "react";
import SceneryContext from "../../contexts/SceneryContext";
import SideMenuContext from "../../contexts/SideMenuContext";
import ExportHelper from "../../helpers/exportHelper";
import Constants from "../../helpers/constants";

export default function ExportViewButton() {
    const { scenery } = useContext(SceneryContext);
    const { setSideMenuOpen } = useContext(SideMenuContext);

    const onButtonClick = useCallback(async () => {
        const mapElement = document.querySelector('.map');

        setSideMenuOpen(false);
        await new Promise(resolve => setTimeout(resolve, Constants.svgExport.hidePanelDuration));
        mapElement.classList.add('export-border');
        await new Promise(resolve => setTimeout(resolve, Constants.svgExport.borderDuration));
        mapElement.classList.remove('export-border');

        const filename = (scenery.getName() || 'export') + '.svg';
        ExportHelper.exportSvg(filename);

        setSideMenuOpen(true);
    }, [scenery, setSideMenuOpen]);

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
