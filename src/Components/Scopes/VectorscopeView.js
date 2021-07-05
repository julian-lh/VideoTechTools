import React, {useRef, useState, useEffect, useMemo, Suspense} from 'react';
import { Button, View, Text } from 'react-native';
import { Canvas, useFrame, useThree, extend, useLoader} from 'react-three-fiber';
import * as THREE from 'three';
import { rgbToYUV } from '../../calculation/ColorSpaceTransform';


const SignalPlot = (props) => {
  const mesh = useRef();
  const shape = useMemo(() => {
      const s = new THREE.Shape();
      s.moveTo(props.YUV[0][1], props.YUV[0][2]);
      if (props.YUV.length > 1){
        for(let v of props.YUV) {
          s.lineTo(v[1], v[2]);
        }
      }else{
        s.absarc( props.YUV[0][1], props.YUV[0][2], 0.01, 0, Math.PI * 2, false );
      }
      return s;
    }, [props.YUV])

  //const geometry = new THREE.ShapeGeometry( shape );
  //shape.autoClose = true;
    const points = shape.getPoints();
    //const spacedPoints = shape.getSpacedPoints( 0.1 );
    const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );
    //const geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints( spacedPoints );

  return (
    <line ref={mesh} position={[0, 0, 0]} geometry={geometryPoints}>
      <lineBasicMaterial color="#0c0" />
    </line>
  );
}


const VectorscopeBounds = () => {
  const mesh = useRef();
  const shape = useMemo(() => {
    const arcShape = new THREE.Shape()
					.moveTo( 0, 0 )
					.absarc( 0, 0, 1, 0, Math.PI * 2, false );
    return arcShape;
  }, [])

  //const geometry = new THREE.ShapeGeometry( shape );
  //shape.autoClose = true;
    const points = shape.getPoints();
    //const spacedPoints = shape.getSpacedPoints( 0.1 );
    const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );
    //const geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints( spacedPoints );

  return (
    <line ref={mesh} position={[0, 0, 0]} geometry={geometryPoints}>
      <lineBasicMaterial color="#ccc" />
    </line>
  );
}



// Quelle: https://medium.com/@joooooo308/react-three-fiber-use-gesture-to-move-the-camera-f50288cec862
function Camera(props) {
    const cam = useRef()
    const { setDefaultCamera } = useThree()

    useEffect(() => void setDefaultCamera(cam.current), [])

    useFrame(() => {
      cam.current.updateMatrixWorld();
      cam.current.lookAt(0, 0, 0);
    })
    return <orthographicCamera ref={cam} zoom={120} near={0.0} {...props} />
  }



 const VectorscopeView = (props) => {

    //const xyz =  XYZtoxyz(props.XYZ);
    //const YUV = props.RGB[1];//rgbToYUV(props.RGB[1]);
    const YUV = props.RGB;//props.RGB.map(x => rgbToYUV(x));

    return (
        <>
          <Text>{YUV}</Text>
          <Canvas style={{backgroundColor: '#000'}}>
              <Camera position={[0, 0, 1]} />
              <ambientLight/>
              <pointLight position={[-1,1,1]} castShadow/>
              <VectorscopeBounds />
              <SignalPlot YUV={YUV}/>
          </Canvas>
        </>
    );
}

export default VectorscopeView;