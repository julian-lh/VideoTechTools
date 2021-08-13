import { cvtSignalRGBtoXYZ, cvtSignalXYZtoxyY } from './CalcColorSpaceTransform';


export function generateRGBSignalFullColor(valueRGB, width, height){
    var signal = new Array(height);

    for (var row = 0; row < signal.length; row++) {
      signal[row] = new Array(width).fill(valueRGB);
    }
    return signal;
}

export function generateRGBSignalBars(width = 8, height = 1, type100 = true){
    var signal = new Array(height);
    const maxC = (type100 ? 1 : 0.75);

    for (var row = 0; row < signal.length; row++) {
    	signal[row] = new Array(width);

    	for (var column = 0; column < signal[row].length; column++) {

            const barWidth = width/8;
            var color = [1.0, 0.0, 0.0];
            if (column < barWidth){
                color = [1.0, 1.0, 1.0];
            }else if (column < barWidth * 2){
                color = [maxC, maxC, 0.0];
            }else if (column < barWidth * 3){
                color = [0.0, maxC, maxC];
            }else if (column < barWidth * 4){
                color = [0.0, maxC, 0.0];
            }else if (column < barWidth * 5){
                color = [maxC, 0.0, maxC];
            }else if (column < barWidth * 6){
                color = [maxC, 0.0, 0.0];
            }else if (column < barWidth * 7){
                color = [0.0, 0.0, maxC];
            }else {
                color = [0.0, 0.0, 0.0];
            }
            signal[row][column] = color;
        }
    }
    return signal;
}


export function generateRGBSignalGradient(startRGB, endRGB, width, height, directionHorizontal=true){
	var signal = new Array(height);

    for (var row = 0; row < signal.length; row++) {
    	signal[row] = new Array(width);

    	for (var column = 0; column < signal[row].length; column++) {
        	var color = [0, 0, 0];

            if (directionHorizontal){
				color = blendColor(startRGB, endRGB, (column/(width-1)))
          	}
            else {
				color = blendColor(startRGB, endRGB, (row/(height-1)))
          	}

        	signal[row][column] = color;
        }
    }
    return signal;
}

// helper for generateRGBSignalGradient
function blendColor(firstRGB, secondRGB, ratio = 0.5){
	var result = new Array(firstRGB.length);
	for (var x in firstRGB){
		 result[x] = (1-ratio)*firstRGB[x] + ratio*secondRGB[x];
    }
    return result;
}


// ----------------------------------------------------------------
// ---------------------- Not in use ----------------------

// corner values of 3D Gamut bodies

export function generateRGB3dCoordinates(){
    var rgbArray = [];
    for(var r = 0; r <= 1; r += 0.2){
        for(var g = 0; g <= 1; g += 0.2){
            for(var b = 0; b <= 1; b += 0.2){
                rgbArray.push([r, g, b]);
            }
        }
    }
    const rgbArraySignal = [[...rgbArray]];
    return rgbArraySignal;
}

export function generatexyY3dCoordinates(colorSpace = "709"){
    var rgbArray = [];
    for(var r = 0; r <= 1; r += 0.2){
        for(var g = 0; g <= 1; g += 0.2){
            for(var b = 0; b <= 1; b += 0.2){
                rgbArray.push([r, g, b]);
            }
        }
    }
    const rgbArraySignal = [[...rgbArray]];
    const XYZArraySignal = cvtSignalRGBtoXYZ(rgbArraySignal, colorSpace);
    const xyYArraySignal = cvtSignalXYZtoxyY(XYZArraySignal);
    return xyYArraySignal;
}
