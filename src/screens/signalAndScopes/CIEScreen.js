import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

import { CIEView } from "../../components/visualizers/cie/CIEView";
import { YCrCbGenerator } from "../../components/generators/YCrCbSignalGenerator/YCrCbSignalGenerator";

export default function CIEScreen() {
  const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);

  return (
    <View style={{ flex: 1 }}>
      <CIEView signalYCRCB={signalYCRCB} withOverlays={true} />
      <YCrCbGenerator setSignal={(x) => setSignalYCRCB(x)} />
    </View>
  );
}

/*
const ColorSelector = (props) => {
    return (
        <View style={styles.inputElement}>
            <Text style={styles.inputElementLabel}>{props.label}</Text>
            <Button style={styles.inputElementButtons} title='<' onPress={() => props.valueChange(props.value - 0.1)}/>
            <Slider style={styles.inputElementSlider}
            value={props.value}
            onValueChange={(x) => props.valueChange(x)}
            minimumTrackTintColor={props.trackColor}
            thumbTintColor={props.thumbTintColor}
            thumbStyle={styles.inputElementSliderThumb}
            />
            <Button style={styles.inputElementButtons} title='>' onPress={() => props.valueChange(props.value + 0.1)}/>
        </View>
    );
}
*/
