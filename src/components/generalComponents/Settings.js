import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

import { styles } from './SettingsStyle';

export const SettingsPopOver = (props) => {
    return (
        <View style={styles.shadow}>
            <View style={styles.settingsView}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Einstellungen</Text>
                    <Button
                        icon={<Icon name="ios-close" size={20} color="black" />}
                        onPress={() => props.setSettingsVisible(0)}
                        type="clear"
                    />
                </View>

                <ScrollView style={styles.scrollView}>{props.children}</ScrollView>
            </View>
        </View>
    );
}

export const ToggleElement = ({title, value, setValue }) => {
    return(
        <View style={styles.elementContainer}>
            <Text>{title}</Text>
            <View style={styles.elementButtonContainer}>
                <Button title={value} onPress={setValue} type="clear"/>
            </View>
        </View>
    )
}

export const VideoStandardSelector = ({vidStdIdx, setVidStdIdx, bitDepthIdx, setBitDepthIdx}) => {
    const videoStandards = ["601", "709", "2020"];
    const switchVideoStd = () => {vidStdIdx < videoStandards.length-1 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const switchBitDepth = () => setBitDepthIdx(1 - bitDepthIdx);

    return(
        <View style={styles.elementContainer}>
            <Text>Input-Signal interpretieren als</Text>
            <View style={styles.elementButtonContainer}>
                <Button title={"Rec." + videoStandards[vidStdIdx]}  onPress={switchVideoStd} type="clear"/>
                <Button title={bitDepths[bitDepthIdx] + " bit"}  onPress={switchBitDepth} type="clear"/>
            </View>
        </View>
    )
}
