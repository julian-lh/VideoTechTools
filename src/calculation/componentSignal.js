// Collection of Component Signal Conversions


// ----------------------------------------------------------------
// ------------------- Single Value Basic Conversions -------------------


export function cvtRGBtoYCRCB(rgb, standard = "709") {
    var rgbFactors = [1, 1, 1]; var crcbQuotients = [1, 1];

    switch (standard){
        case "601":
            rgbFactors = [0.299, 0.587, 0.114];
            crcbQuotients = [1.402, 1.772];
            break;
        case "709":
            rgbFactors = [0.2126, 0.7152, 0.0722];
            crcbQuotients = [1.5748, 1.8556];
            break;
        case "2020":
            rgbFactors = [0.2627, 0.6780, 0.0593];
            crcbQuotients = [1.4746, 1.8814];
            break;
    }

    const Y = rgb[0]*rgbFactors[0] + rgb[1]*rgbFactors[1] + rgb[2]*rgbFactors[2];
    const Cr = (rgb[0] - Y) / crcbQuotients[0];
    const Cb = (rgb[2] - Y) / crcbQuotients[1];

    return [Y, Cr, Cb];
}

export function cvtYCRCBtoRGB(YCrCb, standard = "709") {
    var rgbFactors = [1, 1, 1]; var crcbQuotients = [1, 1];

    switch (standard){
        case "601":
            rgbFactors = [0.299, 0.587, 0.114];
            crcbQuotients = [1.402, 1.772];
            break;
        case "709":
            rgbFactors = [0.2126, 0.7152, 0.0722];
            crcbQuotients = [1.5748, 1.8556];
            break;
        case "2020":
            rgbFactors = [0.2627, 0.6780, 0.0593];
            crcbQuotients = [1.4746, 1.8814];
            break;
    }

    const R = (YCrCb[1] * crcbQuotients[0]) + YCrCb[0]; // (Cr * standardQuotient) + Y
    const B = (YCrCb[2] * crcbQuotients[1]) + YCrCb[0]; // (Cb * standardQuotient) + Y
    const G = (YCrCb[0] - R*rgbFactors[0] - B*rgbFactors[2]) / rgbFactors[1]; // (Y - (R * rFaktor) - (B * bFaktor)) / gFaktor

    return [R, G, B];
}

export function upscaleYCRCB(YCrCb, bitDepth = 10) {
    const bitFactor = 2**(bitDepth-8);

    // Rundung fuehrt zu Rundungsfehlern, ist aber in Standard so definiert
    const dY = Math.round( (219 * YCrCb[0] + 16) * bitFactor);
    const dCr = Math.round( (224 * YCrCb[1] + 128) * bitFactor);
    const dCb = Math.round( (224 * YCrCb[2] + 128) * bitFactor);

    return [dY, dCr, dCb];
}

export function downscaleYCRCB(YCrCb, bitDepth = 10) {
    const bitFactor = 2**(bitDepth-8);

    const eY = ((YCrCb[0] / bitFactor) - 16) / 219;
    const eCr = ((YCrCb[1] / bitFactor) - 128) / 224;
    const eCb = ((YCrCb[2] / bitFactor) - 128) / 224;

    return [eY, eCr, eCb];
}

// ----------------------------------------------------------------
// ------------------- Image Signal Array Conversions -------------------

export function cvtSignalRGBtoYCRCB(signalRGB, videoStandard = "709" ) {
    return signalRGB.map( x => x.map( y => cvtRGBtoYCRCB(y, videoStandard)));
}

export function cvtSignalYCRCBtoRGB(signalYCRCB, videoStandard = "709" ) {
    return signalYCRCB.map( x => x.map( y => cvtYCRCBtoRGB(y, videoStandard)));
}

export function upscaleSignalYCRCB(signalYCRCB, bitDepth = 10 ) {
    return signalYCRCB.map( x => x.map( y => upscaleYCRCB(y, bitDepth)));
}

export function downscaleSignalYCRCB(signalYCRCB, bitDepth = 10 ) {
    return signalYCRCB.map( x => x.map( y => downscaleYCRCB(y, bitDepth)));
}
