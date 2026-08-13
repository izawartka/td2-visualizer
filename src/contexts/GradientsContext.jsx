import {createContext, useContext, useMemo} from "react";
import Constants from "../helpers/constants";
import SceneryContext from "./SceneryContext";

const GradientsContext = createContext();
export default GradientsContext;

function getMinMax(trackColorMode, scenery, gradient) {
    const sceneryGradientBounds = scenery?.dynamicGradientBounds?.[trackColorMode];
    if (!sceneryGradientBounds) return null;

    if (sceneryGradientBounds.min > sceneryGradientBounds.max) return null;

    const min = Math.max(sceneryGradientBounds.min, gradient.limitMin ?? -Infinity);
    const initialMax = Math.min(sceneryGradientBounds.max, gradient.limitMax ?? Infinity);
    let diff = Math.max(initialMax - min, 1);

    // Ensure `diff` is even so that the min, max and middle legend values are integers
    diff = Math.ceil(diff / 2)*2;
    const max = min + diff;

    return [min, max];
}

function createGradientSettings(trackColorMode, scenery, def) {
    if ('gradient' in def) return def.gradient;
    if ('dynamicGradient' in def) {
        const gradient = def.dynamicGradient;
        const [minValue, maxValue] = getMinMax(trackColorMode, scenery, gradient) 
            ?? [gradient.defaultMin, gradient.defaultMax];

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

export function GradientsContextProvider({children}) {
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
