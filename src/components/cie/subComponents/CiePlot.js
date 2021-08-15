import React, {useRef} from 'react';
import * as THREE from 'three';


export const CiePlot = ({ signalxyY, signalSmallRGBlinear, dotSize = 0.01 }) => {
    return(
    <>
      {
        signalxyY.map( (x, idx1) =>  x.map( (y, idx2) => {
          return (<SphereColorful xyY={y}
                          RGBlinear={signalSmallRGBlinear[idx1][idx2]}
                          dotSize={dotSize}
                          key={(idx1 * 100) + idx2}/>)
                          }  ) )
        }
    </>
  )
}


const SphereColorful = ({ RGBlinear, xyY, dotSize }) => {
    const mesh = useRef();

    const segments = dotSize * 300;
    const color = new THREE.Color( RGBlinear[0], RGBlinear[1], RGBlinear[2] );
    const geometry = new THREE.SphereGeometry( dotSize, segments, segments);

    return (
      <mesh ref={mesh} position={xyY} geometry={geometry}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    )
}

