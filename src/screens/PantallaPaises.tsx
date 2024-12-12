import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchCountriesByContinent } from '../services/RestCountriesApi';
import { RootStackParamList } from '../navigation/types';
import { RouteProp } from '@react-navigation/native';


interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
  };
}

const PantallaPaises = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Countries'>>(); 
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
        console.error('Error fetching countries:', error);
        setLoading(false);
      }
    };
    getCountries();
  }, [continent]);

  // Agregamos un componente básico de país en línea
  const CountryItem = ({ country }: { country: Country }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>{country.name.common}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Países en {continent}</Text>
      <FlatList
        data={countries}
        keyExtractor={(item) => item.name.common}
        renderItem={({ item }) => <CountryItem country={item} />}
      />
    </View>
  );
};

export default PantallaPaises;