import React, {useRef, useState, useEffect, useMemo } from 'react';
import {  View, TouchableOpacity } from 'react-native';

import { Button  } from 'react-native-elements';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import Icon from 'react-native-vector-icons/Ionicons';

//import { Text as Text3D } from 'troika-three-text';
import { SettingsPopOver, VideoStandardSelectElement } from '../generalComponents/Settings';
import { RGBSignalPreview } from '../signalPreview/RGBSignalPreview';
import { VideoStandardAlertView } from '../generalComponents/VideoStandardAlertView';

import { WFMPlot } from './subviews/WFMPlot';

import { cvtSignalYCRCBtoRGB, downscaleSignalYCRCB } from '../../calculations/ComponentSignal';

//extend({ Text3D });



/*

const WFMTextLabels = () => {
    const textRef = useRef();

    const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return(
      <text3D ref={textRef}
        position={[1, 0, 0]}
          rotation={[0,0,0,0]}
          text={text}
          font={"./Philosopher.woff"}
          anchorX="center"
          anchorY="middle"
          color="#333"
        >
        <meshBasicMaterial attach="material" color="#111" />
      </text3D>
  )
}*/

const WFMGrid = ({ horizontalStratchFactor = 1.78}) => {
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
/*
const Labels = () => {
  const [opts, setOpts] = useState({
    fontSize: 0.2,
    color: "#99ccff",
    maxWidth: 300,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: "justify",
    materialType: "MeshBasicMaterial"
  });
  //const font = useLoader(THREE.FontLoader, 'Roboto.woff')

  return(
    <text3D
        text={"Test Text"}
        position={[0, 0, 0]}
        {...opts}
        anchorX="center"
        anchorY="middle"
      >
        <meshBasicMaterial attach="material" />
    </text3D>
  )
}
*/

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

    const { size: { width, height } } = useThree();
    const initialZoom = Math.min(width/2.3, height/2.3);


    useEffect(() => void setDefaultCamera(cam.current), [])

    useFrame(() => {
      cam.current.updateMatrixWorld();
      cam.current.lookAt(0.9, 0.3, 0);
    })
    return <orthographicCamera ref={cam} zoom={initialZoom} near={0.0} {...props} />
  }

export const WFMView = ({ signalYCRCB, withOverlays = false,  encodedVideoStandard = 1 }) => {
    const [largePreview, setLargePreview] = useState(false);
    const togglePreviewSize = () => setLargePreview(!largePreview);
    const [settingsVisible, setSettingsVisible] = useState(false);

    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(1);
    //const switchVideoStd = () => {vidStdIdx < videoStandards.length-1 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);
    //const switchBitDepth = () => setBitDepthIdx(1 - bitDepthIdx);

    // settings
    const wfmReps = ["RGB", "YCrCb", "Luma"];
    const [wfmRepIdx, setWfmRepIdx] = useState(0);
    const switchWfmRep = () => {wfmRepIdx < 2 ? setWfmRepIdx(wfmRepIdx + 1) : setWfmRepIdx(0)};

    const [discreteSignalRepresentation, setDiscreteSignalRepresentation] = useState(true);


    // convert signal
    const smallSignalYCRCB = downscaleSignalYCRCB(signalYCRCB, bitDepths[bitDepthIdx]);
    const signalRGB = cvtSignalYCRCBtoRGB(smallSignalYCRCB, videoStandards[vidStdIdx]);

//                 <WFMGrid />

//           <Text>smallSignalYCRCB: {smallSignalYCRCB[0][0].map(x=>(" "+x.toFixed(3)))}</Text>
//<Suspense fallback={null}>
//<TextNew hAlign="right" position={[0, 0, -2]} children="REACT" />
//</Suspense>


// <Labels />

      return (
        <View style={{flex: 1}}>
          <Canvas style={{ zIndex: 0, flex: 1, backgroundColor: '#eee', minWidth: 20, minHeight: 20}}>
              <Camera position={[0.9, 0.3, 1]} />
              <WFMGrid />


              <WFMPlot signalYCRCB={smallSignalYCRCB} signalRGB={signalRGB} representationID={wfmRepIdx}/>
          </Canvas>

          <View style={{ position: 'absolute', zIndex: 1, top: 5, left:0, right: 0, padding: 10}}>
            <VideoStandardAlertView signalStd={encodedVideoStandard} scopeStd={vidStdIdx} />
          </View>

          <View style={{ position: 'absolute', zIndex: 1, top: 10, right:10, minWidth: 70, minHeight: 80, justifyContent: "flex-start", alignItems: "flex-end"}}>
            {withOverlays ?
            <Button icon={<Icon name="settings-sharp" size={25}/>} title="" type="clear" onPress={x => setSettingsVisible(!settingsVisible)}/>
            : null }
            <Button title={wfmReps[wfmRepIdx]} onPress={switchWfmRep}/>
          </View>

          {withOverlays ?
          <View style={{ position: 'absolute', zIndex: 1, bottom: 10, right:20, left: 20, minHeight: (largePreview ? 110 : 30), justifyContent: "flex-start", alignItems: 'center'}}>
            <TouchableOpacity style={{ height: '100%', aspectRatio: (largePreview ? 1.78 : undefined), width: (largePreview ? undefined : '100%')}} onPress={togglePreviewSize}>
              <RGBSignalPreview rgbSignal={signalRGB}/>
            </TouchableOpacity>
          </View> : null }


            {(settingsVisible ?
              <SettingsPopOver setSettingsVisible={setSettingsVisible}>
                      <VideoStandardSelectElement
                          vidStdIdx={vidStdIdx}
                          setVidStdIdx={setVidStdIdx}
                          bitDepthIdx={bitDepthIdx}
                          setBitDepthIdx={setBitDepthIdx}
                      />
                  </SettingsPopOver>
            : null)}

          </View>
      );
  }

