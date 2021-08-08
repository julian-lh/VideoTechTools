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



const SphereColorful = ({RGB, xyY, dotSize}) => {
    const mesh = useRef();

    const segments = dotSize * 300;
    const color = new THREE.Color( RGB[0], RGB[1], RGB[2] );
    const geometry = new THREE.SphereGeometry( dotSize, segments, segments);

    return (
      <mesh ref={mesh} position={xyY} geometry={geometry}>
        <meshBasicMaterial color={color}/>
      </mesh>
    )
}

const CIEPlot = ({ signalxyY, signalRGB, dotSize = 0.01 }) => {

    return(
    <>
      {signalxyY.map( (x, idx1) =>  x.map( (y, idx2) => (<SphereColorful xyY={y} RGB={signalRGB[idx1][idx2]} dotSize={dotSize} key={(idx1 * 100) + idx2}/> ) ) )}
    </>
  )
}


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

  const d65x1 = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.01, -0.01);
    s.lineTo(0.01, 0.01);
    return s;
  }, [])

  const d65x2 = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.01, 0.01);
    s.lineTo(0.01, -0.01);
    return s;
  }, [])

  const points = shape.getPoints();
  const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );

  const pointsd65x1 = d65x1.getPoints();
  const geometryPointsd65x1 = new THREE.BufferGeometry().setFromPoints( pointsd65x1 );
  const pointsd65x2 = d65x2.getPoints();
  const geometryPointsd65x2= new THREE.BufferGeometry().setFromPoints( pointsd65x2 );

  const color = new THREE.Color( props.lineColor);

  return (
    <>
    <line ref={mesh} position={[0, 0, 0]} geometry={geometryPoints}>
      <lineBasicMaterial color={color} />
    </line>
    <line ref={mesh} position={[0.3127, 0.3290, 0]} geometry={geometryPointsd65x1}>
      <lineBasicMaterial color={color} />
    </line>
    <line ref={mesh} position={[0.3127, 0.3290, 0]} geometry={geometryPointsd65x2}>
      <lineBasicMaterial color={color} />
    </line>
    </>
  );
}
const GamutReferences = (props) => {
    //const visibleGamutData = props.visibleGamutBounds.map( (x, idx) => (x ? gamutData[idx]));
    var visibleGamutData = [];

    props.visibleGamutBounds.forEach((value, idx) => {
      if (value) {
        visibleGamutData.push(gamutData[idx]);
      }
    });

    return(
      <>
        {visibleGamutData.map((x, idx) => <GamutTriangle r={x.r} g={x.g} b={x.b} lineColor={x.previewColor} key={idx}/>)}
      </>
    );
}
const GamutLabels = (props) => {
  var visibleGamutData = [];
  props.visibleGamutBounds.forEach((value, idx) => {
    if (value) {
      visibleGamutData.push(gamutData[idx]);
    }
  });

  return(
    <>
      {visibleGamutData.map((x, idx) => <Text style={{color: x.previewColor}} key={idx}>{x.name}</Text>)}
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
      <lineBasicMaterial color="#999" linewidth={1}/>
    </line>
  );
}

