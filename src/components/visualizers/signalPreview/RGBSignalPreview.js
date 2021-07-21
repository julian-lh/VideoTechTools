// Expects an rgb-Signal-Array
import React from 'react';
import { View, Text } from 'react-native';

import { StyleSheet} from 'react-native';

import { clamp } from '../../../calculation/Helpers'


export const RGBSignalPreview = ({ rgbSignal, YCrCbSignal = undefined, labelIndex = 0}) => {
    //Anlehnung: https://www.digitalocean.com/community/conceptual_articles/understanding-how-to-render-arrays-in-react

    var labelSignal = [];
    var desctiption = [];
    switch (labelIndex){
      case 1:
        labelSignal = rgbSignal; //.map( x => x.map( y => y * 100 ) );
        desctiption = ["R", "G", "B"];
        break;
      case 2:
        labelSignal = YCrCbSignal;
        desctiption = ["Y", "Cr", "Cb"];
        break;
      default:
        labelSignal = [];
        break;
    }

    return(
      <View style={styles.outerContainer}>
        {rgbSignal.map( (x, idx1) => {
          return(
            <View
              style={styles.rowContainer}
              key={idx1}>{
                  x.map( (y, idx2) => {
                    return(
                      <View
                        style={styles.columnElement}
                        backgroundColor={rgbToString(y)}
                        key={(2000) + idx2}>
                         {labelIndex > 0 ?
                            <Text style={styles.label, {color: rgbToComplColorString(y)}}>{
                              labelSignal[idx1][idx2].map( (v, i) => (" " + desctiption[i] + ":" + v.toFixed(1))) }
                            </Text> : <View/>}
                        </View>
                      )})}
            </View>)})
        }
      </View>
    )
  }

function rgbToString(rgbArray){
  const rgb = new Uint8Array(3);

  const r = clamp(rgbArray[0]) * 255;
  const g = clamp(rgbArray[1]) * 255;
  const b = clamp(rgbArray[2]) * 255;
  rgb[0] = r;
  rgb[1] = g;
  rgb[2] = b;

  //console.log(rgb.toString())
  //console.log("rgb("+r+","+g+","+b+")");
  return ("rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")")
}

function rgbToComplColorString(rgbArray){
  const rgb = new Uint8Array(3);

  const r = clamp(rgbArray[0]) * 255;
  const g = clamp(rgbArray[1]) * 255;
  const b = clamp(rgbArray[2]) * 255;
  rgb[0] = 255 - r;
  rgb[1] = 255 - g;
  rgb[2] = 255 - b;

  return ("rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")")
}


const styles = StyleSheet.create({

    outerContainer: {
      flex: 1
    },
    rowContainer: {
      flex: 1,
      flexDirection: "row"
    },
    columnElement: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    label: {
      fontSize: 10,
    }

});

