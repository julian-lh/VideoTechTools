import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

import { cvtSignalRGBtoYCBCR } from '../../../calculations/CalcComponentSignal';



export const VectorscopeBounds = () => {
    const mesh = useRef();

    const shape = useMemo(() => {
      const arcShape = new THREE.Shape()
                      .moveTo( 0, 0 )
                      .absarc( 0, 0, 1, 0, Math.PI * 2, false );
      return arcShape;
    }, [])

    const axisX = useMemo(() => {
      const s = new THREE.Shape();
      s.moveTo(-1.1, 0);
      s.lineTo(1.1, 0);
      return s;
    }, [])

    const axisY = useMemo(() => {
      const s = new THREE.Shape();
      s.moveTo(0, -1.1);
      s.lineTo(0, 1.1);
      return s;
    }, [])

      const pointsCircle = shape.getPoints(30);
      const geometryPointsCircle = new THREE.BufferGeometry().setFromPoints( pointsCircle );

      const pointsAxisX = axisX.getPoints();
      const geometryPointsAxisX = new THREE.BufferGeometry().setFromPoints( pointsAxisX );

      const pointsAxisY = axisY.getPoints();
      const geometryPointsAxisY = new THREE.BufferGeometry().setFromPoints( pointsAxisY );


    return (
      <>
      <line ref={mesh} position={[0, 0, 0]} geometry={geometryPointsCircle}>
        <lineBasicMaterial color="#ccc" />
      </line>
      <line ref={mesh} position={[0, 0, 0]} geometry={geometryPointsAxisX}>
        <lineBasicMaterial color="#ccc" />
      </line>
      <line ref={mesh} position={[0, 0, 0]} geometry={geometryPointsAxisY}>
        <lineBasicMaterial color="#ccc" />
      </line>
      </>
    );
}


export const PeakSignalHexagon = ({ videoStandard }) => {
    const mesh = useRef();
    const maxSignalRGB = [[[1, 0, 0], [1, 1, 0],
                            [0, 1, 0], [0, 1, 1],
                            [0, 0, 1], [1, 0, 1], [1, 0, 0]]];
    const maxSignalYCBCR = cvtSignalRGBtoYCBCR(maxSignalRGB, videoStandard);

    const shape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(maxSignalYCBCR[0][0][1], maxSignalYCBCR[0][0][2]);
          for(let row of maxSignalYCBCR) {
            for(let pixel of row) {
              s.lineTo(pixel[1],pixel[2]);
            }
          }
        return s;
      }, [videoStandard])

      const points = shape.getPoints();
      const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );

    return (
      <line ref={mesh} position={[0, 0, 0]} geometry={geometryPoints}>
        <lineBasicMaterial color="#ccc" />
      </line>
    );
}
