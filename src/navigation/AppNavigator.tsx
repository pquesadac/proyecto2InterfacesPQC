import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import ContinentsScreen from '../screens/ContinentsScreen';
import CountriesScreen from '../screens/CountriesScreen';
import CountryDetailsScreen from '../screens/CountryDetailsScreen';
import { RootStackParamList } from './types'; 

const Stack = createNativeStackNavigator<RootStackParamList>(); 

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Continents"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4f4f4',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: 'Atrás',
        }}
      >
        <Stack.Screen 
          name="Continents" 
          component={ContinentsScreen} 
          options={{ title: 'Continents' }}
        />
        <Stack.Screen 
          name="Countries" 
          component={CountriesScreen} 
          options={({ route }) => ({ 
            title: `Countries from ${route.params.continent}` 
          })}
        />
        <Stack.Screen 
          name="CountryDetails" 
          component={CountryDetailsScreen} 
          options={({ route }) => ({ 
            title: route.params.countryName 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;