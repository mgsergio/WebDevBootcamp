class Color {
    constructor() {
        if (arguments.length === 1) {
            this.r = arguments[0][0];
            this.g = arguments[0][1];
            this.b = arguments[0][2];
        } else {
            this.r = arguments[0];
            this.g = arguments[1];
            this.b = arguments[2];
        }
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
