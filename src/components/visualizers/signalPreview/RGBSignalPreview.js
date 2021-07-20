// Expects an rgb-Signal-Array
import React from 'react';
import { View } from 'react-native';

import { StyleSheet} from 'react-native';


export const RGBSignalPreview = (props) => {
    //Anlehnung: https://www.digitalocean.com/community/conceptual_articles/understanding-how-to-render-arrays-in-react
    return(
      <View style={styles.outerContainer}>
        {props.rgbSignal.map( (x, idx1) => {
          return(
            <View
              style={styles.rowContainer}
              key={idx1}>{
                  x.map( (y, idx2) => {
                    return(
                      <View
                        style={styles.columnElement}
                        backgroundColor={"rgb("+y[0]*255+","+y[1]*255+","+y[2]*255+")"}
                        key={(2000) + idx2}/>
                      )})}
            </View>)})
        }
      </View>
    )
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
      flex: 1
    }

});

