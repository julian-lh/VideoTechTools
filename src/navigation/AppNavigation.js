import * as React from 'react';
import { Text, View} from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AbbildungScreen from '../screens/0_Abbildung/AbbildungScreen'
import AbtastungScreen from '../screens/1_Abtastung/AbtastungScreen'
import MessungScreen from '../screens/2_Messung/MessungScreen'
import SignalpegelScreen from '../screens/3_Signalpegel/SignalpegelScreen'
import CIEScreen from '../screens/CIE/CIEScreen'
import VectorscopeScreen from '../screens/Vectorscope/VectorscopeScreen'

//<StatusBar style="auto" />
// drawer test

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Navigation() {
    return (
      <NavigationContainer>
          <Drawer.Navigator
                drawerStyle={{
                    width: 200,
                    }}
              screenOptions={({ route }) => ({
              drawerIcon: ({ focused, color, size }) => {
                  let iconName;

                  switch (route.name) {
                  case "Abbildung":
                      iconName = focused
                      ? 'image'
                      : 'image-outline';
                      break;
                  case "Abtastung":
                      iconName = focused
                      ? 'analytics'
                      : 'analytics-outline';
                      break;
                  case "Messung":
                      iconName = focused
                      ? 'pulse'
                      : 'pulse-outline';
                      break;
                  case "Signalpegel":
                      iconName = focused
                      ? 'sunny'
                      : 'sunny-outline';
                      break;
                  case "CIE xy 1931":
                      iconName = focused
                      ? 'color-palette'
                      : 'color-palette-outline';
                      break;
                  case "Vectorscope":
                      iconName = focused
                      ? 'color-palette'
                      : 'color-palette-outline';
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
              <Drawer.Screen name="Abbildung" component={StackWrap_AbbildungScreen} />
              <Drawer.Screen name="Abtastung" component={StackWrap_AbtastungScreen} />
              <Drawer.Screen name="Messung" component={StackWrap_MessungScreen} />
              <Drawer.Screen name="Signalpegel" component={StackWrap_SignalpegelScreen} />
              <Drawer.Screen name="CIE xy 1931" component={StackWrap_CIEScreen} />
              <Drawer.Screen name="Vectorscope" component={StackWrap_VectorscopeScreen} />
          </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  // TODO: Muss eleganter geloest werden
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
            headerTitle: "Vectorscope",
          headerLeft: () => <Button icon={<Ionicons name="menu" size={25} color="gray" />} onPress={() => navigation.toggleDrawer()} type="clear"/>
        }}/>
      </Stack.Navigator>
    );
  }