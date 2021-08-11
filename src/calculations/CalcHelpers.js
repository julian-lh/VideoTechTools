
export function rgbToString(RGB_array){
    const rgb = new Uint8Array(3);

    const r = clamp(RGB_array[0]) * 255;
    const g = clamp(RGB_array[1]) * 255;
    const b = clamp(RGB_array[2]) * 255;
    rgb[0] = r;
    rgb[1] = g;
    rgb[2] = b;

    return ("rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")");
}

// color string of complementary color
export function rgbToComplColorString(RGB_array){
    const rgb = new Uint8Array(3);

    const r = clamp(RGB_array[0]) * 255;
    const g = clamp(RGB_array[1]) * 255;
    const b = clamp(RGB_array[2]) * 255;
    rgb[0] = 255 - r;
    rgb[1] = 255 - g;
    rgb[2] = 255 - b;

    return ("rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")");
}

export function clamp(value, min = 0, max = 1) {
    return Math.min(Math.max(value, min), max);
}
