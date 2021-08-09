import React, { useState, useMemo} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Canvas } from 'react-three-fiber';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './CieViewStyle';

import { SettingsPopOver, VideoStandardSelectElement, GamutSelectElement, ToggleElement } from '../generalComponents/Settings';
import { SignalPreviewPlot } from '../signalPreview/subComponents/SignalPreviewPlot';
import { VideoStandardAlertView } from '../generalComponents/VideoStandardAlertView';

import { ScopesCamera } from '../generalComponents/ScopesCamera';

import { CiePlot } from './subComponents/CiePlot';
import { GamutBounds, GamutLabels } from './subComponents/GamutBounds';
import { CieBounds, COS } from './subComponents/CieLabeling';

import { cvtSignalRGBtoXYZ, cvtSignalXYZtoxyY } from '../../calculations/CalcColorSpaceTransform';
import { cvtSignalYCRCBtoRGB, downscaleSignalYCRCB } from '../../calculations/CalcComponentSignal';
import { offsetSignalGamma } from '../../calculations/CalcSignalGenerator';


 export const CieView = ({ signalYCRCB, withOverlays = false, encodedVideoStandard = 1 }) => {

    // camera perspective
    const [camPos, setCamPos] = useState([0.5, 0.4, 1.1]);
    const [zoomOffset, setZoomOffset] = useState(0);

    // appearance
    const [largePreview, setLargePreview] = useState(false);
    const togglePreviewSize = () => setLargePreview(!largePreview);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [lightBackground, setLightBackground] = useState(true);
    const [showSignalDescription, setShowSignalDescription] = useState(false);

    // gamut boundaries
    const [showGamut601, setShowGamut601] = useState(false);
    const [showGamut709, setShowGamut709] = useState(false);
    const [showGamut2020, setShowGamut2020] = useState(false);

    // video standard
    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(encodedVideoStandard);

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);

    // YCrCb -> RGB
    const signalSmallYCRCB = useMemo(() => downscaleSignalYCRCB(signalYCRCB, bitDepths[bitDepthIdx]), [signalYCRCB, bitDepthIdx]);
    const signalRGB = useMemo(() => cvtSignalYCRCBtoRGB(signalSmallYCRCB, videoStandards[vidStdIdx]), [signalSmallYCRCB, vidStdIdx]);

    //const signalRGBlinear = useMemo(() =>  offsetSignalGamma(signalRGB, 0.42), [signalRGB, vidStdIdx]);

    // RGB -> xyY
    const signalXYZ = useMemo(() => cvtSignalRGBtoXYZ(signalRGB, videoStandards[vidStdIdx]), [signalRGB, vidStdIdx]);
    const signalxyY = useMemo(() => cvtSignalXYZtoxyY(signalXYZ), [signalXYZ]);


    return (
      <View style={{flex: 1}}>

          <Canvas style={styles.canvas, {backgroundColor: (lightBackground ? '#eee' : '#333')}}>
            <ScopesCamera position={camPos} target={[0.5, 0.4, 0.4]} initialZoomScale={1.3} zoomOffset={zoomOffset}/>
            <COS />
            <CieBounds />
            <GamutBounds showRec601={showGamut601} showRec709={showGamut709} showRec2020={showGamut2020}/>
            <CiePlot signalxyY={signalxyY} signalRGB={signalRGB} dotSize={0.015}/>
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



          {withOverlays ? <>
              <View style={styles.overlaysContainer}>
                <TouchableOpacity style={{ aspectRatio: 1.78, minWidth: 20,  minHeight:(largePreview ? 110 : 45), width: (largePreview ? "60%" : "20%")}}
                                  onPress={togglePreviewSize}>
                  <SignalPreviewPlot signalRGB={signalRGB}/>
                </TouchableOpacity>
                <Button icon={<Icon name="settings-sharp" size={25}/>} type="clear" onPress={() => setSettingsVisible(!settingsVisible)}/>
                <Button title={"+"} onPress={() => setZoomOffset(zoomOffset + 10)} style={{paddingRight: 5}} titleStyle={{ fontWeight: 'bold'}} type="clear"/>
                <Button title={"-"} onPress={() => setZoomOffset(zoomOffset - 10)} style={{paddingRight: 5}} titleStyle={{ fontWeight: 'bold'}} type="clear"/>
              </View>

              <View style={styles.perspectiveButtonsContainer}>
                <Button title="xy" onPress={()=>{setCamPos([0.5, 0.4, 1.1]); setZoomOffset(0)}}/>
                <Button title="xyY" onPress={()=>{setCamPos([0.5, - 0.2, 1.2]); setZoomOffset(0)}}/>
              </View>
            </> : null }



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
              <View style={styles.settingsElementContainer}>
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

        </View>
    );
}