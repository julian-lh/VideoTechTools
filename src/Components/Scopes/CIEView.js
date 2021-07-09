import React, {useRef, useState, useEffect, useMemo} from 'react';
import { SafeAreaView, Button, View, Text, TouchableOpacity } from 'react-native';
import { Canvas, useFrame, useThree, extend} from 'react-three-fiber';
import * as THREE from 'three';
import { cvtRGBtoXYZ, cvtXYZtoxy,cvtSignalRGBtoXYZ, cvtSignalXYZtoxyY, CIEBoundsValues} from '../../calculation/ColorSpaceTransform';

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

  const SphereColorful = (props) => {
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y = mesh.current.rotation.x += 0.01;
    });

    const color = new THREE.Color( props.RGB[0], props.RGB[1], props.RGB[2] );
    const innergeometry = new THREE.SphereGeometry( 0.01, 5, 5 );
    //const outerGeometry = new THREE.SphereGeometry( 0.03, 10, 10 );

    /*<mesh ref={mesh} position={props.xyY} geometry={outerGeometry}>
        <meshBasicMaterial color={color} opacity={0.2} transparent={true}/>
      </mesh>*/

    return (
      <mesh ref={mesh} position={props.xyY} geometry={innergeometry}>
        <meshBasicMaterial color={color}/>
      </mesh>
    )
  }

const COS = (props) => {
    return(
        <axesHelper {...props}/>
    );
}

const GamutBounds = (props) => {
  const mesh = useRef();
    const shape = useMemo(() => {
      const s = new THREE.Shape();
      s.moveTo(props.r[0], props.r[1], 0);
      s.lineTo(props.g[0],props.g[1], 0);
      s.lineTo(props.b[0],props.b[1], 0);
      s.lineTo(props.r[0],props.r[1], 0);
      return s;
    }, [])

    //const geometry = new THREE.ShapeGeometry( shape );
    const points = shape.getPoints();
    const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );

    return (
      <line ref={mesh} position={[0, 0, 0]} geometry={geometryPoints}>
        <lineBasicMaterial color="#0c0" />
      </line>
    );
}

const CIEBounds = () => {
  const mesh = useRef();
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(CIEBoundsValues[0][1], CIEBoundsValues[0][2], CIEBoundsValues[0][3]);
    for (let v of CIEBoundsValues) {
      s.lineTo(v[1], v[2], v[3]);
    }
    s.lineTo(CIEBoundsValues[0][1], CIEBoundsValues[0][2], CIEBoundsValues[0][3]);
    return s;
  }, [])

  const points = shape.getPoints();
  const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );

  return (
    <line ref={mesh} position={[0, 0, 0]} geometry={geometryPoints}>
      <lineBasicMaterial color="#999" linewidth={0.5}/>
    </line>
  );
}


const CIEBoundsShape = () => {
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
      <meshBasicMaterial color="#ddd" opacity={0.5} transparent/>
    </mesh>
  );
}

const SignalPreview = (props) => {
  //Anlehnung: https://www.digitalocean.com/community/conceptual_articles/understanding-how-to-render-arrays-in-react
  return(
    <View style={{flex: 1}}>
      {props.signal.map( (x, idx1) => {
        return(<View style={{flex: 1, flexDirection: "row"}} key={idx1}>{
          x.map( (y, idx2) => <View style={{flex: 1}} backgroundColor={"rgb("+y[0]*255+","+y[1]*255+","+y[2]*255+")"} key={(2000) + idx2}/>)
      }</View>)})
        }
    </View>
  )
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
    const [largePreview, setLargePreview] = useState(false);
    const togglePreviewSize = () => setLargePreview(!largePreview);
    const [camPos, setCamPos] = useState([1.1, 1.1, 1.1]);

    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const switchVidStd = () => {vidStdIdx < 2 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);
    const switchBitDepth = () => setBitDepthIdx(1 - bitDepthIdx);

    // convert signal
    const signalYCRCB = props.signalYCRCB;
    const smallSignalYCRCB = downscaleSignalYCRCB(signalYCRCB, bitDepths[bitDepthIdx]);
    const signalRGB = cvtSignalYCRCBtoRGB(smallSignalYCRCB, videoStandards[vidStdIdx]);

    const signalXYZ = cvtSignalRGBtoXYZ(signalRGB, videoStandards[vidStdIdx]);
    const signalxyY = cvtSignalXYZtoxyY(signalXYZ);

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Canvas style={{ zIndex: 0, flex: 1, backgroundColor: '#eee', minWidth: 20, minHeight: 20}}>
              <Camera position={camPos} />
              <ambientLight/>
              <pointLight position={[-1,1,1]} castShadow/>
              {signalxyY.map( (x, idx1) =>  x.map( (y, idx2) => (<SphereColorful xyY={y} RGB={signalRGB[idx1][idx2]} name={'box1'} key={(idx1 * 100) + idx2}/> ) ) )}
              <GamutBounds r={[0.8, 0.1]} g={[0.5, 0.7]} b={[0.1, 0.1]}/>
              <COS />
              <CIEBounds />
          </Canvas>

          <View style={{ position: 'absolute', zIndex: 1, top: 0}}>
            <Text style={{ color: '#555', padding: 10}}>x: {signalxyY[0][0][0].toFixed(4)} {"\n"}y: {signalxyY[0][0][1].toFixed(4)}{"\n"}Y: {signalxyY[0][0][2].toFixed(4)}</Text>
          </View>

          <View style={{ position: 'absolute', zIndex: 1, top: 10, right:10, minWidth: 70, minHeight: 80, justifyContent: "flex-start", alignItems: "flex-end"}}>
            <TouchableOpacity style={{ minWidth: 20, minHeight:(largePreview ? 110 : 45), width: (largePreview ? "60%" : "20%"), aspectRatio: 1.78}} onPress={togglePreviewSize}>
              <SignalPreview signal={signalRGB} text={"test"}/>
            </TouchableOpacity>
            <Button title={"Rec." + videoStandards[vidStdIdx]} onPress={switchVidStd}></Button>
            <Button title={bitDepths[bitDepthIdx] + " bit"} onPress={switchBitDepth}></Button>

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
