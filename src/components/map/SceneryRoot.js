import { useContext } from "react";
import MainContext from "../../contexts/MainContext";
import ObjectsRenderQueue from "./ObjectsRenderQueue";
import SceneryLayer from "./SceneryLayer";

export default function SceneryRoot(props) {
    const { scenery } = useContext(MainContext);
    if (!scenery) return null;

    return (
        <g className='scenery-root'>
            { ObjectsRenderQueue.map((queueItem) => 
                <SceneryLayer queueItem={queueItem} key={queueItem.name} />
            ) }
        </g>
    )
}