import React, {useRef, useMemo} from 'react';
import * as THREE from 'three';


export const WfmGrid = ({ horizontalStratchFactor = 1.78}) => {
    const meshRef = useRef();

    const positions = useMemo(() => {
        var pos = [];
        for (var y= -0.3; y <= 1.1; y += 0.1){
          pos.push([0, y, 0]);
        }
        return pos
    });

    const lineWidth = 1.1 * horizontalStratchFactor;
    const points = [new THREE.Vector3( -0.1, 0, 0 ), new THREE.Vector3( lineWidth, 0, 0 )];
    const geometry =  new THREE.BufferGeometry().setFromPoints( points );
    const lineMaterial = new THREE.LineBasicMaterial( { color: '#444', linewidth: 0.1} );
    const lineMaterial2 = new THREE.LineBasicMaterial( { color: '#222', linewidth: 1} );

    return(
      <>
      {positions.map((pos, idx) => {return (<line ref={meshRef} position={pos} geometry={geometry} material={((idx-3)%10 === 0 ? lineMaterial2 : lineMaterial)} name="lala" key={pos[1]}/>)})}
      </>
    )
  }