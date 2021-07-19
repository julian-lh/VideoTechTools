import React, {useRef, useState, useEffect, useMemo} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import Icon from 'react-native-vector-icons/Ionicons';

import { RGBSignalPreview } from '../RGBSignalPreview';
import gamutData from '../../calculation/data/gamutData.json';
import { cvtSignalRGBtoXYZ, cvtSignalXYZtoxyY, CIEBoundsValues } from '../../calculation/ColorSpaceTransform';

import { cvtSignalYCRCBtoRGB, downscaleSignalYCRCB } from '../../calculation/componentSignal';
import { FloatType } from 'three';


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

    /*
    useFrame(() => {
      mesh.current.rotation.y = mesh.current.rotation.x += 0.01;
    });*/

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

const DataPoints = ({ signalxyY, signalRGB }) => {

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

/*
const SphereColorfulUseMemo = (props) => {
  const mesh = useRef();
  const meshes = useMemo(()=>{
    const meshesArray = [];
    for (const [idxX, x] of props.signalxyY.entries()){
      for (const [idxY, y] of x.entries()){

        const geometry = new THREE.SphereGeometry( 0.01, 5, 5 );
        const clr = new THREE.Color( props.signalRGB[idxX][idxY][0], props.signalRGB[idxX][idxY][1], props.signalRGB[idxX][idxY][2] );
        const material = new THREE.MeshBasicMaterial({ color: clr });
        const ms = new THREE.Mesh( geometry, material )
        ms.position = new THREE.Vector3( y[0], y[1], y[2] );
        meshesArray.push(ms);
      }
    }
    return meshesArray;
  }, [props.signalxyY, props.signalRGB]);

  return (
    <mesh ref={mesh} mesh={meshes}/>
  )
}
*/

const COS = (props) => {
    return(
        <axesHelper {...props}/>
    );
}

const GamutTriangle = (props) => {
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
    const color = new THREE.Color( props.rgbColor[0], props.rgbColor[1], props.rgbColor[2] );

    return (
      <line ref={mesh} position={[0, 0, 0]} geometry={geometryPoints}>
        <lineBasicMaterial color={color} />
      </line>
    );
}
const GamutReferences = (props) => {
    //const visibleGamutData = props.visibleGamutBounds.map( (x, idx) => (x ? gamutData[idx]));
    const visibleGamutData = [];
    props.visibleGamutBounds.forEach((value, idx) => {
      if (value) {
        visibleGamutData.push(gamutData[idx]);
      }
    });
    return(
      <>
        {visibleGamutData.map((x, idx) => <GamutTriangle r={x.r} g={x.g} b={x.b} rgbColor={x.previewColor} key={idx}/>)}
      </>
    );
}
const GamutLabels = (props) => {
  const visibleGamutData = [];
  props.visibleGamutBounds.forEach((value, idx) => {
    if (value) {
      visibleGamutData.push(gamutData[idx]);
    }
  });
  //hätte auch die Farbe einfach direkt als HEX-String anlegen können
  return(
    <>
      {visibleGamutData.map((x, idx) => <Text style={{color: '#'+((x.previewColor[0]*10).toString(16))+((x.previewColor[1]*10).toString(16))+((x.previewColor[2]*10).toString(16))}} key={idx}>{x.name}</Text>)}
    </>
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

const SettingsPopOver = (props) => {

  const toggleGamutBounds = (idx) =>{
    const gamutArray = [...props.visibleGamutBounds];
    gamutArray[idx] = !gamutArray[idx];
    props.setVisibleGamutBounds(gamutArray);
  }

  return(
    <View style={{left: 0, right: 0, top:0, backgroundColor: "#3338", position: 'absolute', zIndex: 2, alignItems: "center"}}>
      <View style={{width: "80%", minHeight: "70%", backgroundColor: "#ccc", padding: 10, marginVertical:10, justifyContent: "flex-start", alignItems: "center"}}>
        <Text style={{fontSize: 20, color: "#333", paddingBottom: 10}}>Einstellungen</Text>
        <View style={{backgroundColor: "#ddd", padding: 5, marginBottom: 5}}>
          <Text>Input-Signal</Text>
          <View style={{ width: "100%", flexDirection: "row", justifyContent: 'space-around', alignItems: "center" }}>
            <Button title="Rec.601" color={(props.vidStdIdx == 0 ? "orange" : "gray")} onPress={()=> props.setVidStdIdx(0)}></Button>
            <Button title="Rec.709" color={(props.vidStdIdx == 1 ? "orange" : "gray")} onPress={()=> props.setVidStdIdx(1)}></Button>
            <Button title="Rec.2020" color={(props.vidStdIdx == 2 ? "orange" : "gray")} onPress={()=> props.setVidStdIdx(2)}></Button>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
            {props.bitDepths.map((x, idx) => <Button title={x.toString()} color={(props.bitDepthIdx == idx ? "orange" : "gray")} onPress={()=>props.setBitDepthIdx(idx)}  key={idx}></Button>)}
          </View>
        </View>
        <View style={{backgroundColor: "#ddd", padding: 5, marginBottom: 8}}>
          <Text>Referenzen</Text>
          <View style={{ flexDirection: "row", justifyContent: 'space-around', alignItems: "center" }}>
            {props.visibleGamutBounds.map( (x, idx) => <Button title={gamutData[idx].name} color={(x ? "orange" : "gray")}  onPress={()=> toggleGamutBounds(idx)}  key={idx}></Button>)}
          </View>
        </View>
        <Button title="Schließen" onPress={()=>props.setSettingsVisible(0)}></Button>
      </View>
    </View>
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
    const [largePreview, setLargePreview] = useState(false);
    const togglePreviewSize = () => setLargePreview(!largePreview);
    const [camPos, setCamPos] = useState([0.5, 0.5, 1.1]);
    const [visibleGamutBounds, setVisibleGamutBounds] = useState(new Array(gamutData.length).fill(false));
    const [settingsVisible, setSettingsVisible] = useState(false);

    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const switchVidStd = () => {vidStdIdx < 2 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);
    const switchBitDepth = () => setBitDepthIdx(1 - bitDepthIdx);

    // convert signal
    const signalYCRCB = props.signalYCRCB;
    const smallSignalYCRCB = useMemo(() => downscaleSignalYCRCB(signalYCRCB, bitDepths[bitDepthIdx]), [signalYCRCB, bitDepthIdx]);
    const signalRGB = useMemo(() => cvtSignalYCRCBtoRGB(smallSignalYCRCB, videoStandards[vidStdIdx]), [smallSignalYCRCB, vidStdIdx]);

    const signalXYZ = useMemo(() => cvtSignalRGBtoXYZ(signalRGB, videoStandards[vidStdIdx]), [signalRGB, vidStdIdx]);
    const signalxyY = useMemo(() => cvtSignalXYZtoxyY(signalXYZ), [signalXYZ]);
  //<GamutBounds r={[0.8, 0.1]} g={[0.5, 0.7]} b={[0.1, 0.1]}/>

  //<ambientLight/>
  //<pointLight position={[-1,1,1]} castShadow/>
  //               {signalxyY.map( (x, idx1) =>  x.map( (y, idx2) => (<SphereColorful xyY={y} RGB={signalRGB[idx1][idx2]} name={'box1'} key={(idx1 * 100) + idx2}/> ) ) )}
// <SphereColorfulUseMemo signalxyY={signalxyY} signalRGB={signalRGB} />
//              {signalxyY.map( (x, idx1) =>  x.map( (y, idx2) => (<SphereColorful xyY={y} RGB={signalRGB[idx1][idx2]} name={'box1'} key={(idx1 * 100) + idx2}/> ) ) )}

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Canvas style={{ zIndex: 0, flex: 1, backgroundColor: '#eee', minWidth: 20, minHeight: 20}}>
              <Camera position={camPos} />
              <COS />
              <CIEBounds />
              <GamutReferences visibleGamutBounds={visibleGamutBounds}/>
              <DataPoints signalxyY={signalxyY} signalRGB={signalRGB}/>
          </Canvas>

          <View style={{ position: 'absolute', zIndex: 1, top: 0}}>
            <Text style={{ color: '#555', padding: 10}}>x: {signalxyY[0][0][0].toFixed(4)} {"\n"}y: {signalxyY[0][0][1].toFixed(4)}{"\n"}Y: {signalxyY[0][0][2].toFixed(4)}</Text>
          </View>
          <View style={{ position: 'absolute', zIndex: 1,top: 50, padding: 10}}>
            <GamutLabels visibleGamutBounds={visibleGamutBounds}/>
          </View>

          {(settingsVisible ? <SettingsPopOver vidStdIdx={vidStdIdx} setVidStdIdx={setVidStdIdx} bitDepths={bitDepths} bitDepthIdx={bitDepthIdx} setBitDepthIdx={setBitDepthIdx} visibleGamutBounds={visibleGamutBounds} setVisibleGamutBounds={setVisibleGamutBounds} setSettingsVisible={setSettingsVisible}/> : <View/>)}

          <View style={{ position: 'absolute', zIndex: 1, top: 10, right:10, minWidth: 70, minHeight: 80, justifyContent: "flex-start", alignItems: "flex-end"}}>
            <TouchableOpacity style={{ minWidth: 20, minHeight:(largePreview ? 110 : 45), width: (largePreview ? "60%" : "20%"), aspectRatio: 1.78}} onPress={togglePreviewSize}>
              <RGBSignalPreview rgbSignal={signalRGB}/>
            </TouchableOpacity>
            <Button title={"Rec." + videoStandards[vidStdIdx]} onPress={switchVidStd} type="clear"/>
            <Button title={bitDepths[bitDepthIdx] + " bit"} onPress={switchBitDepth} type="clear"/>
            <Button icon={<Icon name="settings-sharp" size={25} color="#38f"/>} title="" type="clear" onPress={x => setSettingsVisible(!settingsVisible)}/>
          </View>

          <View style={{ position: 'absolute', zIndex: 1, bottom: 0, width: "100%", flexDirection: "row", justifyContent: 'space-around' }}>
            <Button title="X-Y" onPress={()=>setCamPos([0.5, 0.5, 1.1])} type="clear"/>
            <Button title="X-Z" onPress={()=>setCamPos([0.5, 1.1, 0.5])} type="clear"/>
            <Button title="Z-Y" onPress={()=>setCamPos([1.1, 0.5, 0.5])} type="clear"/>

            <Button title="Perspective" onPress={()=>setCamPos([1.2, 1.2, 1.2])} type="clear"/>

          </View>
        </View>

      </View>
    );
}
