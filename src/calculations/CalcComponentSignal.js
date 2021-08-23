
import { clamp } from './CalcHelpers';

// ----------------------------------------------------------------
// ---------------------- Triple Conversions ----------------------


export function cvtRGBtoYCBCR(RGB, standard = "709") {
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

    const Y = RGB[0]*rgbFactors[0] + RGB[1]*rgbFactors[1] + RGB[2]*rgbFactors[2];
    const Cb = (RGB[2] - Y) / crcbQuotients[1];
    const Cr = (RGB[0] - Y) / crcbQuotients[0];

    return [Y, Cb, Cr];
}

export function cvtYCBCRtoRGB(YCBCR, standard = "709") {
    var rgbFactors = [1, 1, 1]; var cbcrQuotients = [1, 1];

    switch (standard){
        case "601":
            rgbFactors = [0.299, 0.587, 0.114];
            cbcrQuotients = [1.772, 1.402];
            break;
        case "709":
            rgbFactors = [0.2126, 0.7152, 0.0722];
            cbcrQuotients = [1.8556, 1.5748];
            break;
        case "2020":
            rgbFactors = [0.2627, 0.6780, 0.0593];
            cbcrQuotients = [1.8814, 1.4746];
            break;
    }

    const R = (YCBCR[2] * cbcrQuotients[1]) + YCBCR[0]; // (Cr * standardQuotient) + Y
    const B = (YCBCR[1] * cbcrQuotients[0]) + YCBCR[0]; // (Cb * standardQuotient) + Y
    const G = (YCBCR[0] - R*rgbFactors[0] - B*rgbFactors[2]) / rgbFactors[1]; // (Y - (R * rFaktor) - (B * bFaktor)) / gFaktor

    return [R, G, B];
}

export function upscaleYCBCR(YCBCR, bitDepth = 10) {
    const bitFactor = 2**(bitDepth-8);

    // Rundung fuehrt zu Rundungsfehlern, ist aber in Standard eigentlich vorgesehen
    //const dY = Math.round( (219 * YCBCR[0] + 16) * bitFactor);
    //const dCr = Math.round( (224 * YCBCR[1] + 128) * bitFactor);
    //const dCb = Math.round( (224 * YCBCR[2] + 128) * bitFactor);

    const dY = (219 * YCBCR[0] + 16) * bitFactor;
    const dCb = (224 * YCBCR[1] + 128) * bitFactor;
    const dCr = (224 * YCBCR[2] + 128) * bitFactor;

    return [dY, dCb, dCr];
}

export function downscaleYCBCR(YCBCR, bitDepth = 10) {
    const bitFactor = 2**(bitDepth-8);

    const eY = ((YCBCR[0] / bitFactor) - 16) / 219;
    const eCb = ((YCBCR[1] / bitFactor) - 128) / 224;
    const eCr = ((YCBCR[2] / bitFactor) - 128) / 224;

    return [eY, eCb, eCr];
}


export function limiterYCBCR(YCBCR, bitDepth, fullVideoData = false) {
    const bitDepthFactor = 2**(bitDepth - 8);

    var peakLimitY = 235 * bitDepthFactor;
    var blackLimitY = 16 * bitDepthFactor;
    var upperChromaLimit = 240 * bitDepthFactor;
    var lowerChromaLimit = 16 * bitDepthFactor;

    if (fullVideoData){
        peakLimitY = (256 * bitDepthFactor) - (bitDepthFactor - 1);
        blackLimitY = 1 * bitDepthFactor;
        upperChromaLimit = peakLimitY;
        lowerChromaLimit = blackLimitY;
    }

    var tempYCBCR = [...YCBCR]; //Array kopieren
    tempYCBCR[0] = (tempYCBCR[0] > peakLimitY ? peakLimitY : tempYCBCR[0]);
    tempYCBCR[0] = (tempYCBCR[0] < blackLimitY ? blackLimitY : tempYCBCR[0]);

    tempYCBCR[1] = (tempYCBCR[1] > upperChromaLimit ? upperChromaLimit : tempYCBCR[1]);
    tempYCBCR[1] = (tempYCBCR[1] < lowerChromaLimit ? lowerChromaLimit : tempYCBCR[1]);
    tempYCBCR[2] = (tempYCBCR[2] > upperChromaLimit ? upperChromaLimit : tempYCBCR[2]);
    tempYCBCR[2] = (tempYCBCR[2] < lowerChromaLimit ? lowerChromaLimit : tempYCBCR[2]);

    return tempYCBCR;
}




// ----------------------------------------------------------------
// ----------------------  Array Conversions ----------------------


export function cvtSignalRGBtoYCBCR(signalRGB, videoStandard = "709" ) {
    return signalRGB.map( x => x.map( y => cvtRGBtoYCBCR(y, videoStandard)));
}

export function cvtSignalYCBCRtoRGB(signalYCBCR, videoStandard = "709" ) {
    return signalYCBCR.map( x => x.map( y => cvtYCBCRtoRGB(y, videoStandard)));
}

export function upscaleSignalYCBCR(signalSmallYCBCR, bitDepth = 10 ) {
    return signalSmallYCBCR.map( x => x.map( y => upscaleYCBCR(y, bitDepth)));
}

export function downscaleSignalYCBCR(signalYCBCR, bitDepth = 10 ) {
    return signalYCBCR.map( x => x.map( y => downscaleYCBCR(y, bitDepth)));
}

export function limiterSignalYCBCR(signalYCBCR, bitDepth, fullVideoData = false){
    return signalYCBCR.map( x => x.map( y => limiterYCBCR(y, bitDepth, fullVideoData)));
}

export function limiterSignalSmallRGB(signalSmallRGB, fullVideoData = false){
    var peakLimit = 1;
    var bottomLimit = 0
    if (fullVideoData) {
        peakLimit = 1.16;
        bottomLimit = -0.073;
    }
    return signalSmallRGB.map( x => x.map( y => y.map( z => clamp(z, bottomLimit, peakLimit))));
}