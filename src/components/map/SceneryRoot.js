import { useContext, useMemo } from "react";
import MainContext from "../../contexts/MainContext";
import ObjectsRenderQueue from "./ObjectsRenderQueue";
import SceneryLayer from "./SceneryLayer";

export default function SceneryRoot(props) {
    const { scenery } = useContext(MainContext);

    const SceneryContent = useMemo(() => {
        if (!scenery?.objects) return null;

        return ObjectsRenderQueue.map(queueItem => {
            return <SceneryLayer queueItem={queueItem} key={queueItem.name} />;
        });
    }, [scenery]);

    return (
        <g className='scenery-root'>
            { SceneryContent }
        </g>
    )
}