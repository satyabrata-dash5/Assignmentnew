import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import DrawerStack from './src/components/DrawerStack';


const App = () => {
  return (
    <NavigationContainer>
     <DrawerStack/>
    </NavigationContainer>
  )
}

export default App
