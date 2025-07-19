export default class MiscHelper {
    static getTrackGradient(gradientDef, value) {
        const { base, diff } = gradientDef;
        const out = base.map((b, i) =>
        Math.min(255, Math.max(0, b + diff[i] * value))
        );

        return `rgb(${out[0]}, ${out[1]}, ${out[2]})`;
    }

    static mapObject(object, callback) {
        return Object.fromEntries(
            Object.entries(object).map(([key, value]) => [key, callback(value, key)])
        )
    }
}
