// Expects an rgb-Signal-Array
import React from 'react';
import { View } from 'react-native';


export const RGBSignalPreview = (props) => {
    //Anlehnung: https://www.digitalocean.com/community/conceptual_articles/understanding-how-to-render-arrays-in-react
    return(
      <View style={{flex: 1}}>
        {props.rgbSignal.map( (x, idx1) => {
          return(<View style={{flex: 1, flexDirection: "row"}} key={idx1}>{
            x.map( (y, idx2) => <View style={{flex: 1}} backgroundColor={"rgb("+y[0]*255+","+y[1]*255+","+y[2]*255+")"} key={(2000) + idx2}/>)
        }</View>)})
          }
      </View>
    )
  }