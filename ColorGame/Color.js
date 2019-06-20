class Color {
    constructor() {
        const [r, g, b] = arguments.length === 1
            ? Array.from(arguments[0])
            : Array.from(arguments);
        Object.assign(this, { r, g, b });
    }

    static random() {
        return new Color(
            randomByte(),
            randomByte(),
            randomByte()
        );
    }

    toRGBString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    equals(o) {
        return (
            this.r === o.r &&
            this.g === o.g &&
            this.b === o.g
        )
    }
}
