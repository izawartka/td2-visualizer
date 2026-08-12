import { useContext } from 'react';
import SceneryContext from '../../contexts/SceneryContext';

export default function SceneryList() {
    const { sceneryListData, loadScenery} = useContext(SceneryContext);

    const handleSelectChange = async (event) => {
        const name = event.target.value;
        if (!name) return;
        await loadScenery(name);
    };

    return (
        <div className='scenery-list'>
            <select onChange={handleSelectChange} defaultValue="">
                <option value="" disabled>Select a scenery</option>
                {Array.isArray(sceneryListData?.list) && sceneryListData.list.map((name) => (
                    <SceneryListOption key={name} name={name} />
                ))}
            </select>
        </div>
    );
}

function SceneryListOption({ name }) {
    // remove .lite.sc or .sc
    const regex = /\.(lite\.)?sc$/i;
    const displayName = name.replace(regex, ''); 

    return (
        <option value={name}>{displayName}</option>
    );
}