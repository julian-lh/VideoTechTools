import * as React from 'react';
import Navigation from './src/navigation/AppNavigation';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';

const theme = {
  Button: {
    type: "outline",
    titleStyle: {
      color: "black"
    },
    containerStyle: {
      color: "black"
    },
  },
  colors:{
    primary: "black"
  }
};


export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}