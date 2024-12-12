import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchContinents } from '../services/RestCountriesApi';
import { RootStackParamList } from '../navigation/types'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const PantallaContinentes = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Continents'>>(); 
  const [continents, setContinents] = useState<string[]>([]);

  useEffect(() => {
    const getContinents = async () => {
      const data = await fetchContinents();
      setContinents(data); 
    };
    getContinents();
  }, []);

  const handlePress = (continent: string) => {
    navigation.navigate('Countries', { continent });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Continentes</Text>
      <FlatList
        data={continents}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Text style={{ fontSize: 18, paddingVertical: 10 }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PantallaContinentes;
