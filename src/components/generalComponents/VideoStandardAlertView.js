import React, {useRef, useState, useEffect, useMemo} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const VideoStandardAlertView = ({signalStd, scopeStd}) => {
    return(
        <>{ signalStd !== scopeStd ?
            <Text style={{ textAlign: 'center', fontSize: 12 }}>⚠️ Async. Videostandard</Text>
            : null
        }
        </>
    )
}