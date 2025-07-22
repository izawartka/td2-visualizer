import Constants from "../helpers/constants";
import {useMemo} from "react";
import GradientsContext from "../contexts/GradientsContext";

function getMinMax(trackColorMode, scenery) {
    if (trackColorMode === 'elevation') {
        if (!scenery) return null;
        if (scenery.trackElevationBounds.minY > scenery.trackElevationBounds.maxY) return null;

        // Ensure min and max values are even so that the min, max and middle values are integers
        const min = Math.floor(scenery.trackElevationBounds.minY/2)*2;
        let max = Math.ceil((scenery.trackElevationBounds.maxY)/2)*2;
        // Make sure max > min even on flat sceneries, otherwise `diff` calculation would result in division by 0
        if (max <= min) max = min + 2;

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
    const { children, scenery } = props;

    const gradientDefs = useMemo(() => createGradientDefs(scenery), [scenery]);

    return (
        <GradientsContext.Provider value={{
            gradientDefs,
        }}>
            { children }
        </GradientsContext.Provider>
    );
}
