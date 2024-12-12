import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator, TouchableOpacity  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchCountriesByContinent } from '../services/RestCountriesApi';
import { RootStackParamList } from '../navigation/types';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Country } from '../services/RestCountriesApi';
import CountryListItem from '../components/CountryListItem'; 

  const CountriesScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Countries'>>(); 
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Countries'>>();
  const { continent } = route.params;
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountriesByContinent(continent);
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };
    getCountries();
  }, [continent]);

  const handleCountryPress = (countryName: string) => {
    navigation.navigate('CountryDetails', { countryName });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={countries}
        keyExtractor={(item) => item.name.common}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCountryPress(item.name.common)}>
            <CountryListItem 
            country={item} 
          />
          </TouchableOpacity>
          
        )}
      />
    </View>
  );
};

export default CountriesScreen;