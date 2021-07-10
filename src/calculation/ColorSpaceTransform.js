
export function cvtRGBtoXYZ(rgb_array, colorSpace = "709") {
    var mtx = new Array(9).fill(1);

    switch (colorSpace) {
        /*case "sRGB":
            mtx =  [[0.4124564, 0.3575761, 0.1804375],
                    [0.2126729, 0.7151522, 0.0721750],
                    [0.0193339, 0.1191920, 0.9503041]]
            //https://www.image-engineering.de/library/technotes/958-how-to-convert-between-srgb-and-ciexyz
            break;*/
        case "601":
            mtx =   [[0.43061903350970027, 0.34154191225749564, 0.1783090542328042],
                    [0.2220379391534392, 0.7066384391534393, 0.07132362169312167],
                    [0.02018526719576718, 0.12955038051146386, 0.9390943522927688]]
            break;
        case ("709-eigenes"|| "sRGB-eigenes"):
            mtx =   [[0.4124564390896923, 0.357576077643909, 0.18043748326639894],
                    [0.2126728514056226, 0.715152155287818, 0.07217499330655958],
                    [0.019333895582329307, 0.11919202588130297, 0.9503040785363679]]
            break;
        case "2020-eigenes":
            mtx =   [[0.637010191411101, 0.14461502739696924, 0.16884478119192986],
                    [0.26272171736164057, 0.6779892755022617, 0.059289007136097506],
                    [4.994515405547194e-17, 0.0280723288476469, 1.0607576711523532]]
            break;

        case ("709"|| "sRGB"): //Wilkens
            mtx =   [[0.412391, 0.357584, 0.180481],
                    [0.212639, 0.715169, 0.072192],
                    [0.019331, 0.119195, 0.950532]]
            break;
        case "2020":    //Wilkens
            mtx =   [[0.636958, 0.144617, 0.168881],
                    [0.2627, 0.677998, 0.059302],
                    [0.0 , 0.028073, 1.060985]]
            break;
    }

    const X = mtx[0][0] * rgb_array[0] + mtx[0][1] * rgb_array[1] + mtx[0][2] * rgb_array[2];
    const Y = mtx[1][0] * rgb_array[0] + mtx[1][1] * rgb_array[1] + mtx[1][2] * rgb_array[2];
    const Z = mtx[2][0] * rgb_array[0] + mtx[2][1] * rgb_array[1] + mtx[2][2] * rgb_array[2];
    return [X, Y, Z];
};

export function cvtXYZtoxy(XYZ_array = [0, 0, 1]) {
    const x = XYZ_array[0] / (XYZ_array[0] + XYZ_array[1] + XYZ_array[2]);
    const y = XYZ_array[1] / (XYZ_array[0] + XYZ_array[1] + XYZ_array[2]);
    //const z = XYZ_array[2] / (XYZ_array[0] + XYZ_array[1] + XYZ_array[2]);
    return [x, y];
};

export function cvtXYZtoxyY(XYZ_array = [0, 0, 1]) {
    const x = XYZ_array[0] / (XYZ_array[0] + XYZ_array[1] + XYZ_array[2]);
    const y = XYZ_array[1] / (XYZ_array[0] + XYZ_array[1] + XYZ_array[2]);
    //const z = XYZ_array[2] / (XYZ_array[0] + XYZ_array[1] + XYZ_array[2]);
    return [x, y, XYZ_array[1]];
};


export function cvtSignalRGBtoXYZ(signalRGB, colorSpace = "709"){
    return signalRGB.map( x => x.map( y => cvtRGBtoXYZ(y, colorSpace) ));
}

export function cvtSignalXYZtoxy(signalXYZ){
    return signalXYZ.map( x => x.map( y => cvtXYZtoxy(y) ));
}

export function cvtSignalXYZtoxyY(signalXYZ){
    return signalXYZ.map( x => x.map( y => cvtXYZtoxyY(y) ));
}

