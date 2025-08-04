export default class MiscHelper {
    static getTrackGradientColor(gradientDef, value) {
        const { base, diff } = gradientDef;
        const out = base.map((b, i) =>
            Math.min(255, Math.max(0, b + diff[i] * value))
        );

        return `rgb(${out[0]}, ${out[1]}, ${out[2]})`;
    }

    static parsePosQuery(posQuery) {
        if (!posQuery) return null;
        if (typeof posQuery !== 'string') return null;

        const parts = posQuery.split(/[,;]/);
        if (parts.length === 3) {
            // eslint-disable-next-line no-unused-vars
            const [x, _, z] = parts.map(part => parseFloat(part.trim()));
            if (isNaN(x) || isNaN(z)) return null;
            return { x, z };
        }
        
        if (parts.length === 2) {
            const [x, z] = parts.map(part => parseFloat(part.trim()));
            if (isNaN(x) || isNaN(z)) return null;
            return { x, z };
        }

        return null;
    }
}
