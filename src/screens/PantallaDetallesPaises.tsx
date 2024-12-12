import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchCountryDetails } from '../services/RestCountriesApi';
import { RootStackParamList } from '../navigation/types'; 
import { RouteProp } from '@react-navigation/native'; 

const PantallaDetallesPaises = () => {
  
  const route = useRoute<RouteProp<RootStackParamList, 'CountryDetails'>>(); 
  const { countryName } = route.params; 
  const [country, setCountry] = useState<any>(null);

  useEffect(() => {
    const getCountryDetails = async () => {
      const data = await fetchCountryDetails(countryName);
      setCountry(data);
    };
    getCountryDetails();
  }, [countryName]);

  if (!country) return <Text>Cargando...</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>{country.name}</Text>
      <Image source={{ uri: country.flags[0] }} style={{ width: 100, height: 60 }} />
      <Text>Capital: {country.capital}</Text>
      <Text>Lenguas: {country.languages?.map((lang: any) => lang.name).join(', ')}</Text>
    </View>
  );
};

export default PantallaDetallesPaises;
