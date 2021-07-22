import React, {useRef, useState, useEffect, useMemo, Suspense} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import Icon from 'react-native-vector-icons/Ionicons';

import { RGBSignalPreview } from '../signalPreview/RGBSignalPreview';
import { VideoStandardAlertView } from '../helpers/VideoStandardAlertView';

import { cvtSignalYCRCBtoRGB, cvtSignalRGBtoYCRCB, downscaleSignalYCRCB } from '../../../calculation/ComponentSignal';



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

const PeakSignalHexagon = (props) => {
  const mesh = useRef();
  const maxSignalRGB = [[[1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 1, 1], [0, 0, 1], [1, 0, 1], [1, 0, 0]]];
  const maxSignalYCRCB = cvtSignalRGBtoYCRCB(maxSignalRGB, props.videoStandard);
  const shape = useMemo(() => {
      const s = new THREE.Shape();
      s.moveTo(maxSignalYCRCB[0][0][2], maxSignalYCRCB[0][0][1]);
        for(let row of maxSignalYCRCB) {
          for(let pixel of row) {
            s.lineTo(pixel[2],pixel[1]);
          }
        }
      return s;
    }, [props.videoStandard])

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

const PeakSignalTolerances = () => {

}

const SettingsPopOver = (props) => {
  return(
    <View style={{left: 0, right: 0, top:0, backgroundColor: "#3338", position: 'absolute', zIndex: 2, alignItems: "center"}}>
      <View style={{width: "80%", minHeight: "70%", backgroundColor: "#ccc", padding: 10, marginVertical:10, justifyContent: "flex-start", alignItems: "center"}}>
        <Text style={{fontSize: 20, color: "#333", paddingBottom: 10}}>Einstellungen</Text>

        <View style={{backgroundColor: "#ddd", padding: 5, marginBottom: 5}}>
          <Text>Input-Signal interpretieren als</Text>
          <View style={{ width: "100%", flexDirection: "row", justifyContent: 'space-around', alignItems: "center" }}>
            <Button title={"Rec." + props.vidStdLabel} onPress={props.switchVideoStd} type="clear"/>
            <Button title={props.bitDepthsLabel + " bit"} onPress={props.switchBitDepth} type="clear"/>
          </View>
        </View>

        <View style={{backgroundColor: "#ddd", padding: 5, marginBottom: 8, width: "100%"}}>
         <Text>Signalplot</Text>
          <Button title={(props.discreteSigRep? "diskrete Punkte" : "Linienzug")} color="orange" onPress={()=>props.setDiscreteSigRep(!props.discreteSigRep)} type="clear"/>
        </View>
        <Button title="Schließen" onPress={()=>props.setSettingsVisible(0)} type="clear"/>
      </View>

    </View>
  );
}
 fontWeight: 'bold'

// Quelle: https://medium.com/@joooooo308/react-three-fiber-use-gesture-to-move-the-camera-f50288cec862
function Camera(props) {
    const cam = useRef()
    const { setDefaultCamera } = useThree()

    const { camera, size: { width, height } } = useThree();
    const initialZoom = Math.min(width/2.4, height/2.4);

    useEffect(() => void setDefaultCamera(cam.current), [])

    useFrame(() => {
      cam.current.updateMatrixWorld();
      cam.current.lookAt(0, 0, 0);
    })
    return <orthographicCamera ref={cam} zoom={initialZoom} near={0.0} {...props} />
  }


export const VectorscopeView = ({ signalYCRCB, withOverlays = false, encodedVideoStandard = 1  }) => {
  const [largePreview, setLargePreview] = useState(false);
  const togglePreviewSize = () => setLargePreview(!largePreview);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const videoStandards = ["601", "709", "2020"];
  const [vidStdIdx, setVidStdIdx] = useState(1);
  const switchVideoStd = () => {vidStdIdx < videoStandards.length-1 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};


  const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
  const [bitDepthIdx, setBitDepthIdx] = useState(0);
  const switchBitDepth = () => setBitDepthIdx(1 - bitDepthIdx);

  // settings
  const [discreteSignalRepresentation, setDiscreteSignalRepresentation] = useState(true);


  // convert signal
  const smallSignalYCRCB = downscaleSignalYCRCB(signalYCRCB, bitDepths[bitDepthIdx]);
  const signalRGB = cvtSignalYCRCBtoRGB(smallSignalYCRCB, videoStandards[vidStdIdx]);

//       <Text>smallSignalYCRCB: {smallSignalYCRCB[0][0].map(x=>(" "+x.toFixed(3)))}</Text>

    return (
      <View style={{flex: 1}}>
          <Canvas style={{ zIndex: 0, flex: 1, backgroundColor: '#eee', minWidth: 20, minHeight: 20}}>
              <Camera position={[0, 0, 1]} />
              <VectorscopeBounds />
              <PeakSignalHexagon videoStandard={videoStandards[vidStdIdx]}/>
              {discreteSignalRepresentation ? smallSignalYCRCB.map( (x, idx1) =>  x.map( (y, idx2) => (<SphereColorful position={[y[2],y[1], 0]} RGB={signalRGB[idx1][idx2]} name={'box1'} key={(idx1 * 100) + idx2}/> ) ) ) : <SignalPlot smallSignalYCRCB={smallSignalYCRCB}/>}
          </Canvas>

          <View style={{ position: 'absolute', zIndex: 1, top: 5, left:0, right: 0, padding: 10}}>
            <VideoStandardAlertView signalStd={encodedVideoStandard} scopeStd={vidStdIdx} />
          </View>

          {withOverlays ?
          <View style={{ position: 'absolute', zIndex: 1, top: 10, right:10, minWidth: 70, minHeight: 80, justifyContent: "flex-start", alignItems: "flex-end"}}>
            <TouchableOpacity style={{ minWidth: 20, minHeight:(largePreview ? 110 : 45), width: (largePreview ? "60%" : "20%"), aspectRatio: 1.78}} onPress={togglePreviewSize}>
              <RGBSignalPreview rgbSignal={signalRGB}/>
            </TouchableOpacity>
            <Button icon={<Icon name="settings-sharp" size={25} color="#38f"/>} title="" type="clear" onPress={x => setSettingsVisible(!settingsVisible)}/>
          </View> : null }

          {(settingsVisible ?
          <SettingsPopOver vidStdLabel={videoStandards[vidStdIdx]}
                                                switchVideoStd={switchVideoStd}
                                                bitDepthsLabel={bitDepths[bitDepthIdx]}
                                                switchBitDepth={switchBitDepth}
                                                setSettingsVisible={setSettingsVisible}
                                                discreteSigRep={discreteSignalRepresentation}
                                                setDiscreteSigRep={setDiscreteSignalRepresentation}/> : null)}

        </View>
    );
}