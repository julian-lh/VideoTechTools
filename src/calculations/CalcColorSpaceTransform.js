
// ----------------------------------------------------------------
// ---------------------- Triple Conversions ----------------------


export function cvtRGBtoXYZ(rgb_array, colorSpace = "709") {
    var mtx = new Array(9).fill(1);

    switch (colorSpace) {
        case "601":
            mtx =   [[0.43061903350970027, 0.34154191225749564, 0.1783090542328042],
                    [0.2220379391534392, 0.7066384391534393, 0.07132362169312167],
                    [0.02018526719576718, 0.12955038051146386, 0.9390943522927688]]
            break;
        case ("709"|| "sRGB"):
            mtx =   [[0.412391, 0.357584, 0.180481],
                    [0.212639, 0.715169, 0.072192],
                    [0.019331, 0.119195, 0.950532]]
            break;
        case "2020":
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


export function cvtHSVtoRGB(HSV_array) {
    // input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
    // Based on: https://stackoverflow.com/a/54024653/860099 (last access 09.08.2021)
    const [h, s, v] = HSV_array;

    let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);
    return [f(5),f(3),f(1)];
}

export function cvtRGBtoHSV(RGB_array) {
    // input: r,g,b in [0,1], out: h in [0,360) and s,v in [0,1]
    // Based on: https://stackoverflow.com/a/54070620/860099 (last access 09.08.2021)

    const [r, g, b] = RGB_array;
    let v=Math.max(r,g,b), c=v-Math.min(r,g,b);
    let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c));
     return [60*(h<0?h+6:h), v&&c/v, v];
}


export function cvtXYZtoxy(XYZ_array = [0, 0, 1]) {
    const x = XYZ_array[0] / (XYZ_array[0] + XYZ_array[1] + XYZ_array[2]);
    const y = XYZ_array[1] / (XYZ_array[0] + XYZ_array[1] + XYZ_array[2]);
    return [x, y];
};

export function cvtXYZtoxyY(XYZ_array = [0, 0, 1]) {
    const x = XYZ_array[0] / (XYZ_array[0] + XYZ_array[1] + XYZ_array[2]);
    const y = XYZ_array[1] / (XYZ_array[0] + XYZ_array[1] + XYZ_array[2]);
    return [x, y, XYZ_array[1]];
};


// ----------------------------------------------------------------
// ----------------------  Array Conversions ----------------------


export function cvtSignalRGBtoXYZ(signalRGB, colorSpace = "709"){
    return signalRGB.map( x => x.map( y => cvtRGBtoXYZ(y, colorSpace) ));
}

export function cvtSignalXYZtoxy(signalXYZ){
    return signalXYZ.map( x => x.map( y => cvtXYZtoxy(y) ));
}

export function cvtSignalXYZtoxyY(signalXYZ){
    return signalXYZ.map( x => x.map( y => cvtXYZtoxyY(y) ));
}



