// icons von https://oblador.github.io/react-native-vector-icons/

import * as React from 'react';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import CieScreen from '../screens/signalAndScopes/CieScreen';
import VectorscopeScreen from '../screens/signalAndScopes/VectorscopeScreen';
import WfmScreen from '../screens/signalAndScopes/WfmScreen';
import ScopesCombinationScreen from '../screens/signalAndScopes/ScopesCombinationScreen';
import SignalPreviewScreen from '../screens/signalAndScopes/SignalPreviewScreen';


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
                    case "Scopes ??bersicht":
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

                  return <Ionicons name={iconName} size={size} color={color} />;
              },
              })}>

              <Drawer.Screen name="WFM" component={StackWrap_WfmScreen} />
              <Drawer.Screen name="Vektorskop" component={StackWrap_VectorscopeScreen} />
              <Drawer.Screen name="CIE-Normfarbtafel" component={StackWrap_CieScreen} />
              <Drawer.Screen name="Komponentensignal" component={StackWrap_SignalPreviewScreen} />
              <Drawer.Screen name="Scopes ??bersicht" component={StackWrap_ScopesCombinationScreen} />

          </Drawer.Navigator>
      </NavigationContainer>
    );
  }


  // TODO: There must be a more elegant way to solve this

  function StackWrap_CieScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name= {"CieScreen"} component={CieScreen} options={{
            headerTitle: "Cie-Normfarbtafel",
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

  function StackWrap_WfmScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name= {"WfmScreen"} component={WfmScreen} options={{
            headerTitle: "WFM",
          headerLeft: () => <Button icon={<Ionicons name="menu" size={25} color="gray" />} onPress={() => navigation.toggleDrawer()} type="clear"/>
        }}/>
      </Stack.Navigator>
    );
  }

  function StackWrap_SignalPreviewScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name= {"ComponentSignalScreen"} component={SignalPreviewScreen} options={{
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
            headerTitle: "Scopes ??bersicht",
          headerLeft: () => <Button icon={<Ionicons name="menu" size={25} color="gray" />} onPress={() => navigation.toggleDrawer()} type="clear"/>
        }}/>
      </Stack.Navigator>
    );
  }
