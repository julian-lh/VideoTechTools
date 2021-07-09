import React, {useRef, useState, useEffect, useMemo, Suspense} from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { Button as Btn } from 'react-native-elements';

import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import Icon from 'react-native-vector-icons/Ionicons';

import { RGBSignalPreview } from '../RGBSignalPreview';
import { cvtSignalYCRCBtoRGB, downscaleSignalYCRCB } from '../../calculation/componentSignal';



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
/*
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
}*/


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

const FullSignalHexagon = () => {

}

const FullSignalTolerances = () => {

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
      cam.current.lookAt(0.3, 0, 0);
    })
    return <orthographicCamera ref={cam} zoom={110} near={0.0} {...props} />
  }


export const VectorscopeView = (props) => {
  const [largePreview, setLargePreview] = useState(false);
  const togglePreviewSize = () => setLargePreview(!largePreview);
  const [settingsVisible, setSettingsVisible] = useState(false);

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


    return (
      <View style={{flex: 1}}>
      <Text>smallSignalYCRCB: {smallSignalYCRCB[0][0].map(x=>(" "+x.toFixed(3)))}</Text>
          <Canvas style={{ zIndex: 0, flex: 1, backgroundColor: '#eee', minWidth: 20, minHeight: 20}}>
              <Camera position={[0.3, 0, 1]} />
              <VectorscopeBounds />
              <SignalPlot smallSignalYCRCB={smallSignalYCRCB}/>
          </Canvas>

          <View style={{ position: 'absolute', zIndex: 1, top: 10, right:10, minWidth: 70, minHeight: 80, justifyContent: "flex-start", alignItems: "flex-end"}}>
            <TouchableOpacity style={{ minWidth: 20, minHeight:(largePreview ? 110 : 45), width: (largePreview ? "60%" : "20%"), aspectRatio: 1.78}} onPress={togglePreviewSize}>
              <RGBSignalPreview rgbSignal={signalRGB}/>
            </TouchableOpacity>
            <Button title={"Rec." + videoStandards[vidStdIdx]} onPress={switchVidStd}></Button>
            <Button title={bitDepths[bitDepthIdx] + " bit"} onPress={switchBitDepth}></Button>
            <Btn icon={<Icon name="settings-sharp" size={25} color="#38f"/>} title="" type="clear" onPress={x => setSettingsVisible(!settingsVisible)}/>
          </View>

          {(settingsVisible ? <SettingsPopOver vidStdIdx={vidStdIdx} setVidStdIdx={setVidStdIdx} bitDepths={bitDepths} bitDepthIdx={bitDepthIdx} setBitDepthIdx={setBitDepthIdx} setSettingsVisible={setSettingsVisible}/> : <View/>)}

        </View>
    );
}