const SettingsPopOver = ({vidStdLabel,
                          switchVideoStd,
                          bitDepthsLabel,
                          switchBitDepth,
                          visibleGamutBounds = undefined,
                          setVisibleGamutBounds = undefined,
                          lightBackground = undefined,
                          setlightBackground = undefined,
                          showSignalDescription = undefined,
                           setShowSignalDescription= undefined,
                          setSettingsVisible }) => {

  const toggleGamutBounds = (idx) =>{
    const gamutArray = [...visibleGamutBounds];
    gamutArray[idx] = !gamutArray[idx];
    setVisibleGamutBounds(gamutArray);
  }

  return(
    <View style={{left: 0, right: 0, top:0, bottom:0, backgroundColor: "#3338", position: 'absolute', zIndex: 2, alignItems: "center"}}>
      <View style={{width: "80%", height: "95%", backgroundColor: "#ccc", padding: 0, marginVertical:10, justifyContent: "center", alignItems: "center"}}>

        <View style={{ flexDirection: "row", justifyContent: 'justify', alignItems: "center" }}>
         <Text style={{flex: 1, fontSize: 20, color: "#333", padding: 10}}>Einstellungen</Text>
          <Button  icon={ <Icon name="ios-close" size={20} color="black"  />} onPress={()=>setSettingsVisible(0)} type="clear"/>
        </View>

        <ScrollView style={{marginBottom: 5}}>
          <View style={{flex: 1, backgroundColor: "#ddd", padding: 5, margin: 2.5}}>
            <Text>Input-Signal interpretieren als</Text>
            <View style={{ flexDirection: "row", justifyContent: 'space-around', alignItems: "center" }}>
              <Button title={"Rec." + vidStdLabel} onPress={switchVideoStd} type="clear"/>
              <Button title={bitDepthsLabel + " bit"} onPress={switchBitDepth} type="clear"/>
            </View>
          </View>

          {visibleGamutBounds !== undefined ?
          <View style={{flex: 1, backgroundColor: "#ddd", padding: 5, margin: 2.5}}>
            <Text>Gamut-Grenzen</Text>
            <View style={{  flexDirection: "row", justifyContent: 'space-around', alignItems: "center" }}>
              {visibleGamutBounds.map( (x, idx) => <Button title={gamutData[idx].name} titleStyle={{ color: (x ? "orange" : "gray")}} onPress={()=> toggleGamutBounds(idx)}  key={idx} type="clear"/>)}
            </View>
          </View> : <View />}

          <View style={{ flexDirection: "row", justifyContent: 'justify', alignItems: "center" }}>

            {showSignalDescription !== undefined ?
              <View style={{ flex: 1, backgroundColor: "#ddd", padding: 5, margin: 2.5}}>
              <Text>Signal-Legende</Text>
              <View style={{  flexDirection: "row", justifyContent: 'space-around', alignItems: "center" }}>
                <Button title={(showSignalDescription ? 'An' : 'Aus')}  onPress={()=> setShowSignalDescription(!showSignalDescription)} type="clear"/>
              </View>
            </View> : <View />}

            {lightBackground !== undefined ?
              <View style={{ flex: 1, backgroundColor: "#ddd", padding: 5, margin: 2.5}}>
              <Text>Hintergrundfarbe</Text>
              <View style={{  flexDirection: "row", justifyContent: 'space-around', alignItems: "center" }}>
                <Button title={(lightBackground ? 'hell' : 'dunkel')}  onPress={()=> setlightBackground(!lightBackground)} type="clear"/>
              </View>
            </View> : <View />}
            </View>
        </ScrollView>
      </View>
    </View>
  );
}


