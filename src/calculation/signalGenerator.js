
export function contrast(singal = [[0, 0, 0]], m = 1) {

}

export function brightness(singal = [[0, 0, 0]], b = 1) {

}

export function gamma(singal = [[0, 0, 0]], gamma = 1) {

}

export function generateFullColorRGBSignal(valueRGB, width, height){
    //var signal = new Array(height);
    //irgendwie mappen
    return [[1, 0, 0]];
}

/*
export function generateBarsRGBSignal(width = 8, height = 1, type = "100/100"){
    // zum Daten-Sparen nur 192 anstatt 1920
    const signalWidth = width;
    const signalHeight = height;
    var signal = new Array(signalWidth * signalHeight);
    // ITU 100/100 Bars
    for (var i = 0; i < signalHeight; i++) { //alle Zeilen
        for (var j = 0; j < signalWidth; j++){  //alle Spalten

            const barWidth = signalWidth/8;
            var color = [1.0, 0.0, 0.0];
            if (j < barWidth){
                color = [1.0, 1.0, 1.0];
            }else if (j < barWidth * 2){
                color = [1.0, 1.0, 0.0];
            }else if (j < barWidth * 3){
                color = [0.0, 1.0, 1.0];
            }else if (j < barWidth * 4){
                color = [0.0, 1.0, 0.0];
            }else if (j < barWidth * 5){
                color = [1.0, 0.0, 1.0];
            }else if (j < barWidth * 6){
                color = [1.0, 0.0, 0.0];
            }else if (j < barWidth * 7){
                color = [0.0, 0.0, 1.0];
            }else {
                color = [0.0, 0.0, 0.0];
            }
            var pixelIdx = (i * signalWidth + j);
            signal[pixelIdx] = color;
        }
    }
    return signal;
}
*/

export function generateBarsRGBSignal(width = 8, height = 1, type = "100/100"){
    return [[0, 0, 1]];
}

export function generateGradientRGBSignal(startRGB, endRGB, direction = "horizontal", width, height){
    return [[0, 1, 0]];
}




// applies operation to every pixel of a 2D-signal-array
export function modifySignalPixel(signal, operation) {
    const result = signal.map(operation);
    return result;
}

// applies operation to every subpixel of a 2D-signal-Array
export function modifySignalSubPixel(signal, operation) {
    const result = signal.map( x => x.map(operation));
    return result;
}