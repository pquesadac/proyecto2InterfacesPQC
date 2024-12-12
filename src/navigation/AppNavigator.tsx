import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import ContinentsScreen from '../screens/PantallaContinentes';
import PantallaPaises from '../screens/pantallaPaises';
import PantallaDetallesPaises from '../screens/PantallaDetallesPaises';

const Stack = createNativeStackNavigator(); 

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Continents">
        <Stack.Screen name="Continents" component={ContinentsScreen} />
        <Stack.Screen name="Countries" component={PantallaPaises} />
        <Stack.Screen name="CountryDetails" component={PantallaDetallesPaises} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
