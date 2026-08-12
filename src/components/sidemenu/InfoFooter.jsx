import { useContext } from 'react';
import Constants from '../../helpers/constants';
import SceneryContext from '../../contexts/SceneryContext';

export default function InfoFooter() {
    const { sceneryListData } = useContext(SceneryContext);
    const sceneryListVersionDate = sceneryListData?.info?.versionDate || null;

    const sceneryListText = sceneryListVersionDate ?
        `included sceneries as of ${sceneryListVersionDate}` :
        'included sceneries not available';

    return (
        <div className="info-footer">
            <span>TD2 Visualizer v{Constants.buildVersion}</span>
            <span>masuo 2025.06</span>
            <span>{sceneryListText}</span>
        </div>
    );
}