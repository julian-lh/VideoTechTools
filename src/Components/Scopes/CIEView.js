import React, {useRef, useState, useEffect, useMemo} from 'react';
import { SafeAreaView, Button, View, Text, TouchableOpacity } from 'react-native';
import { Canvas, useFrame, useThree, extend} from 'react-three-fiber';
import * as THREE from 'three';
import { RGBtoXYZ, XYZtoxyz, CIEBoundsValues} from '../../calculation/ColorSpaceTransform';

import { cvtSignalYCRCBtoRGB, downscaleSignalYCRCB } from '../../calculation/componentSignal';

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
        <boxBufferGeometry args={[0.03, 0.03, 0.03]} />
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

 export const CIEView = (props) => {
    //const [posY, setPosY] = useState(0);
    const [largePreview, setLargePreview] = useState(false);
    const togglePreviewSize = () => setLargePreview(!largePreview);
    const [camPos, setCamPos] = useState([1.1, 1.1, 1.1]);
    const [bitDepth, setBitDepth] = useState(10);

    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const switchVidStd = () => {vidStdIdx < 2 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    //const largeYCRCB = props.signalYCRCB[0];
    //const smallYCRCB = downscaleYCRCB(largeYCRCB, bitDepth);
    const signalYCRCB = props.signalYCRCB;
    const smallSignalYCRCB = downscaleSignalYCRCB(signalYCRCB, bitDepth);
    const signalRGB = cvtSignalYCRCBtoRGB(smallSignalYCRCB, videoStandards[vidStdIdx]);

    const RGB = signalRGB[0][0]; //Erstmal nur einzelnes Pixel

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

          <View style={{ position: 'absolute', zIndex: 1, top: 0}}>
            <Text style={{ color: '#555', padding: 10}}>x: {xyz[0].toFixed(4)} {"\n"}y: {xyz[1].toFixed(4)}{"\n"}Y: {XYZ[1].toFixed(4)}</Text>
          </View>

          <View style={{ position: 'absolute', zIndex: 1, alignContent: "flex-right",top: 5, right:0, minWidth: 50, minHeight: 10, padding: 10}}>
            <TouchableOpacity style={{ backgroundColor: ("rgb("+RGB[0]*255+", "+RGB[1]*255+", "+RGB[2]*255+")"), minWidth: 20, minHeight:(largePreview ? 100 : 40), width: (largePreview ? "60%" : "20%"), aspectRatio: 1.78}} onPress={togglePreviewSize}>
              <Text style={{ padding: 8 }}>Platzhalter Signal-Vorschau</Text>
            </TouchableOpacity>
            <Button style={{ padding: 5}} title={"Rec." + videoStandards[vidStdIdx]} onPress={switchVidStd}></Button>
          </View>

          <View style={{ position: 'absolute', zIndex: 1, bottom: 0, width: "100%", flexDirection: "row", justifyContent: 'space-around' }}>
            <Button title="X-Y" onPress={()=>setCamPos([0.5, 0.5, 1.1])}></Button>
            <Button title="X-Z" onPress={()=>setCamPos([0.5, 1.1, 0.5])}></Button>
            <Button title="Z-Y" onPress={()=>setCamPos([1.1, 0.5, 0.5])}></Button>

            <Button title="Perspective" onPress={()=>setCamPos([1.2, 1.2, 1.2])}></Button>

          </View>
        </View>



        </View>
    );
}
