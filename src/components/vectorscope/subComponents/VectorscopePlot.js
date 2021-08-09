import React, {useRef, useMemo} from 'react';
import * as THREE from 'three';

export const VectorscopePlot = ({ signalSmallYCRCB, signalRGB, discreteSignalRepresentation }) => {
    return(
      <>
      {discreteSignalRepresentation ?
        signalSmallYCRCB.map( (x, idx1) =>  x.map( (y, idx2) => (<SphereColorful position={[y[2],y[1], 0]} RGB={signalRGB[idx1][idx2]} name={'box1'} key={(idx1 * 100) + idx2}/> ) ) )
        : <LinePlot signalSmallYCRCB={signalSmallYCRCB}/>}
      </>
    )
  }


const LinePlot = (props) => {
    const mesh = useRef();
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(props.signalSmallYCRCB[0][0][2], props.signalSmallYCRCB[0][0][1]);
        if (props.signalSmallYCRCB.length > 1 || props.signalSmallYCRCB[0].length > 1){
          for(let row of props.signalSmallYCRCB) {
            for(let pixel of row) {
              s.lineTo(pixel[2],pixel[1]);
            }
          }
        }else{
          s.absarc( props.signalSmallYCRCB[0][0][2], props.signalSmallYCRCB[0][0][1], 0.01, 0, Math.PI * 2, false );
        }
        return s;
      }, [props.signalSmallYCRCB])


      const points = shape.getPoints();
      const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );

    return (
      <line ref={mesh} position={[0, 0, 0]} geometry={geometryPoints}>
        <lineBasicMaterial color="#0c0" />
      </line>
    );
  }

const SphereColorful = (props) => {
    const mesh = useRef();

    const color = new THREE.Color( props.RGB[0], props.RGB[1], props.RGB[2] );
    const innergeometry = new THREE.SphereGeometry( 0.02, 5, 5 );

    return (
      <mesh ref={mesh} position={props.position} geometry={innergeometry}>
        <meshBasicMaterial color={color}/>
      </mesh>
    )
  }