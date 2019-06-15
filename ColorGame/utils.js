function randomInt(min, max) {
    return min + Math.floor(Math.random() * max);
}

function randomByte() {
    return randomInt(0, 256);
}
