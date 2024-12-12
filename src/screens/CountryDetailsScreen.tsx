import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, Linking, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { fetchCountryDetails } from '../services/RestCountriesApi';
import { RootStackParamList } from '../navigation/types';
import { RouteProp } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUD = 10;
const LONGITUD = LATITUD * ASPECT_RATIO;

const CountryDetailsScreen = () => {
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

  const openInOSM = () => {
    if (country && country.latlng) {
      const [lat, lng] = country.latlng;
      const osmUrl = `https://www.openstreetmap.org/#map=6/${lat}/${lng}`;
      Linking.openURL(osmUrl);
    }
  };

  const renderDetailItem = (label: string, value: string | string[] | undefined) => {
    const formattedValue = Array.isArray(value) ? value.join(', ') : value;
    return (
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>{label}:</Text>
        <Text style={styles.detailValue}>{formattedValue || 'No disponible'}</Text>
      </View>
    );
  };

  if (!country) return <Text>Cargando...</Text>;

  const [latitude, longitude] = country.latlng || [0, 0];

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: country.flags.png }} 
        style={styles.flagImage} 
        resizeMode="contain" 
      />
      
      <Text style={styles.countryName}>{country.name.common}</Text>
      
      {renderDetailItem('Nombre Oficial', country.name.official)}
      {renderDetailItem('Capital', country.capital)}
      {renderDetailItem('Región', country.region)}
      {renderDetailItem('Sub-región', country.subregion)}
      {renderDetailItem('Población', country.population?.toLocaleString())}
      {renderDetailItem('Idiomas', country.languages ? Object.values(country.languages) : undefined)}
      
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUD,
            longitudeDelta: LONGITUD,
          }}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={country.name.common}
            description={country.capital?.[0] || 'Capital'}
          />
        </MapView>
      </View>
      
      <TouchableOpacity 
        style={styles.mapButton} 
        onPress={openInOSM}
      >
        <Text style={styles.mapButtonText}>Abrir en OpenStreetMap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flagImage: {
    width: '100%', 
    height: 200, 
    marginBottom: 20
  },
  countryName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    width: 120
  },
  detailValue: {
    flex: 1
  },
  mapContainer: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center'
  },
  mapButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default CountryDetailsScreen;