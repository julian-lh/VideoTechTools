
// ----------------------------------------------------------------
// ---------------------- Triple Conversions ----------------------


export function upscaleRGB(RGB, bitDepth = 10) {
    const bitFactor = 2**(bitDepth-8);

    const dR = (219 * RGB[0] + 16) * bitFactor;
    const dG = (219 * RGB[1] + 16) * bitFactor;
    const dB = (219 * RGB[2] + 16) * bitFactor;

    return [dR, dG, dB];
}

export function downscaleRGB(RGB, bitDepth = 10) {
    const bitFactor = 2**(bitDepth-8);

    const eRGB = RGB.map( x => ( (x[0] / bitFactor) - 16) / 219 );
    return eRGB;
}

// ----------------------------------------------------------------
// ----------------------  Array Conversions ----------------------

export function upscaleSignalRGB(signalSmallRGB, bitDepth = 10 ) {
    return signalSmallRGB.map( x => x.map( y => upscaleRGB(y, bitDepth)));
}

export function downscaleSignalRGB(signalRGB, bitDepth = 10 ) {
    return signalRGB.map( x => x.map( y => downscaleRGB(y, bitDepth)));
}