// In Anlehnung an: https://gist.github.com/mjackson/5311256
export function cvtRGBtoHSV(rgb) {
    r = rgb[0];
    g = rgb[1];
    b = rgb[2];

    var max = Math.max(r, g, b)
    var min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = (max == 0 ? 0 : d / max);

    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) *120; break;
        case g: h = ((b - r) / d + 2) * 120; break;
        case b: h = ((r - g) / d + 4) * 120; break;
      }
      //h /= 6;
      h %= 360;
    }
    return [ h, s, v ];
  }

export function cvtHSVtoRGB(hsv) {
    var rgb = [0, 0, 0];
    var [h, s, v] = hsv;

    const c = v * s;
    const x = c * (1 - Math.abs((h/60) % 2 - 1));
    const m = v - c;

    if(h < 60){
    	rgb = [c, x, 0];
    }else if(h < 120){
    	rgb = [x, c, 0];
    }else if(h < 180){
    	rgb = [0, c, x];
    }else if(h < 240){
    	rgb = [0, x, c];
    }else if(h < 300){
    	rgb = [x, 0, c];
    }else if(h < 360){
    	rgb = [c, 0, x];
    }
    return rgb;
  }
/*
export function rgbToL(rgb_array, colorSpace = 'sRGB') {
    var mtx = new Array(3).fill(1);

    switch (colorSpace) {
        case "sRGB":
            mtx =  [0.22, 0.72, 0.06]
            break;
    }

    const L = mtx[0] * rgb_array[0] + mtx[1] * rgb_array[1] + mtx[2] * rgb_array[2];
    return L;
};
*/

export function RGBtoYUV(rgb_array = [0, 0, 0]){
    const Y = 0.299 * rgb_array[0] + 0.587 * rgb_array[1] + 0.114 * rgb_array[2];
    const U = 0.493 * (rgb_array[2] - Y);
    const V = 0.877 * (rgb_array[0] - Y);
    return [Y, U, V];
};

