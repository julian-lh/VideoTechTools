import React, {useRef, useState, useEffect, useMemo } from 'react';
import {  View, Text, TouchableOpacity } from 'react-native';

import { Button  } from 'react-native-elements';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import Icon from 'react-native-vector-icons/Ionicons';

import { RGBSignalPreview } from '../signalPreview/RGBSignalPreview';
import { cvtSignalYCRCBtoRGB, cvtSignalRGBtoYCRCB, downscaleSignalYCRCB } from '../../../calculation/ComponentSignal';

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

  const SignalPlot = (props) => {
    const mesh = useRef();
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(props.smallSignalYCRCB[0][0][2], props.smallSignalYCRCB[0][0][1]);
        if (props.smallSignalYCRCB.length > 1 || props.smallSignalYCRCB[0].length > 1){
          for(let row of props.smallSignalYCRCB) {
            for(let pixel of row) {
              s.lineTo(pixel[2],pixel[1]);
            }
          }
        }else{
          s.absarc( props.smallSignalYCRCB[0][0][2], props.smallSignalYCRCB[0][0][1], 0.01, 0, Math.PI * 2, false );
        }
        return s;
      }, [props.smallSignalYCRCB])

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


const SettingsPopOver = (props) => {
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
          <View style={{backgroundColor: "#ddd", padding: 5, marginBottom: 8, width: "100%"}}>
           <Text>Signalplot</Text>
            <Button title={(props.discreteSigRep? "diskrete Punkte" : "Linienzug")} color="orange" onPress={()=>props.setDiscreteSigRep(!props.discreteSigRep)}></Button>
          </View>
          <Button title="Schließen" onPress={()=>props.setSettingsVisible(0)}></Button>
        </View>
      </View>
    );
  }
/*
const WFMGrid = () => {
  const mesh = useRef();

  const lines = useMemo(() => {
    const lineAr = []
    for (var y= -0.3; y <= 0.8; y += 0.1){
      const points = [];
      points.push( new THREE.Vector3( - 0.1, y, 0 ) );
      points.push( new THREE.Vector3( 1, y, 0 ) );

      const geometry = new THREE.BufferGeometry().setFromPoints( points );
      var lineMaterial = new THREE.LineBasicMaterial( { color: 0x666655} );
      if (y == 0) {
          lineMaterial = new THREE.LineBasicMaterial( { color: 0xaaaa99, linewidth: 0.1} );
      }
      //const line = new THREE.Line( geometry, lineMaterial );
      lineAr.push([geometry, lineMaterial]);
    }
    return lineAr;
  }, [])

  return(
    <>
      {lines.map((g, m) => {<line ref={mesh} geometry={g} material={m} />})}
    </>
  )
}
*/

const WFMPlot = ({signalYCRCB, signalRGB, representationID}) => {
  const meshRef = useRef();

  const signal = (representationID == 0 ? signalRGB : signalYCRCB);

  //signalYCRCB = [[[0.5,0,0],[0.1,0,0]]]

  const amountHorizontalPixels = signalYCRCB[0].length;
  const pixelWidth = 1 / amountHorizontalPixels;

  // [xPos, signalwert, 0]

  const linePositions = useMemo(() => {
    const lineArray = [];
    for (var row = 0; row < signalYCRCB.length; row++){
      for (var column = 0; column < signalYCRCB[row].length; column++) {
        const x = column / amountHorizontalPixels ;
        const y = signalYCRCB[row][column][0];
        lineArray.push([x, y, 0]);
      }
    }
    return lineArray;
  },[signalYCRCB]);

  const points = [new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( pixelWidth, 0, 0 )];
  const geometry =  new THREE.BufferGeometry().setFromPoints( points );
  const lineMaterial = new THREE.LineBasicMaterial( { color: '#393', linewidth: 2} );

  return(
    <>
        {linePositions.map((pos, idx) => {return (<line ref={meshRef} position={pos} geometry={geometry} material={lineMaterial} name="lala" key={idx * 200}/>)})}
    </>
  )
}

