// icons von https://oblador.github.io/react-native-vector-icons/

import * as React from 'react';
import { Text, View} from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

//import AbbildungScreen from '../screens/z_others/Abbildung/AbbildungScreen'
//import AbtastungScreen from '../screens/z_others/Abtastung/AbtastungScreen'
//import MessungScreen from '../screens/z_others/Messung/MessungScreen'
//import SignalpegelScreen from '../screens/z_others/Signalpegel/SignalpegelScreen'

import CIEScreen from '../screens/signalAndScopes/CIEScreen';
import VectorscopeScreen from '../screens/signalAndScopes/VectorscopeScreen';
import WFMScreen from '../screens/signalAndScopes/WFMScreen';
import ScopesCombinationScreen from '../screens/signalAndScopes/ScopesCombinationScreen';
import SignalDisplayYCrCbScreen from '../screens/signalAndScopes/SignalDisplayYCrCbScreen';

//<StatusBar style="auto" />
// drawer test

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Navigation() {
    return (
      <NavigationContainer>
          <Drawer.Navigator
                drawerStyle={{
                    maxWidth: 240,
                    paddingTop: "40%"
                    }}
              screenOptions={({ route }) => ({
              drawerIcon: ({ focused, color, size }) => {
                  let iconName;

                  switch (route.name) {

                    case "CIE xy 1931":
                        iconName = focused
                        ? 'color-palette'
                        : 'color-palette-outline';
                        break;
                    case "Vektorskop":
                        iconName = focused
                        ? 'md-locate'
                        : 'md-locate-outline';
                        break;
                    case "WFM":
                        iconName = focused
                        ? 'md-bar-chart'
                        : 'md-bar-chart-outline';
                        break;
                    case "Komponentensignal":
                        iconName = focused
                        ? 'tv'
                        : 'tv-outline';
                        break;
                    case "Scopes Übersicht":
                        iconName = focused
                        ? 'ios-grid'
                        : 'ios-grid-outline';
                        break;

                    default:
                      iconName = focused
                        ? 'color-palette'
                        : 'color-palette-outline';
                    break;
                  }

                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
              },
              })}>

              <Drawer.Screen name="WFM" component={StackWrap_WFMScreen} />
              <Drawer.Screen name="Vektorskop" component={StackWrap_VectorscopeScreen} />
              <Drawer.Screen name="CIE-Normfarbtafel" component={StackWrap_CIEScreen} />
              <Drawer.Screen name="Komponentensignal" component={StackWrap_SignalDisplayYCrCbScreen} />
              <Drawer.Screen name="Scopes Übersicht" component={StackWrap_ScopesCombinationScreen} />

          </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  // TODO: Muss eleganter geloest werden


  function StackWrap_CIEScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name= {"CIEScreen"} component={CIEScreen} options={{
            headerTitle: "CIE-Normfarbtafel",
          headerLeft: () => <Button icon={<Ionicons name="menu" size={25} color="gray" />} onPress={() => navigation.toggleDrawer()} type="clear"/>
        }}/>
      </Stack.Navigator>
    );
  }

  function StackWrap_VectorscopeScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name= {"VectorscopeScreen"} component={VectorscopeScreen} options={{
            headerTitle: "Vektorskop",
          headerLeft: () => <Button icon={<Ionicons name="menu" size={25} color="gray" />} onPress={() => navigation.toggleDrawer()} type="clear"/>
        }}/>
      </Stack.Navigator>
    );
  }

  function StackWrap_WFMScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name= {"WFMScreen"} component={WFMScreen} options={{
            headerTitle: "WFM",
          headerLeft: () => <Button icon={<Ionicons name="menu" size={25} color="gray" />} onPress={() => navigation.toggleDrawer()} type="clear"/>
        }}/>
      </Stack.Navigator>
    );
  }

  function StackWrap_SignalDisplayYCrCbScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name= {"ComponentSignalScreen"} component={SignalDisplayYCrCbScreen} options={{
            headerTitle: "Komponentensignal",
          headerLeft: () => <Button icon={<Ionicons name="menu" size={25} color="gray" />} onPress={() => navigation.toggleDrawer()} type="clear"/>
        }}/>
      </Stack.Navigator>
    );
  }

  function StackWrap_ScopesCombinationScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name= {"ScopesOverviewScreen"} component={ScopesCombinationScreen} options={{
            headerTitle: "Scopes Übersicht",
          headerLeft: () => <Button icon={<Ionicons name="menu" size={25} color="gray" />} onPress={() => navigation.toggleDrawer()} type="clear"/>
        }}/>
      </Stack.Navigator>
    );
  }


  /*
  // ------------------ Sonstige ------------------


                    // case "Abbildung":
                    //     iconName = focused
                    //     ? 'image'
                    //     : 'image-outline';
                    //     break;
                    // case "Abtastung":
                    //     iconName = focused
                    //     ? 'analytics'
                    //     : 'analytics-outline';
                    //     break;
                    // case "Messung":
                    //     iconName = focused
                    //     ? 'pulse'
                    //     : 'pulse-outline';
                    //     break;
                    // case "Signalpegel":
                    //     iconName = focused
                    //     ? 'sunny'
                    //     : 'sunny-outline';
                    //     break;


  //<Drawer.Screen name="Abbildung" component={StackWrap_AbbildungScreen} />
  //<Drawer.Screen name="Abtastung" component={StackWrap_AbtastungScreen} />
  //<Drawer.Screen name="Messung" component={StackWrap_MessungScreen} />
  //<Drawer.Screen name="Signalpegel" component={StackWrap_SignalpegelScreen} />
  function StackWrap_AbbildungScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name= {"AbbildungScreen"} component={AbbildungScreen} options={{
            headerTitle: "Abbildung",
          headerLeft: () => <Button icon={<Ionicons name="menu" size={25} color="gray" />} onPress={() => navigation.toggleDrawer()} type="clear"/>
        }}/>
      </Stack.Navigator>
    );
  }

  function StackWrap_AbtastungScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name= {"AbtastungScreen"} component={AbtastungScreen} options={{
            headerTitle: "Abtastung",
          headerLeft: () => <Button icon={<Ionicons name="menu" size={25} color="gray" />} onPress={() => navigation.toggleDrawer()} type="clear"/>
        }}/>
      </Stack.Navigator>
    );
  }

  function StackWrap_MessungScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name= {"MessungScreen"} component={MessungScreen} options={{
            headerTitle: "Messung",
          headerLeft: () => <Button icon={<Ionicons name="menu" size={25} color="gray" />} onPress={() => navigation.toggleDrawer()} type="clear"/>
        }}/>
      </Stack.Navigator>
    );
  }

  function StackWrap_SignalpegelScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name= {"SignalpegelScreen"} component={SignalpegelScreen} options={{
            headerTitle: "Signalpegel",
          headerLeft: () => <Button icon={<Ionicons name="menu" size={25} color="gray" />} onPress={() => navigation.toggleDrawer()} type="clear"/>
        }}/>
      </Stack.Navigator>
    );
  }
*/