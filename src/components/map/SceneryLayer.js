import { useContext, useMemo, memo, useCallback, useRef, useEffect } from "react";
import SceneryContext from "../../contexts/SceneryContext";
import SettingsContext from "../../contexts/SettingsContext";
import Constants from "../../helpers/constants";
import { mapZoomObjectDetails$ } from "../../services/mapZoomService";

export default function SceneryLayer(props) {
    const { queueItem } = props;
    const { 
        name, 
        category, 
        type, 
        types, 
        trackSources, 
        cond, 
        renderer: Renderer, 
        additionalComponents: AdditionalComponents, 
        usesObjectDetails 
    } = queueItem;
    const { scenery } = useContext(SceneryContext);
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
            trackSources={trackSources}
            pointerEvents={pointerEvents}
            AdditionalComponents={AdditionalComponents}
            usesObjectDetails={usesObjectDetails || false}
        />
    );
}

const MemoizedSceneryLayer = memo(StatelessSceneryLayer);


function StatelessSceneryLayer({ name, Renderer, objects, type, types, trackSources, pointerEvents = false, AdditionalComponents = [], usesObjectDetails }) {
    const layerRef = useRef(null);

    const handleDetailsUpdate = useCallback((details) => {
        if (!layerRef.current) return;

        if (details) {
            layerRef.current.style.display = '';
        }
        else {
            layerRef.current.style.display = 'none';
        }
    }, []);

    useEffect(() => {
        if (!usesObjectDetails) return;
        const subscription = mapZoomObjectDetails$.subscribe(details => {
            handleDetailsUpdate(details);
        });

        return () => subscription.unsubscribe();
    }, [handleDetailsUpdate, usesObjectDetails]);

    return (
        <g
            ref={layerRef}
            className={`scenery-layer-${name}`}
            pointerEvents={pointerEvents ? "all" : "none"}
            export-force-visible="true"
        >
            {objects.map((obj) => {
                if (type !== undefined && type !== obj.type) return null;
                if (types !== undefined && !types.includes(obj.type)) return null;
                if (trackSources !== undefined && obj.category === 'tracks' && !trackSources.includes(obj.source)) return null;
                return <Renderer key={`${name}-${obj.id}`} object={obj} />;
            })}
            { AdditionalComponents.map((Component, index) => (
                <Component key={`${name}-additional-${index}`} />
            ))}
        </g>
    );
}
