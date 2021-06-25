
export const calcDatarate = (resX, resY, subsamplingFactor, quantisation, fpsFull, cameras = 1) => {
    return (resX * resY * 3 * subsamplingFactor * quantisation * fpsFull * cameras );
}

export const subsamplingFactor = (y, c1, c2) => {
    return ( ( (y/4) + (c1/4) + (c2/4) ) / 3 );
}

//export const subsamplingFactor = (y, c1, c2) => {
//    return ( (y/4) + (c1/4) + (c2/4) );
//}

