
export function signalToWfmArray(signalArray, signalIdx, hexColorString = "#555", subdivisionPosition = undefined, withChromaOffset = false, horizontalStretch = 1){
    const horizontalSignalLength = signalArray[0].length;
    const lineArray = [];
    var subdivisionOffset = 0;
    var hSubdivisionSqueezeFktr = 1;

    if (subdivisionPosition !== undefined){
        subdivisionOffset = subdivisionPosition / 3;
        hSubdivisionSqueezeFktr = 0.3;
    }

    for (var rowIdx = 0; rowIdx < signalArray.length; rowIdx++){
      for (var columnIdx = 0; columnIdx < signalArray[rowIdx].length; columnIdx++) {

        const x = (columnIdx / horizontalSignalLength) * hSubdivisionSqueezeFktr + subdivisionOffset;
        const y = signalArray[rowIdx][columnIdx][signalIdx];
        if (withChromaOffset){
            y += 0.5
        }
        lineArray.push([(x * horizontalStretch), y, 0, hexColorString]);
      }
    }
    return lineArray;
}