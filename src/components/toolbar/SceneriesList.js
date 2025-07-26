import { useContext, useCallback, useState, useEffect } from 'react';
import SceneryContext from '../../contexts/SceneryContext';
import { setSceneriesListVersionDate } from '../../services/sceneriesListService';
import Constants from '../../helpers/constants';

export default function SceneriesList() {
    const {getSceneryList, loadScenery} = useContext(SceneryContext);
    const [ sceneriesListData, setSceneriesListData ] = useState(null);

    const handleSelectChange = async (event) => {
        const name = event.target.value;
        if (!name) return;
        await loadScenery(name);
    };

    const updateSceneryList = useCallback(async () => {
        const sceneryListData = await getSceneryList();
        setSceneriesListData(sceneryListData);
        setSceneriesListVersionDate(sceneryListData?.info?.versionDate || null);
    }, [getSceneryList]);

    useEffect(() => {
        if(Constants.sceneryFiles.fetchDisable) return;
        updateSceneryList();
    }, [updateSceneryList]);

    return (
        <div className='sceneries-list'>
            <select onChange={handleSelectChange} defaultValue="">
                <option value="" disabled>Select a scenery</option>
                {Array.isArray(sceneriesListData?.list) && sceneriesListData.list.map((name) => (
                    <SceneriesListOption key={name} name={name} />
                ))}
            </select>
        </div>
    );
}

function SceneriesListOption({ name }) {
    // remove .lite.sc or .sc
    const regex = /\.(lite\.)?sc$/i;
    const displayName = name.replace(regex, ''); 

    return (
        <option value={name}>{displayName}</option>
    );
}