
export function clamp(value, min = 0, max = 1) {
    return Math.min(Math.max(value, min), max);
}

export function rgbToHex(rgb) {
    // Source: https://css-tricks.com/converting-color-spaces-in-javascript/
    var [r, g, b] = rgb;
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;

    return "#" + r + g + b;
}

  export function rgbToComplementary(rgb) {
    return rgb.map( (x) => 1 - x );
  }


// TODO: Please update into upper version. Hex seems more elegant

export function rgbToString(rgbArray){
    const rgb = new Uint8Array(3);

    const r = clamp(rgbArray[0]) * 255;
    const g = clamp(rgbArray[1]) * 255;
    const b = clamp(rgbArray[2]) * 255;
    rgb[0] = r;
    rgb[1] = g;
    rgb[2] = b;

    //console.log(rgb.toString())
    //console.log("rgb("+r+","+g+","+b+")");
    return ("rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")");
}

export function rgbToComplColorString(rgbArray){
    const rgb = new Uint8Array(3);

    const r = clamp(rgbArray[0]) * 255;
    const g = clamp(rgbArray[1]) * 255;
    const b = clamp(rgbArray[2]) * 255;
    rgb[0] = 255 - r;
    rgb[1] = 255 - g;
    rgb[2] = 255 - b;

    return ("rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")");
}