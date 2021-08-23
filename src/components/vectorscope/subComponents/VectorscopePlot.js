import React, {useRef, useMemo} from 'react';
import * as THREE from 'three';

export const VectorscopePlot = ({ signalSmallYCBCR, signalSmallRGBlinear, useDiscreteSignalRepresentation }) => {
    return(
      <>
      {useDiscreteSignalRepresentation ?
        signalSmallYCBCR.map( (x, idx1) =>  x.map( (y, idx2) => {
          return(
            <SphereColorful position={[y[1],y[2], 0]}
                            RGBlinear={signalSmallRGBlinear[idx1][idx2]}
                            key={(idx1 * 100) + idx2}/>)
                            } ) )
        : <LinePlot signalSmallYCBCR={signalSmallYCBCR}/>}
      </>
    )
  }


const LinePlot = ({ signalSmallYCBCR }) => {
    const mesh = useRef();
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(signalSmallYCBCR[0][0][1], signalSmallYCBCR[0][0][2]);
        if (signalSmallYCBCR.length > 1 || signalSmallYCBCR[0].length > 1){
          for(let row of signalSmallYCBCR) {
            for(let pixel of row) {
              s.lineTo(pixel[1],pixel[2]);
            }
          }
        }else{
          s.absarc( signalSmallYCBCR[0][0][1], signalSmallYCBCR[0][0][2], 0.01, 0, Math.PI * 2, false );
        }
        return s;
      }, [signalSmallYCBCR])


      const points = shape.getPoints();
      const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );

    return (
      <line ref={mesh} position={[0, 0, 0]} geometry={geometryPoints}>
        <lineBasicMaterial color="#0c0" />
      </line>
    );
  }

const SphereColorful = ({ RGBlinear, position }) => {
    const mesh = useRef();

    const color = new THREE.Color( RGBlinear[0], RGBlinear[1], RGBlinear[2] );
    const innergeometry = new THREE.SphereGeometry( 0.03, 5, 5 );

    return (
      <mesh ref={mesh} position={position} geometry={innergeometry}>
        <meshBasicMaterial color={color} toneMapped={false}/>
      </mesh>
    )
  }