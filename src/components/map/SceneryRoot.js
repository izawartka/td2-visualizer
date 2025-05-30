import { useContext, useMemo } from "react";
import MainContext from "../../contexts/MainContext";
import ObjectsRenderQueue from "./ObjectsRenderQueue";
import SettingsContext from "../../contexts/SettingsContext";

export default function SceneryRoot(props) {
    const { scenery } = useContext(MainContext);
    const settings = useContext(SettingsContext);

    const content = useMemo(() => {
        if(!scenery) return null;

        return ObjectsRenderQueue.map((queueItem) => {
            const { name, category, type, types, cond} = queueItem;
            const RendererComponent = queueItem.renderer;
            if(cond && !cond(settings)) return [null];

            const objects = scenery.objects[category] ?? null;
            if(!objects) return [null];

            return ( 
            <g className={`scenery-layer-${name}`} key={name}>
                {Object.values(objects).map((object) => {
                    if((type !== undefined && type !== object.type) || (types !== undefined && !types.includes(object.type))) return null;

                    return <RendererComponent key={`${name}-${object.id}`} object={object} />;
                })}
            </g>
            );
        });
    }, [scenery, settings]);

    return (
        <g className='scenery-root'>
            {content}
        </g>
    )
}