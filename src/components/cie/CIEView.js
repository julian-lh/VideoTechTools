import React, {useRef, useState, useEffect, useMemo} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Button } from 'react-native-elements';
import { Canvas, useFrame, useThree } from 'react-three-fiber';

import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './CIEViewStyle';

import { SettingsPopOver, VideoStandardSelectElement, GamutSelectElement, ToggleElement } from '../generalComponents/Settings';
import { RGBSignalPreview } from '../signalPreview/RGBSignalPreview';
import { VideoStandardAlertView } from '../helpers/VideoStandardAlertView';

import { CIEPlot } from './Subviews/CIEPlot';
import { GamutBounds, GamutLabels } from './Subviews/GamutBounds';
import { CIEBounds, COS } from './Subviews/CIEBounds';

import { cvtSignalRGBtoXYZ, cvtSignalXYZtoxyY, CIEBoundsValues } from '../../calculations/ColorSpaceTransform';
import { offsetSignalGamma } from '../../calculations/SignalGenerator';

import { cvtSignalYCRCBtoRGB, downscaleSignalYCRCB } from '../../calculations/ComponentSignal';


function Camera(props) {
    const cam = useRef()
    const { setDefaultCamera } = useThree()

    const { camera, size: { width, height } } = useThree();
    const initialZoom = Math.min(width/1.3, height/1.3);

    useEffect(() => {
      camera.zoom = initialZoom + props.zoomOffset;
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
    const [lightBackground, setLightBackground] = useState(true);
    const [showSignalDescription, setShowSignalDescription] = useState(false);

    const [showGamut601, setShowGamut601] = useState(false);
    const [showGamut709, setShowGamut709] = useState(false);
    const [showGamut2020, setShowGamut2020] = useState(false);

    // Signal
    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(encodedVideoStandard);

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);

    // convert signal
    const smallSignalYCRCB = useMemo(() => downscaleSignalYCRCB(signalYCRCB, bitDepths[bitDepthIdx]), [signalYCRCB, bitDepthIdx]);
    const signalRGB = useMemo(() => cvtSignalYCRCBtoRGB(smallSignalYCRCB, videoStandards[vidStdIdx]), [smallSignalYCRCB, vidStdIdx]);

    //const signalRGBlinear = useMemo(() =>  offsetSignalGamma(signalRGB, 0.42), [signalRGB, vidStdIdx]);

    const signalXYZ = useMemo(() => cvtSignalRGBtoXYZ(signalRGB, videoStandards[vidStdIdx]), [signalRGB, vidStdIdx]);
    const signalxyY = useMemo(() => cvtSignalXYZtoxyY(signalXYZ), [signalXYZ]);


    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>

          <Canvas style={styles.canvas, {backgroundColor: (lightBackground ? '#eee' : '#333')}}>
            <Camera position={camPos} zoomOffset={zoomOffset}/>
            <COS />
            <CIEBounds />
            <GamutBounds showRec601={showGamut601} showRec709={showGamut709} showRec2020={showGamut2020}/>
            <CIEPlot signalxyY={signalxyY} signalRGB={signalRGB} dotSize={0.015}/>
          </Canvas>



          <View style={styles.VideoStandardAlertContainer}>
            <VideoStandardAlertView signalStd={encodedVideoStandard} scopeStd={vidStdIdx} />
          </View>

          <View style={styles.GamutLabelsContainer}>
            <GamutLabels showRec601={showGamut601} showRec709={showGamut709} showRec2020={showGamut2020}/>
          </View>

          <View style={styles.SignalDescriptionContainer}>
            {showSignalDescription ? <Text style={{ color: '#555', padding: 10}}>x: {signalxyY[0][0][0].toFixed(4)} {"\n"}y: {signalxyY[0][0][1].toFixed(4)}{"\n"}Y: {signalxyY[0][0][2].toFixed(4)}</Text>  : null}
          </View>



          {(settingsVisible ?
            <SettingsPopOver setSettingsVisible={setSettingsVisible}>
              <VideoStandardSelectElement
                            vidStdIdx={vidStdIdx}
                            setVidStdIdx={setVidStdIdx}
                            bitDepthIdx={bitDepthIdx}
                            setBitDepthIdx={setBitDepthIdx}
              />
              <GamutSelectElement
                          showRec601={showGamut601}
                          toggleRec601={setShowGamut601}
                          showRec709={showGamut709}
                          toggleRec709={setShowGamut709}
                          showRec2020={showGamut2020}
                          toggleRec2020={setShowGamut2020}
              />
              <View style={{ flexDirection: "row", justifyContent: 'justify', alignItems: "center" }}>
                <ToggleElement
                            elementTitle={"Signal Beschriftung"}
                            title={(showSignalDescription ? 'An' : 'Aus')}
                            onPress={()=> setShowSignalDescription(!showSignalDescription)}
                />
                <ToggleElement
                            elementTitle={"Hintergrundfarbe"}
                            title={(lightBackground ? 'hell' : 'dunkel')}
                            onPress={()=> setLightBackground(!lightBackground)}
                />
              </View>
            </SettingsPopOver> : null)}


          {withOverlays ? <>
            <View style={{ position: 'absolute', zIndex: 1, top: 10, right:10, minWidth: 70, minHeight: 80, justifyContent: "flex-start", alignItems: "flex-end"}}>
              <TouchableOpacity style={{ minWidth: 20, minHeight:(largePreview ? 110 : 45), width: (largePreview ? "60%" : "20%"), aspectRatio: 1.78}} onPress={togglePreviewSize}>
                <RGBSignalPreview rgbSignal={signalRGB}/>
              </TouchableOpacity>
              <Button icon={<Icon name="settings-sharp" size={25}/>} title="" type="clear" onPress={x => setSettingsVisible(!settingsVisible)}/>
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