export const CIEBoundsValues = [[360, 0.175560, 0.005294, 0.819146],
                    [365, 0.175161, 0.005256, 0.819582],
                    [370, 0.174821, 0.005221, 0.819959],
                    [375, 0.174510, 0.005182, 0.820309],
                    [380, 0.174112, 0.004964, 0.820924],
                    [385, 0.174008, 0.004981, 0.821012],
                    [390, 0.173801, 0.004915, 0.821284],
                    [395, 0.173560, 0.004923, 0.821517],
                    [400, 0.173337, 0.004797, 0.821866],
                    [405, 0.173021, 0.004775, 0.822204],
                    [410, 0.172577, 0.004799, 0.822624],
                    [415, 0.172087, 0.004833, 0.823081],
                    [420, 0.171407, 0.005102, 0.823490],
                    [425, 0.170301, 0.005789, 0.823911],
                    [430, 0.168878, 0.006900, 0.824222],
                    [435, 0.166895, 0.008556, 0.824549],
                    [440, 0.164412, 0.010858, 0.824731],
                    [445, 0.161105, 0.013793, 0.825102],
                    [450, 0.156641, 0.017705, 0.825654],
                    [455, 0.150985, 0.022740, 0.826274],
                    [460, 0.143960, 0.029703, 0.826337],
                    [465, 0.135503, 0.039879, 0.824618],
                    [470, 0.124118, 0.057803, 0.818079],
                    [475, 0.109594, 0.086843, 0.803563],
                    [480, 0.091294, 0.132702, 0.776004],
                    [485, 0.068706, 0.200723, 0.730571],
                    [490, 0.045391, 0.294976, 0.659633],
                    [495, 0.023460, 0.412703, 0.563837],
                    [500, 0.008168, 0.538423, 0.453409],
                    [505, 0.003859, 0.654823, 0.341318],
                    [510, 0.013870, 0.750186, 0.235943],
                    [515, 0.038852, 0.812016, 0.149132],
                    [520, 0.074302, 0.833803, 0.091894],
                    [525, 0.114161, 0.826207, 0.059632],
                    [530, 0.154722, 0.805864, 0.039414],
                    [535, 0.192876, 0.781629, 0.025495],
                    [540, 0.229620, 0.754329, 0.016051],
                    [545, 0.265775, 0.724324, 0.009901],
                    [550, 0.301604, 0.692308, 0.006088],
                    [555, 0.337363, 0.658848, 0.003788],
                    [560, 0.373102, 0.624451, 0.002448],
                    [565, 0.408736, 0.589607, 0.001657],
                    [570, 0.444062, 0.554714, 0.001224],
                    [575, 0.478775, 0.520202, 0.001023],
                    [580, 0.512486, 0.486591, 0.000923],
                    [585, 0.544787, 0.454434, 0.000779],
                    [590, 0.575151, 0.424232, 0.000616],
                    [595, 0.602933, 0.396497, 0.000571],
                    [600, 0.627037, 0.372491, 0.000472],
                    [605, 0.648233, 0.351395, 0.000372],
                    [610, 0.665764, 0.334011, 0.000226],
                    [615, 0.680079, 0.319747, 0.000174],
                    [620, 0.691504, 0.308342, 0.000154],
                    [625, 0.700606, 0.299301, 0.000093],
                    [630, 0.707918, 0.292027, 0.000055],
                    [635, 0.714032, 0.285929, 0.000040],
                    [640, 0.719033, 0.280935, 0.000032],
                    [645, 0.723032, 0.276948, 0.000020],
                    [650, 0.725992, 0.274008, 0.000000],
                    [655, 0.728272, 0.271728, 0.000000],
                    [660, 0.729969, 0.270031, 0.000000],
                    [665, 0.731089, 0.268911, 0.000000],
                    [670, 0.731993, 0.268007, 0.000000],
                    [675, 0.732719, 0.267281, 0.000000],
                    [680, 0.733417, 0.266583, 0.000000],
                    [685, 0.734047, 0.265953, 0.000000],
                    [690, 0.734390, 0.265610, 0.000000],
                    [695, 0.734592, 0.265408, 0.000000],
                    [700, 0.734690, 0.265310, 0.000000],
                    [705, 0.734690, 0.265310, 0.000000],
                    [710, 0.734690, 0.265310, 0.000000],
                    [715, 0.734548, 0.265452, 0.000000],
                    [720, 0.734690, 0.265310, 0.000000],
                    [725, 0.734690, 0.265310, 0.000000],
                    [730, 0.734690, 0.265310, 0.000000],
                    [735, 0.734690, 0.265310, 0.000000],
                    [740, 0.734690, 0.265310, 0.000000],
                    [745, 0.734690, 0.265310, 0.000000],
                    [750, 0.734690, 0.265310, 0.000000],
                    [755, 0.734690, 0.265310, 0.000000],
                    [760, 0.734690, 0.265310, 0.000000],
                    [765, 0.734690, 0.265310, 0.000000],
                    [770, 0.734690, 0.265310, 0.000000],
                    [775, 0.734690, 0.265310, 0.000000],
                    [780, 0.734690, 0.265310, 0.000000],
                    [785, 0.734690, 0.265310, 0.000000],
                    [790, 0.734690, 0.265310, 0.000000],
                    [795, 0.734690, 0.265310, 0.000000],
                    [800, 0.734690, 0.265310, 0.000000],
                    [805, 0.734690, 0.265310, 0.000000],
                    [810, 0.734690, 0.265310, 0.000000],
                    [815, 0.734690, 0.265310, 0.000000],
                    [820, 0.734690, 0.265310, 0.000000],
                    [825, 0.734690, 0.265310, 0.000000],
                    [830, 0.734690, 0.265310, 0.000000]];
