import React, {useRef, useMemo} from 'react';
import * as THREE from 'three';


export const WfmPlot = ({signalYCRCB, signalRGB, representationID, aspectRatio = 1.78}) => {
    const meshRef = useRef();
    const amountSubdivisions = (representationID == 2 ? 1 : 3);
    const signal = (representationID == 0 ? signalRGB : signalYCRCB);

    const amountHorizontalPixels = signalYCRCB[0].length;
    const pixelWidth = (( 1 / amountHorizontalPixels) / amountSubdivisions) * aspectRatio ;


    const signalWFM = useMemo(() => {
      var tempSignalWFM = [];
      switch (representationID){

        case 2: //Luma
          tempSignalWFM = tempSignalWFM.concat(signalToWfmArray(signal, 0, '#333', undefined, false, aspectRatio));
          break;

        case 1: //YCrCb
          tempSignalWFM = tempSignalWFM.concat(signalToWfmArray(signal, 0, '#111', 0, false, aspectRatio));
          tempSignalWFM = tempSignalWFM.concat(signalToWfmArray(signal, 1, '#f05', 1, true, aspectRatio));
          tempSignalWFM = tempSignalWFM.concat(signalToWfmArray(signal, 2, '#50f', 2, true, aspectRatio));
          break;

        default: //RGB
          tempSignalWFM = tempSignalWFM.concat(signalToWfmArray(signal, 0, '#f00', 0, false, aspectRatio));
          tempSignalWFM = tempSignalWFM.concat(signalToWfmArray(signal, 1, '#0b0', 1, false, aspectRatio));
          tempSignalWFM = tempSignalWFM.concat(signalToWfmArray(signal, 2, '#00f', 2, false, aspectRatio));
          break;
      }
      return tempSignalWFM;
    },[signal]);

    const points = [new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( pixelWidth, 0, 0 )];
    const geometry =  new THREE.BufferGeometry().setFromPoints( points );

    return(
      <>
          {signalWFM.map((pos, idx) => {
            return (
              <line ref={meshRef} position={pos.slice(0,2)} geometry={geometry} name="lala" key={idx}>
                <lineBasicMaterial color={pos[3]} linewidth={2}/>
              </line>)
              })
          }
      </>
    )
}


function signalToWfmArray(
    signalArray,
    channelIdx,
    hexColorString = "#555",
    paradePosition = undefined,
    withChromaOffset = false,
    aspectRatio = 1.78
    ){

    const signalWidth = signalArray[0].length;
    const tempSignalWFM = [];

    var hoizontalOffset = 0;
    var horizontalSqueeze = 1;

    if (paradePosition !== undefined){
        hoizontalOffset = paradePosition / 3;
        horizontalSqueeze = 0.3;
    }

    for (var rowIdx = 0; rowIdx < signalArray.length; rowIdx++){
      for (var columnIdx = 0; columnIdx < signalArray[rowIdx].length; columnIdx++) {

        const x = (columnIdx / signalWidth) * horizontalSqueeze + hoizontalOffset;
        const y = signalArray[rowIdx][columnIdx][channelIdx];

        if (withChromaOffset){
            y += 0.5
        }

        tempSignalWFM.push([(x * aspectRatio), y, 0, hexColorString]);
      }
    }
    return tempSignalWFM;
}



