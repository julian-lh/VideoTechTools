import React, {useRef, useMemo} from 'react';
import * as THREE from 'three';

import { CieBoundsValues } from '../../../calculations/CalcColorSpaceTransform';


export const COS = (props) => {
    return(
        <axesHelper {...props}/>
    );
}


export const CieBounds = () => {
  const mesh = useRef();
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(CieBoundsValues[0][1], CieBoundsValues[0][2], CieBoundsValues[0][3]);
    for (let v of CieBoundsValues) {
      s.lineTo(v[1], v[2], v[3]);
    }
    s.lineTo(CieBoundsValues[0][1], CieBoundsValues[0][2], CieBoundsValues[0][3]);
    return s;
  }, [])

  const points = shape.getPoints();
  const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );

  return (
    <line ref={mesh} position={[0, 0, 0]} geometry={geometryPoints}>
      <lineBasicMaterial color="#999" linewidth={1}/>
    </line>
  );
}