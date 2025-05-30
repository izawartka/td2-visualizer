import { useContext } from "react";
import MainContext from "../../contexts/MainContext";
import SettingsContext from "../../contexts/SettingsContext";

export default function SceneryLayer(props) {
    const { queueItem } = props;
    const { name, category, type, types, cond} = queueItem;
    const RendererComponent = queueItem.renderer;

    const settings = useContext(SettingsContext);
    const { scenery } = useContext(MainContext);

    if(!scenery) return;
    if(cond && !cond(settings)) return [null];
    const objects = scenery.objects[category] ?? null;
    if(!objects) return [null];

    return ( 
    <g className={`scenery-layer-${name}`} key={name}>
        {Object.values(objects).map((object) => {
            if(type !== undefined && type !== object.type) return null;
            if(types !== undefined && !types.includes(object.type)) return null;

            return <RendererComponent key={`${name}-${object.id}`} object={object} />;
        })}
    </g>
    );
}