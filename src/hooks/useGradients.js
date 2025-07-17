import {useMemo} from 'react';
import Constants from "../helpers/constants";

class Gradients {
    gradientSettings;

    constructor(trackElevationBounds) {
        this.trackElevationBounds = trackElevationBounds;
        this.gradientSettings = Object.fromEntries(
            Object.entries(Constants.trackColorModes).map(
                ([mode, def]) => [mode, this._createGradientSettings(mode, def)],
            ),
        );
    }

    _getMinMax(trackColorMode) {
        if (trackColorMode === 'elevation') {
            if (!this.trackElevationBounds) return null;
            if (this.trackElevationBounds.minY > this.trackElevationBounds.maxY) return null;
            // Ensure min and max values are even so that the min, max and middle values are integers
            return [Math.floor(this.trackElevationBounds.minY/2)*2, Math.ceil(this.trackElevationBounds.maxY/2)*2];
        }
        return null;
    }

    _createGradientSettings(trackColorMode, def) {
        if ('gradient' in def) return def.gradient;
        if ('dynamicGradient' in def) {
            const gradient = def.dynamicGradient;
            const [minValue, maxValue] = this._getMinMax(trackColorMode) ?? [gradient.defaultMin, gradient.defaultMax];

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

    getTrackGradientColor(trackColorMode, value) {
        const gradientDef = this.gradientSettings[trackColorMode];
        if (!gradientDef) return null;

        const { base, diff } = gradientDef;
        const out = base.map((b, i) =>
            Math.min(255, Math.max(0, b + diff[i] * value))
        );

        return `rgb(${out[0]}, ${out[1]}, ${out[2]})`;
    }
}

export function useGradients(scenery) {
    return useMemo(() => {
        return new Gradients(scenery?.trackElevationBounds ?? null);
    }, [scenery?.trackElevationBounds?.minY, scenery?.trackElevationBounds?.maxY]);
}
