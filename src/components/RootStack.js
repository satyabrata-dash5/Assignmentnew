import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
//import DrawerStack from './DrawerStack';


const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator initialRouteName="home" headerMode='none'>
       
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      </Stack.Navigator>
    )
}

export default RootStack
 // <Stack.Screen name="DrawerMenu" component={DrawerStack} />