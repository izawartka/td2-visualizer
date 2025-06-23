import { useContext, useState, useEffect } from 'react';
import MainContext from '../../contexts/MainContext';
import { useZoomPanEmitter } from '../../hooks/useZoomPubSub';
import SceneryFilesHelper from '../../helpers/sceneryFilesHelper';

export default function SceneriesList(props) {
    const {setScenery, setIsLoading} = useContext(MainContext);
    const [ sceneryNames, setSceneryNames ] = useState(null);
    const { center } = useZoomPanEmitter();

    const handleSelectChange = async (event) => {
        const name = event.target.value;

        setIsLoading(true);
        const scenery = await SceneryFilesHelper.load(name, center);
        setScenery(scenery);
        setIsLoading(false);
    };

    const updateSceneryList = async () => {
        const sceneries = await SceneryFilesHelper.getList();
        setSceneryNames(sceneries);
    };

    useEffect(() => {
        updateSceneryList();
    }, []);

    return (
        <div className='sceneries-list'>
            <select onChange={handleSelectChange} defaultValue="">
                <option value="" disabled>Select a scenery</option>
                {Array.isArray(sceneryNames) && sceneryNames.map((name) => (
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