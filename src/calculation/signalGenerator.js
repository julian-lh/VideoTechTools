
export function contrast(singal = [[0, 0, 0]], m = 1) {

}

export function brightness(singal = [[0, 0, 0]], b = 1) {

}

export function gamma(singal = [[0, 0, 0]], gamma = 1) {

}

export function generateRGBSignalFullColor(valueRGB, width, height){

    var signal = new Array(height);

    for (var row = 0; row < signal.length; row++) {
      signal[row] = new Array(width).fill(valueRGB);
    }
    return signal;
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

export function generateRGBSignalBars(width = 8, height = 1, type = "100/100"){
    var signal = new Array(height);

    for (var row = 0; row < signal.length; row++) {
    	signal[row] = new Array(width);

    	// ITU 100/100 Bars
    	for (var column = 0; column < signal[row].length; column++) {

            const barWidth = width/8;
            var color = [1.0, 0.0, 0.0];
            if (column < barWidth){
                color = [1.0, 1.0, 1.0];
            }else if (column < barWidth * 2){
                color = [1.0, 1.0, 0.0];
            }else if (column < barWidth * 3){
                color = [0.0, 1.0, 1.0];
            }else if (column < barWidth * 4){
                color = [0.0, 1.0, 0.0];
            }else if (column < barWidth * 5){
                color = [1.0, 0.0, 1.0];
            }else if (column < barWidth * 6){
                color = [1.0, 0.0, 0.0];
            }else if (column < barWidth * 7){
                color = [0.0, 0.0, 1.0];
            }else {
                color = [0.0, 0.0, 0.0];
            }

            signal[row][column] = color;
        }
    }
    return signal;
}

// helper for generateRGBSignalGradient()
function blendPixel(firstRGB, secondRGB, ratio = 0.5){
	var result = new Array(firstRGB.length);
	for (var x in firstRGB){
		 result[x] = (1-ratio)*firstRGB[x] + ratio*secondRGB[x];
    }
    return result;
}

export function generateRGBSignalGradient(startRGB, endRGB, width, height, direction = "horizontal"){
	var signal = new Array(height);

    for (var row = 0; row < signal.length; row++) {
    	signal[row] = new Array(width);

    	for (var column = 0; column < signal[row].length; column++) {
        	var color = [0, 0, 0];

            // Gradient Signal
            if (direction == "horizontal"){
				color = blendPixel(startRGB, endRGB, (column/width))
          	}
            else { //vertical
				color = blendPixel(startRGB, endRGB, (row/height))
          	}

        	signal[row][column] = color;
        }
    }
    return signal;
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