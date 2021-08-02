import React, {useRef, useState, useEffect, useMemo} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Button } from 'react-native-elements';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import Icon from 'react-native-vector-icons/Ionicons';

//import { Camera } from '../helpers/Camera';

import { styles } from './CIEViewStyle';

import { RGBSignalPreview } from '../signalPreview/RGBSignalPreview';
import { VideoStandardAlertView } from '../helpers/VideoStandardAlertView';

import gamutData from '../../calculations/data/GamutData.json';
import { cvtSignalRGBtoXYZ, cvtSignalXYZtoxyY, CIEBoundsValues } from '../../calculations/ColorSpaceTransform';
import { offsetSignalGamma } from '../../calculations/SignalGenerator';

import { cvtSignalYCRCBtoRGB, downscaleSignalYCRCB } from '../../calculations/ComponentSignal';
import { ScrollView } from 'react-native-gesture-handler';



const BoxColorful = (props) => {
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y = mesh.current.rotation.x += 0.01;
      //const pos = mesh.current.position.x;
      //mesh.meshStandardMaterial.color = new THREE.Color(pos.x, 1, 1);

      //mesh.meshStandardMaterial.color = new THREE.Color(pos.x, pos.y,"xyz");
    });
    var red_val = (props.RGB[0] ? Math.abs(props.RGB[0]) * 255 : 0).toFixed(0);
    var green_val = (props.RGB[1] ? Math.abs(props.RGB[1]) * 255 : 0).toFixed(0);
    var blue_val = (props.RGB[2] ? Math.abs(props.RGB[2]) * 255 : 0).toFixed(0);

    return (
      <mesh ref={mesh} position={props.xyY}>
        <boxBufferGeometry args={[0.03, 0.03, 0.03]} />
        <meshStandardMaterial color={("rgb(" + red_val + ", " + green_val + ", " + blue_val + ")")}/>
      </mesh>
    )
}



const CIEPlot2 = ({ signalxyY, signalRGB }) => {

    const tempObject = new THREE.Object3D();
    const tempColor = new THREE.Color();


    var flatSignalxyY = signalxyY.flat(1);//useMemo(() => props.signalxyY.flat(1), [props.signalxyY]);
    var numData = flatSignalxyY.length;

    var flatSignalRGB = signalRGB.flat(1);//useMemo(() => props.signalRGB.flat(1), [props.signalRGB, props.signalxyY]);
    const colorArray = React.useMemo(() => new Float32Array(numData * 3), [signalxyY]);

    const meshRef = useRef();
    const colorAttrib = useRef();

  /*
    const positions = useMemo(() => {
      return new Float32Array(signalxyY.flat(2));
    },[signalxyY]);

    const colors = useMemo(() => {
      return new Float32Array(signalRGB.flat(2));
    },[signalRGB]);

    const bufferRef = useRef();
    const colorRef = useRef();

    useEffect(() => {
      bufferRef.current.needsUpdate = true;
      colorRef.current.needsUpdate = true;
    }, [signalxyY]);*/

    useEffect(() => {
      const mesh = meshRef.current;

      for (let i = 0; i < numData; i++) {

        const xyY = flatSignalxyY[i];
        tempObject.position.set(xyY[0], xyY[1], xyY[2]);
        const rgb = flatSignalRGB[i].map((x) => (x < 0 ? 0 : (x > 1 ? 1 : x) ));
        tempColor.setRGB(rgb[0], rgb[1], rgb[2]);
        //tempColor.set("#f00");
        tempColor.toArray(colorArray, i * 3);
        colorAttrib.current.needsUpdate = true;

        tempObject.updateMatrix();
        mesh.setMatrixAt(i, tempObject.matrix);
      }
      colorAttrib.current.needsUpdate = true;

      meshRef.current.instanceMatrix.needsUpdate = true;

    }, [flatSignalxyY]);
  //<instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]}  itemSize={3}/>
  //<meshBasicMaterial vertexColors={THREE.VertexColors} />

    return (
      <instancedMesh
        ref={meshRef}
        args={[null, null, numData]}
        frustumCulled={false}
      >
        <sphereGeometry attach="geometry" args={[0.01, 5, 5 ]}>
        <instancedBufferAttribute
            ref={colorAttrib}
            attachObject={['attributes', 'color']}
            args={[colorArray, 3]}
          />
        </sphereGeometry>
        <meshBasicMaterial
          attach="material"
          vertexColors={THREE.VertexColors}
        />
      </instancedMesh>
    )
    /*
    return(
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
          ref={bufferRef}
            attachObject={['attributes', 'position']}
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            ref={colorRef}
            attachObject={['attributes', 'color']}
            array={colors}
            count={colors.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          size={5}
          sizeAttenuation
          transparent={false}
          alphaTest={0.5}
          opacity={1.0}
          vertexColors={THREE.VertexColors}
        />
      </points>
    )*/
  }
