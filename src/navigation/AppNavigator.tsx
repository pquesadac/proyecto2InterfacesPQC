import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import ContinentsScreen from '../screens/ContinentsScreen';
import CountriesScreen from '../screens/CountriesScreen';
import CountryDetailsScreen from '../screens/CountryDetailsScreen';

const Stack = createNativeStackNavigator(); 

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Continents">
        <Stack.Screen name="Continents" component={ContinentsScreen} />
        <Stack.Screen name="Countries" component={CountriesScreen} />
        <Stack.Screen name="CountryDetails" component={CountryDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
