
// ----------------------------------------------------------------
// ---------------------- Triple Conversions ----------------------


function offsetContrast(pixelValue = [0, 0, 0], m = 1) {
    return pixelValue.map(x => x * m);
}

function offsetBrightness(pixelValue = [0, 0, 0], b = 0) {
    return pixelValue.map(x => x + b);
}

function offsetGamma(pixelValue = [0, 0, 0], gamma = 1, maxValue = 1) {
    return pixelValue.map(x => (x/maxValue) ** gamma);
}


// ----------------------------------------------------------------
// ----------------------  Array Conversions ----------------------


export function offsetSignalContrast(signalRGB, m = 1) {
    return signalRGB.map( x => x.map( y => offsetContrast(y, m)));
}

export function offsetSignalBrightness(signalRGB, b = 0) {
    return signalRGB.map( x => x.map( y => offsetBrightness(y, b)));
}

export function offsetSignalGamma(signalRGB, gamma = 1, maxValue = 1) {
    return signalRGB.map( x => x.map( y => offsetGamma(y, gamma, maxValue)));
}
