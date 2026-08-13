export default class DynamicGradientBoundsItem {
    min;
    max;
    startsAtZero;

    constructor(startsAtZero) {
        this.min = startsAtZero ? 0 : Infinity;
        this.max = -Infinity;
        this.startsAtZero = startsAtZero;
    }

    update(value) {
        if (!this.startsAtZero && value < this.min) this.min = value;
        if (value > this.max) this.max = value;
    }
}
