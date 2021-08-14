import React, {useRef} from 'react';
import * as THREE from 'three';


export const CiePlot = ({ signalxyY, signalRGB, dotSize = 0.01 }) => {
    return(
    <>
      {signalxyY.map( (x, idx1) =>  x.map( (y, idx2) => (<SphereColorful xyY={y} RGB={signalRGB[idx1][idx2]} dotSize={dotSize} key={(idx1 * 100) + idx2}/> ) ) )}
    </>
  )
}


const SphereColorful = ({RGB, xyY, dotSize}) => {
    const mesh = useRef();

    const segments = dotSize * 300;
    const color = new THREE.Color( RGB[0], RGB[1], RGB[2] );
    const geometry = new THREE.SphereGeometry( dotSize, segments, segments);

    return (
      <mesh ref={mesh} position={xyY} geometry={geometry}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    )
}

