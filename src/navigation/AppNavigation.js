// icons von https://oblador.github.io/react-native-vector-icons/

import * as React from 'react';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import CIEScreen from '../screens/signalAndScopes/CIEScreen';
import VectorscopeScreen from '../screens/signalAndScopes/VectorscopeScreen';
import WFMScreen from '../screens/signalAndScopes/WFMScreen';
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
              <Drawer.Screen name="Komponentensignal" component={StackWrap_SignalPreviewScreen} />
              <Drawer.Screen name="Scopes Übersicht" component={StackWrap_ScopesCombinationScreen} />

          </Drawer.Navigator>
      </NavigationContainer>
    );
  }


  // TODO: There must be a more elegant way to solve this

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
            headerTitle: "Scopes Übersicht",
          headerLeft: () => <Button icon={<Ionicons name="menu" size={25} color="gray" />} onPress={() => navigation.toggleDrawer()} type="clear"/>
        }}/>
      </Stack.Navigator>
    );
  }