// Quelle: https://medium.com/@joooooo308/react-three-fiber-use-gesture-to-move-the-camera-f50288cec862
function Camera(props) {
    const cam = useRef()
    const { setDefaultCamera } = useThree()

    const { camera, size: { width, height } } = useThree();
    const initialZoom = Math.min(width/1.3, height/1.3);

    useEffect(() => {
      camera.zoom = initialZoom + props.zoomOffset;
      //cam.current.setRotationFromAxisAngle( new THREE.Vector3(1.2, -0.20, -1), 0.4 );
      camera.updateProjectionMatrix();
    },[props.zoomOffset])

    useEffect(() => void setDefaultCamera(cam.current), [])

    useFrame(() => {
      cam.current.updateMatrixWorld();
      cam.current.lookAt(0.5, 0.4, 0.4);
    })

    return <orthographicCamera ref={cam} zoom={initialZoom} near={0.0} {...props} />
  }


 export const CIEView = ({ signalYCRCB, withOverlays = false, encodedVideoStandard = 1 }) => {

    const [camPos, setCamPos] = useState([0.5, 0.4, 1.1]);
    const [zoomOffset, setZoomOffset] = useState(0);

    const [largePreview, setLargePreview] = useState(false);
    const togglePreviewSize = () => setLargePreview(!largePreview);

    const [settingsVisible, setSettingsVisible] = useState(false);
    const [dataDotSize, setDataDotSize] = useState(0.015);
    const [lightBackground, setLightBackground] = useState(true);
    const [showSignalDescription, setShowSignalDescription] = useState(false);

    const [visibleGamutBounds, setVisibleGamutBounds] = useState(new Array(gamutData.length).fill(false));

    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(encodedVideoStandard);
    const switchVideoStd = () => {vidStdIdx < videoStandards.length-1 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);
    const switchBitDepth = () => setBitDepthIdx(1 - bitDepthIdx);


    // convert signal
    const smallSignalYCRCB = useMemo(() => downscaleSignalYCRCB(signalYCRCB, bitDepths[bitDepthIdx]), [signalYCRCB, bitDepthIdx]);
    const signalRGB = useMemo(() => cvtSignalYCRCBtoRGB(smallSignalYCRCB, videoStandards[vidStdIdx]), [smallSignalYCRCB, vidStdIdx]);

    //const signalRGBlinear = useMemo(() =>  offsetSignalGamma(signalRGB, 0.42), [signalRGB, vidStdIdx]);

    const signalXYZ = useMemo(() => cvtSignalRGBtoXYZ(signalRGB, videoStandards[vidStdIdx]), [signalRGB, vidStdIdx]);
    const signalxyY = useMemo(() => cvtSignalXYZtoxyY(signalXYZ), [signalXYZ]);


  //               {signalxyY.map( (x, idx1) =>  x.map( (y, idx2) => (<SphereColorful xyY={y} RGB={signalRGB[idx1][idx2]} name={'box1'} key={(idx1 * 100) + idx2}/> ) ) )}
// <SphereColorfulUseMemo signalxyY={signalxyY} signalRGB={signalRGB} />
//              {signalxyY.map( (x, idx1) =>  x.map( (y, idx2) => (<SphereColorful xyY={y} RGB={signalRGB[idx1][idx2]} name={'box1'} key={(idx1 * 100) + idx2}/> ) ) )}

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>

          <Canvas style={{ zIndex: 0, flex: 1, backgroundColor: (lightBackground ? '#eee' : '#333'), minWidth: 20, minHeight: 20}}>
            <Camera position={camPos} zoomOffset={zoomOffset}/>
            <COS />
            <CIEBounds />

            <GamutReferences visibleGamutBounds={visibleGamutBounds}/>
            <CIEPlot signalxyY={signalxyY} signalRGB={signalRGB} dotSize={dataDotSize}/>
          </Canvas>

          <View style={{ position: 'absolute', zIndex: 1, top: 5, left:0, right: 0, padding: 10}}>
            <VideoStandardAlertView signalStd={encodedVideoStandard} scopeStd={vidStdIdx} />
          </View>

          <View style={{ position: 'absolute', zIndex: 1, bottom: 30, padding: 10}}>
            <GamutLabels visibleGamutBounds={visibleGamutBounds}/>
          </View>
          <View style={{ position: 'absolute', zIndex: 1, top: 0, left: 0}}>
            {showSignalDescription ? <Text style={{ color: '#555', padding: 10}}>x: {signalxyY[0][0][0].toFixed(4)} {"\n"}y: {signalxyY[0][0][1].toFixed(4)}{"\n"}Y: {signalxyY[0][0][2].toFixed(4)}</Text>  : <View/>}
          </View>

          {(settingsVisible ? <SettingsPopOver vidStdLabel={videoStandards[vidStdIdx]}
                                                switchVideoStd={switchVideoStd}
                                                bitDepthsLabel={bitDepths[bitDepthIdx]}
                                                switchBitDepth={switchBitDepth}
                                                visibleGamutBounds={visibleGamutBounds}
                                                setVisibleGamutBounds={setVisibleGamutBounds}
                                                lightBackground={lightBackground}
                                                setlightBackground={setLightBackground}
                                                showSignalDescription={showSignalDescription}
                                                setShowSignalDescription={setShowSignalDescription}
                                                setSettingsVisible={setSettingsVisible}/> : null)}

          {withOverlays ? <>
          <View style={{ position: 'absolute', zIndex: 1, top: 10, right:10, minWidth: 70, minHeight: 80, justifyContent: "flex-start", alignItems: "flex-end"}}>
            <TouchableOpacity style={{ minWidth: 20, minHeight:(largePreview ? 110 : 45), width: (largePreview ? "60%" : "20%"), aspectRatio: 1.78}} onPress={togglePreviewSize}>
              <RGBSignalPreview rgbSignal={signalRGB}/>
            </TouchableOpacity>
            <Button icon={<Icon name="settings-sharp" size={25} color="#38f"/>} title="" type="clear" onPress={x => setSettingsVisible(!settingsVisible)}/>
            <Button title={"+"} onPress={() => setZoomOffset(zoomOffset + 10)} style={{paddingRight: 5}} titleStyle={{ fontWeight: 'bold'}} type="clear"/>
            <Button title={"-"} onPress={() => setZoomOffset(zoomOffset - 10)} style={{paddingRight: 5}} titleStyle={{ fontWeight: 'bold'}} type="clear"/>
          </View>

          <View style={{ position: 'absolute', zIndex: 1, bottom: 0, width: "100%", flexDirection: "row", justifyContent: 'space-around' }}>
            <Button title="xy" onPress={()=>setCamPos([0.5, 0.4, 1.1])}/>
            <Button title="xyY" onPress={()=>{setCamPos([0.5, - 0.2, 1.2]); setZoomOffset(0)}}/>
          </View>
          </> : null }
        </View>

      </View>
    );
}

/*         <Button title="xY" onPress={()=>setCamPos([0.5, 1.1, 0.4])} type="clear"/>
            <Button title="Yy" onPress={()=>setCamPos([1.1, 0.4, 0.4])} type="clear"/>
            */