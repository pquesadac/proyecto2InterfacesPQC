import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Country } from '../services/RestCountriesApi';

interface CountryListItemProps {
  country: Country;
}

const CountryListItem: React.FC<CountryListItemProps> = ({ country }) => {
  const getLanguages = () => {
    if (!country.languages) return 'No information';
    return Object.values(country.languages).join(', ');
  };

  const getCapital = () => {
    if (!country.capital || country.capital.length === 0) return 'No capital';
    return country.capital[0];
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: country.flags.png }} 
        style={styles.flag}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.countryName}>{country.name.common}</Text>
        <Text>Capital: {getCapital()}</Text>
        <Text>Idiomas: {getLanguages()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  flag: {
    width: 80,
    height: 50,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CountryListItem;