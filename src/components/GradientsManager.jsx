import Constants from "../helpers/constants";
import {useContext, useMemo} from "react";
import GradientsContext from "../contexts/GradientsContext";
import SceneryContext from "../contexts/SceneryContext";

function getMinMax(trackColorMode, scenery) {
    if (trackColorMode === 'elevation') {
        if (!scenery) return null;
        if (scenery.trackElevationBounds.minY > scenery.trackElevationBounds.maxY) return null;

        const min = scenery.trackElevationBounds.minY;
        // Make sure diff > 0 even on flat sceneries
        let diff = Math.max(scenery.trackElevationBounds.maxY - scenery.trackElevationBounds.minY, 1);
        // Ensure `diff` is even so that the min, max and middle legend values are integers
        diff = Math.ceil(diff / 2)*2;
        const max = min + diff;

        return [min, max];
    }
    return null;
}

function createGradientSettings(trackColorMode, scenery, def) {
    if ('gradient' in def) return def.gradient;
    if ('dynamicGradient' in def) {
        const gradient = def.dynamicGradient;
        const [minValue, maxValue] = getMinMax(trackColorMode, scenery) ?? [gradient.defaultMin, gradient.defaultMax];

        const diff = gradient.min.map((min, i) => {
            const max = gradient.max[i];
            return (max - min) / (maxValue - minValue);
        });
        const base = gradient.min.map((min, i) => {
            return min - diff[i] * minValue;
        });

        return {
            base,
            diff,
            legendMin: minValue,
            legendMax: maxValue,
            unit: gradient.unit,
            startLegendAt0: gradient.startLegendAt0 ?? false,
        };
    }
    return null;
}

function createGradientDefs(scenery) {
    return Object.fromEntries(
        Object.entries(Constants.trackColorModes).map(
            ([mode, def]) => [mode, createGradientSettings(mode, scenery, def)],
        ),
    );
}

export function GradientsManager(props) {
    const { children } = props;
    const { scenery } = useContext(SceneryContext);

    const gradientDefs = useMemo(() => createGradientDefs(scenery), [scenery]);

    return (
        <GradientsContext.Provider value={{
            gradientDefs,
        }}>
            { children }
        </GradientsContext.Provider>
    );
}
