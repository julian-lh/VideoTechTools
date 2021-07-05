import React, {useRef, useState, useEffect, useMemo} from 'react';
import { SafeAreaView, Button, View, Text } from 'react-native';
import { Canvas, useFrame, useThree, extend} from 'react-three-fiber';
import * as THREE from 'three';
import { RGBtoXYZ, XYZtoxyz, CIEBoundsValues} from '../../calculation/ColorSpaceTransform';

import { YCRCBtoRGB, downscaleYCRCB } from '../../calculation/componentSignal';

const Box = (props) => {
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y = mesh.current.rotation.x += 0.01;
    });
    return (
      <mesh ref={mesh} position={props.position}>
        <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
        <meshPhysicalMaterial color={'blue'}/>
      </mesh>
    )
  }

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
        <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color={("rgb(" + red_val + ", " + green_val + ", " + blue_val + ")")}/>
      </mesh>
    )
  }

const COS = (props) => {

    return(
        <axesHelper {...props}/>
    );
}

const CIEBounds = () => {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(CIEBoundsValues[0][1], CIEBoundsValues[0][2], CIEBoundsValues[0][3]);
    for (let v of CIEBoundsValues) {
      s.lineTo(v[1], v[2], v[3]);
    }
    s.lineTo(CIEBoundsValues[0][1], CIEBoundsValues[0][2], CIEBoundsValues[0][3]);
    return s;
  }, [])

  const geometry = new THREE.ShapeGeometry( shape );
/*
  var material = new THREE.ShaderMaterial({
    uniforms: {
      color1: {
        value: new THREE.Color("red")
      },
      color2: {
        value: new THREE.Color("purple")
      },
      bboxMin: {
        value: 0
      },
      bboxMax: {
        value: 1
      }
    },
    vertexShader: `
      uniform vec3 bboxMin;
      uniform vec3 bboxMax;

      varying vec2 vUv;

      void main() {
        vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;

      varying vec2 vUv;

      void main() {

        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `,
    wireframe: false
  });*/
//   <meshBasicMaterial attach="material" color="hotpink" />

  return (
    <mesh position={[0, 0, 0]} geometry={geometry}>
      <meshNormalMaterial />
    </mesh>
  );
}



// Quelle: https://medium.com/@joooooo308/react-three-fiber-use-gesture-to-move-the-camera-f50288cec862
function Camera(props) {
    const cam = useRef()
    const { setDefaultCamera } = useThree()

    useEffect(() => void setDefaultCamera(cam.current), [])

    useFrame(() => {
      cam.current.updateMatrixWorld();
      cam.current.lookAt(0.5, 0.5, 0.5);
    })
    return <orthographicCamera ref={cam} zoom={170} near={0.0} {...props} />
  }

 const CIEView = (props) => {
    //const [posY, setPosY] = useState(0);
    const [camPos, setCamPos] = useState([1.1, 1.1, 1.1]);
    const [bitDepth, setBitDepth] = useState(10);
    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(0);
    const switchVidStd = () => {vidStdIdx < 2 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    //const xyz =  XYZtoxyz(props.XYZ);

    const largeYCRCB = props.signalYCRCB[0];
    const smallYCRCB = downscaleYCRCB(largeYCRCB, bitDepth);
    const RGB = YCRCBtoRGB(smallYCRCB, videoStandards[vidStdIdx]);
    const XYZ = RGBtoXYZ(RGB, videoStandards[vidStdIdx]);
    const xyz = XYZtoxyz(XYZ);

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>

          <Canvas style={{ zIndex: 0, flex: 1, backgroundColor: '#eee', minWidth: 20, minHeight: 20}}>
              <Camera position={camPos} />
              <ambientLight/>
              <pointLight position={[-1,1,1]} castShadow/>
              <BoxColorful xyY={[xyz[0], xyz[1], XYZ[1]]} RGB={RGB} name={'box1'}/>
              <COS />
              <CIEBounds />
          </Canvas>
          <View style={{ position: 'absolute', zIndex: 1, top: "2%", right:0, minWidth: 50, minHeight: 10, height: "25%", padding: 10}}>
            <View style={{ backgroundColor: '#292', minWidth: 100, minHeight: 60, width: "30%", aspectRatio: 1.78, padding: 10}}>
              <Text>Platzhalter Signal-Vorschau</Text>
            </View>
            <Button style={{ padding: 5}} title={"Rec." + videoStandards[vidStdIdx]} onPress={switchVidStd}></Button>
          </View>
        </View>
          <Text style={{backgroundColor: '#222', color: '#fff'}}>x: {xyz[0]} y: {xyz[1]}</Text>
          <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
            <Button title="X-Y" onPress={()=>setCamPos([0.5, 0.5, 1.1])}></Button>
            <Button title="X-Z" onPress={()=>setCamPos([0.5, 1.1, 0.5])}></Button>
            <Button title="Z-Y" onPress={()=>setCamPos([1.1, 0.5, 0.5])}></Button>

            <Button title="Perspective" onPress={()=>setCamPos([1.2, 1.2, 1.2])}></Button>

          </View>

        </View>
    ); //<Text style={{backgroundColor: '#222', color: '#fff'}}>X: {props.XYZ[0].toFixed(2)}, Y: {props.XYZ[1].toFixed(2)}, Z: {props.XYZ[2].toFixed(2)}</Text>

    //<Box position={[1, posY, 0]} positionY={posY} name={'box1'}/>
    //<Button title="up" onPress={()=>setPosY(posY + 0.1)}></Button>
}

export default CIEView;