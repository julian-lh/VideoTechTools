import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AbbildungScreen from '../screens/0_Abbildung/AbbildungScreen'
import AbtastungScreen from '../screens/1_Abtastung/AbtastungScreen'
import MessungScreen from '../screens/2_Messung/MessungScreen'
import SignalpegelScreen from '../screens/3_Signalpegel/SignalpegelScreen'
import FarbsystemeScreen from '../screens/4_Farbsysteme/FarbsystemeScreen'

//<StatusBar style="auto" />

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
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
                case "Farbsysteme":
                    iconName = focused
                    ? 'color-palette'
                    : 'color-palette-outline';
                    break;
                default:
                break;
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            })}>
            <Tab.Screen name="Abbildung" component={AbbildungScreen} />
            <Tab.Screen name="Abtastung" component={AbtastungScreen} />
            <Tab.Screen name="Messung" component={MessungScreen} />
            <Tab.Screen name="Signalpegel" component={SignalpegelScreen} />
            <Tab.Screen name="Farbsysteme" component={FarbsystemeScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}