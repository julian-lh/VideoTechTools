import React, {useRef, useMemo} from 'react';
import * as THREE from 'three';


export const WFMPlot = ({signalYCRCB, signalRGB, representationID, horizontalScaleFactor = 1.78}) => {
    const meshRef = useRef();
    const amountSubdivisions = (representationID == 2 ? 1 : 3);
    const signal = (representationID == 0 ? signalRGB : signalYCRCB);

    const amountHorizontalPixels = signalYCRCB[0].length;
    const pixelWidth = (( 1 / amountHorizontalPixels) / amountSubdivisions) * horizontalScaleFactor ;


    const linePositions = useMemo(() => {
      var lineArray = [];
      switch (representationID){

        case 2: //Luma
          lineArray = lineArray.concat(signalToWfmArray(signal, 0, '#333', undefined, false, horizontalScaleFactor));
          break;

        case 1: //YCrCb
          lineArray = lineArray.concat(signalToWfmArray(signal, 0, '#111', 0, false, horizontalScaleFactor));
          lineArray = lineArray.concat(signalToWfmArray(signal, 1, '#f05', 1, true, horizontalScaleFactor));
          lineArray = lineArray.concat(signalToWfmArray(signal, 2, '#50f', 2, true, horizontalScaleFactor));
          break;

        default: //RGB
          lineArray = lineArray.concat(signalToWfmArray(signal, 0, '#f00', 0, false, horizontalScaleFactor));
          lineArray = lineArray.concat(signalToWfmArray(signal, 1, '#0b0', 1, false, horizontalScaleFactor));
          lineArray = lineArray.concat(signalToWfmArray(signal, 2, '#00f', 2, false, horizontalScaleFactor));
          break;
      }
      return lineArray;
    },[signal]);

    const points = [new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( pixelWidth, 0, 0 )];
    const geometry =  new THREE.BufferGeometry().setFromPoints( points );

    return(
      <>
          {linePositions.map((pos, idx) => {
            return (
              <line ref={meshRef} position={pos.slice(0,2)} geometry={geometry} name="lala" key={idx}>
                <lineBasicMaterial color={pos[3]} linewidth={2}/>
              </line>
              )})
          }
      </>
    )
}

function signalToWfmArray(signalArray, signalIdx, hexColorString = "#555", subdivisionPosition = undefined, withChromaOffset = false, horizontalStretch = 1){
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