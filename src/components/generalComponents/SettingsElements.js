import { styles } from 'SettingsStyle';

export const ToggleElement = ({title, value, setValue }) => {
    return(
        <View style={styles.elementContainer}>
            <Text>{title}</Text>
            <View style={styles.elemenButtonContainer}>
                <Button title={value}  onPress={setValue} type="clear"/>
            </View>
        </View>
    )
}

export const VideoStandardSelector = ({standard, setStandard, bitDepth, setBitDepth}) => {
    return(
        <View style={styles.elementContainer}>
            <Text>Input-Signal interpretieren als</Text>
            <View style={styles.elemenButtonContainer}>
                <Button title={standard}  onPress={setStandard} type="clear"/>
                <Button title={bitDepth}  onPress={setBitDepth} type="clear"/>
            </View>
        </View>
    )
}