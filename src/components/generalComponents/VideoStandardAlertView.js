import React from 'react';
import { Text } from 'react-native';

export const VideoStandardAlertView = ({signalVidStdIdx, scopeVidStdIdx, signalBitDepthIdx = 0, scopeBitDepthIdx = 0}) => {
    return(
        <>
            {
            ((signalVidStdIdx !== scopeVidStdIdx) || (signalBitDepthIdx !== scopeBitDepthIdx)) ?
                <Text style={{ textAlign: 'center', fontSize: 12 }}>⚠️ Async. Videostandard</Text>
                : null
            }
        </>
    )
}