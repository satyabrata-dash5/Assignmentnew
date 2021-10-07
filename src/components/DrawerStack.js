import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SideDrawerContent } from '../screens/SideDrawerContent';

import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from '../screens/MainTabScreen';
const Drawer = createDrawerNavigator();


const DrawerStack = () => {
    return (
               
        <Drawer.Navigator drawerContent={props => <SideDrawerContent {...props} />}>
                    <Drawer.Screen name="HomeScreen" component={MainTabScreen} />
                </Drawer.Navigator>
                 
    )
}

export default DrawerStack