const WFMGrid = () => {
  const meshRef = useRef();
  const attributeRef = useRef();

  const positions = useMemo(() => {
      var pos = [];
      for (var y= -0.3; y <= 1.1; y += 0.1){
        pos.push([0, y, 0]);
      }
      return pos
  },[]);

  //const positions = new Array(10).map((v, i) => [0, (0.1 * i - 0.3), 0])

  const points = [new THREE.Vector3( -0.1, 0, 0 ), new THREE.Vector3( 1.1, 0, 0 )];
  const geometry =  new THREE.BufferGeometry().setFromPoints( points );
  const lineMaterial = new THREE.LineBasicMaterial( { color: '#333', linewidth: 0.1} );

  return(
    <>
    {positions.map((pos) => {return (<line ref={meshRef} position={pos} geometry={geometry} material={lineMaterial} name="lala" key={pos[1]}/>)})}
    <line ref={meshRef} position={[0,0,0]} geometry={geometry}  name="lala" key={34323}>
      <lineBasicMaterial color="#333" linewidth={1} />
    </line>
    </>
  )
}
/*
const WFMGrid = () => {
  const meshRef = useRef();
  const attributeRef = useRef();

  const positions = useMemo(() => {
      var pos = [];
      for (var y= -0.3; y <= 0.8; y += 0.1){
        pos.push([0, y, 0]);
      }
      return pos
  },[]);

  const points = [new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 1, 0, 0 )];
  const geometry =  new THREE.BufferGeometry().setFromPoints( points );
  const lineMaterial = new THREE.LineBasicMaterial( { color: 0xaaaa99, linewidth: 0.1} );

  return(
    <instancedMesh
      ref={meshRef}
      args={[null, null, 10]}
    >
      <line geometry={geometry}>
        <lineBasicMaterial color={'#888'} />
        <bufferAttribute
          ref={attributeRef}
          attachObject={['attributes', 'position']}
          array={positions}
          count={10}
          itemSize={3}
          />
      </line>
    </instancedMesh>
  )
}*/
/*
function WFMGrid() {
  const [refresh, setRefresh] = useState(true)

  const tempObject = new THREE.Object3D()
  const tempColor = new THREE.Color()

  const colorArray = useMemo(() => Float32Array.from(new Array(500).fill()), [])

  const flatSignalxyY = useMemo(() => props.signalxyY.flat(1), [props.signalxyY])
  const flatSignalRGB = useMemo(() => props.signalRGB.flat(1), [props.signalRGB])

  const meshRef = useRef()

  useEffect(() => {
    setRefresh(true)
  }, [flatSignalxyY])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.z = meshRef.current.rotation.z + 0.01

    let i = 0

    let partTime = 0
    if(refresh){
    for (let x = 0; x < flatSignalxyY.length; x++) {
      const id = i++

      const xyY = flatSignalxyY[id]
      tempObject.position.set(xyY[0] - 0.5, xyY[1] - 0.5, xyY[2] - 0.5)
      const rgb = flatSignalRGB[id]
      tempColor.setRGB(rgb[0], rgb[1], rgb[2]).toArray(colorArray, id * 3)
      //meshRef.current.geometry.attributes.color.needsUpdate = true

      tempObject.updateMatrix()
      meshRef.current.setMatrixAt(id, tempObject.matrix)
    }

    setRefresh(false)
    meshRef.current.instanceMatrix.needsUpdate = true
  }
  })
  return (
    <instancedMesh ref={meshRef} args={[null, null, flatSignalxyY.length]}>
      <bufferGeometry attach="geometry" >
      </bufferGeometry>
      <meshBasicMaterial vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )
}*/


// Quelle: https://medium.com/@joooooo308/react-three-fiber-use-gesture-to-move-the-camera-f50288cec862
function Camera(props) {
    const cam = useRef()
    const { setDefaultCamera } = useThree()

    useEffect(() => void setDefaultCamera(cam.current), [])

    useFrame(() => {
      cam.current.updateMatrixWorld();
      cam.current.lookAt(0.5, 0.3, 0);
    })
    return <orthographicCamera ref={cam} zoom={160} near={0.0} {...props} />
  }

export const WFMView = (props) => {
    const [largePreview, setLargePreview] = useState(false);
    const togglePreviewSize = () => setLargePreview(!largePreview);
    const [settingsVisible, setSettingsVisible] = useState(false);

    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const switchVidStd = () => {vidStdIdx < 2 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);
    const switchBitDepth = () => setBitDepthIdx(1 - bitDepthIdx);

    // settings
    const wfmReps = ["RGB", "YCrCb", "Luma"];
    const [wfmRepIdx, setWfmRepIdx] = useState(1);
    const switchWfmRep = () => {wfmRepIdx < 2 ? setWfmRepIdx(wfmRepIdx + 1) : setWfmRepIdx(0)};

    const [discreteSignalRepresentation, setDiscreteSignalRepresentation] = useState(true);


    // convert signal
    const signalYCRCB = props.signalYCRCB;
    const smallSignalYCRCB = downscaleSignalYCRCB(signalYCRCB, bitDepths[bitDepthIdx]);
    const signalRGB = cvtSignalYCRCBtoRGB(smallSignalYCRCB, videoStandards[vidStdIdx]);

//                 <WFMGrid />


      return (
        <View style={{flex: 1}}>
          <Text>smallSignalYCRCB: {smallSignalYCRCB[0][0].map(x=>(" "+x.toFixed(3)))}</Text>
          <Canvas style={{ zIndex: 0, flex: 1, backgroundColor: '#eee', minWidth: 20, minHeight: 20}}>
              <Camera position={[0.5, 0.3, 1]} />
              <WFMGrid />
              <WFMPlot signalYCRCB={smallSignalYCRCB} signalRGB={signalRGB} representationID={wfmRepIdx}/>
          </Canvas>

          <View style={{ position: 'absolute', zIndex: 1, top: 10, right:10, minWidth: 70, minHeight: 80, justifyContent: "flex-start", alignItems: "flex-end"}}>
            <Button title={"Rec." + videoStandards[vidStdIdx]} onPress={switchVidStd} type="clear"/>
            <Button title={bitDepths[bitDepthIdx] + " bit"} onPress={switchBitDepth} type="clear"/>
            <Button title={wfmReps[wfmRepIdx]} onPress={switchWfmRep} type="clear"/>
            <Button icon={<Icon name="settings-sharp" size={25} color="#38f"/>} title="" type="clear" onPress={x => setSettingsVisible(!settingsVisible)}/>
          </View>

          <View style={{ position: 'absolute', zIndex: 4, bottom: 0, right:20, left: 20, minHeight: (largePreview ? 110 : 30), justifyContent: "flex-start", alignItems: 'center'}}>
            <TouchableOpacity style={{ height: '100%', aspectRatio: (largePreview ? 1.78 : undefined), width: (largePreview ? undefined : '100%')}} onPress={togglePreviewSize}>
              <RGBSignalPreview rgbSignal={signalRGB}/>
            </TouchableOpacity>
          </View>


            {(settingsVisible ? <SettingsPopOver vidStdIdx={vidStdIdx} setVidStdIdx={setVidStdIdx} bitDepths={bitDepths} bitDepthIdx={bitDepthIdx} setBitDepthIdx={setBitDepthIdx} setSettingsVisible={setSettingsVisible} discreteSigRep={discreteSignalRepresentation} setDiscreteSigRep={setDiscreteSignalRepresentation}/> : <View/>)}

          </View>
      );
  }