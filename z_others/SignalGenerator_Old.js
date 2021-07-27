



const ColorSelector = (props) => {
    return (
        <View style={styles.inputElement}>
            <Text style={styles.inputElementLabel}>{props.label}</Text>
            <Text style={styles.inputElementLabel}> {props.value} </Text>
            <Slider style={styles.inputElementSlider}
            value={props.value}
            onValueChange={(x) => props.valueChange(x)}
            minimumTrackTintColor={props.trackColor}
            thumbTintColor={props.thumbTintColor}
            thumbStyle={styles.inputElementSliderThumb}
            />
        </View>
    );
}


const ColorSelector2 = (props) => {
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


const RGBPicker = (props) => {
    return(
        <View style={styles.colorPicker}>
            <ColorSelector label={"R"} thumbTintColor={"red"} value={props.RGB[0]} valueChange={(x) => props.newValue([x, props.RGB[1], props.RGB[2]])}/>
            <ColorSelector label={"G"} thumbTintColor={"green"}  value={props.RGB[1]} valueChange={(x) => props.newValue([props.RGB[0], x, props.RGB[2]])}/>
            <ColorSelector label={"B"} thumbTintColor={"blue"} value={props.RGB[2]} valueChange={(x) => props.newValue([props.RGB[0], props.RGB[1], x])}/>
        </View>
    );
}
const HSVPicker = (props) => {
    return(
        <View style={styles.colorPicker}>
            <ColorSelector label={"H"} thumbTintColor={"gray"} value={props.RGB[0]} valueChange={(x) => props.newValue([x, props.RGB[1], props.RGB[2]])}/>
            <ColorSelector label={"S"} thumbTintColor={"gray"}  value={props.RGB[1]} valueChange={(x) => props.newValue([props.RGB[0], x, props.RGB[2]])}/>
            <ColorSelector label={"V"} thumbTintColor={"gray"} value={props.RGB[2]} valueChange={(x) => props.newValue([props.RGB[0], props.RGB[1], x])}/>
        </View>
    );
}


const SignalPreview = (props) => {
    const red = (props.RGB[0] * 255).toFixed(0);
    const color = "backgroundColor: rgb("+red+",0,0), flex: 1";
    return (
        <View style={color}>
        </View>
      );
}



const SignalPicker = (props) => {

    const [red, setRed] = useState(0.5);
    const [green, setGreen] = useState(0.5);
    const [blue, setBlue] = useState(0.5);

    const [RGB, setRGB] = useState([0.5, 0.5, 0.5]);

    const [sourceID, setSourceID] = useState(2);

    var signal = generateBarsRGBSignal(8, 1);
    var signal2 = [[0.0, 0.0, 0.0], [0.0, 1.0, 1.0], [0.0, 1.0, 0.0], [1.0, 1.0, 1.0]];

    var Picker = RGBPicker;
    /*switch(sourceID){
        case 0:
            Picker = RGBPicker;
            break;
        case 1:
            Picker = HSVPicker;
            break;
        case 2:
            Picker = SignalPicker;
            break;
    }*/
    //props.newSignal(signal);

    return(
        <View style={styles.colorPicker}>
            <View style={{flexDirection: "row", horizontalFlex: 1, height: 60}}>
                <Button style={{flex: 1, padding: 6}} title='RGB Color' onPress={() => props.newSignal(signal)}/>
                <Button style={{flex: 1, padding: 6}} title='Bars' onPress={() => props.newSignal(signal)}/>
                <Button style={{flex: 1, padding: 6}} title='Test' onPress={() => props.newSignal(signal2)}/>
            </View>
            <SignalPreview RGB={RGB}/>
            <Picker RGB={RGB} newValue={(x) => props.newSignal([x])}/>
            <Text></Text>
        </View>
    );
}
//            <Picker RGB={RGB} newValue={(x) => setRGB(x)}/>

  /*
  {generatorIdx > 0 ? <View style={{ width: "100%", flexDirection: "row", justifyContent: 'space-evenly', alignItems: "center"}}>
  <View style={{ flex: 1, flexDirection: "column", justifyContent: 'space-around', alignItems: "center", padding: 10}}>
      <TapButton label={"H"} currentValue={hue} setValue={setHue} stepSize={30}/>
      <TapButton label={"S"} currentValue={saturation} setValue={setSaturation} stepSize={0.1}/>
      <TapButton label={"V"} currentValue={value} setValue={setValue} stepSize={0.1}/>
  </View>
  <View style={{ flex: 1,  flexDirection: "column", justifyContent: 'space-around', alignItems: "center", padding: 10 }}>
      <TapButton label={"R"} currentValue={red} setValue={setRed} stepSize={0.1} color={"#fdd"}/>
      <TapButton label={"G"} currentValue={green} setValue={setGreen} stepSize={0.1} color={"#dfd"}/>
      <TapButton label={"B"} currentValue={blue} setValue={setBlue} stepSize={0.1} color={"#ddf"}/>
  </View>
</View> : <View/>}*/
  //  <SignalPicker signal={RGB} newSignal={(x) => setRGB(x)} style={{flex: 1}}/>


/*<View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#ccc', paddingVertical: 5}}>
<Button title='RGB/HSV'/>
<Button title='FARBRAUM'/>
</View>
*/

