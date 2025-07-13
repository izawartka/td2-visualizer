import React, { useContext, useMemo, memo } from "react";
import MainContext from "../../contexts/MainContext";
import SettingsContext from "../../contexts/SettingsContext";
import Constants from "../../helpers/constants";

export default function SceneryLayer(props) {
    const { queueItem } = props;
    const { name, category, type, types, cond, renderer: Renderer, additionalComponents: AdditionalComponents } = queueItem;
    const { scenery } = useContext(MainContext);
    const { layers } = useContext(SettingsContext);

    const isVisible = (cond ? cond(layers) : true);

    const objects = useMemo(() => {
        if (!scenery || !isVisible) return [];

        const getCategoryObjects = (category) => {
            const categoryObjs = scenery.objects[category];
            if (!categoryObjs) return [];
            return Object.values(categoryObjs);
        }
        // flatMap is not used in the case of a single category to avoid an unnecessary array copy
        if (typeof category === 'string') return getCategoryObjects(category);
        return category.flatMap(getCategoryObjects);
    }, [scenery, category, isVisible]);

    if (!scenery || !isVisible) return null;

    const pointerEvents = Constants.map.forcePointerEvents || queueItem.pointerEvents || false;

    return (
        <MemoizedSceneryLayer
            name={name}
            Renderer={Renderer}
            objects={objects}
            type={type}
            types={types}
            pointerEvents={pointerEvents}
            AdditionalComponents={AdditionalComponents}
        />
    );
}

const MemoizedSceneryLayer = memo(StatelessSceneryLayer);


function StatelessSceneryLayer({ name, Renderer, objects, type, types, pointerEvents = false, AdditionalComponents = [] }) {
    return (
        <g
            className={`scenery-layer-${name}`}
            pointerEvents={pointerEvents ? "all" : "none"}
        >
            {objects.map((obj) => {
                if (type !== undefined && type !== obj.type) return null;
                if (types !== undefined && !types.includes(obj.type)) return null;
                return <Renderer key={`${name}-${obj.id}`} object={obj} />;
            })}
            { AdditionalComponents.map((Component, index) => (
                <Component key={`${name}-additional-${index}`} />
            ))}
        </g>
    );
}
