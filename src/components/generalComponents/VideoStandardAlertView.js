import React from 'react';
import { Text } from 'react-native';

export const VideoStandardAlertView = ({signalVidStdIdx, scopeVidStdIdx}) => {
    return(
        <>
            {
            signalVidStdIdx !== scopeVidStdIdx ?
                <Text style={{ textAlign: 'center', fontSize: 12 }}>⚠️ Async. Videostandard</Text>
                : null
            }
        </>
    )
}