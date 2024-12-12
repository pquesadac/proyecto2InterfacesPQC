import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchContinents } from '../services/RestCountriesApi';
import { RootStackParamList } from '../navigation/types'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ContinentsScreen = () => {
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
    <View style={{ flex: 1, padding: 17 }}>
      <FlatList
        data={continents}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Text style={{ 
              fontSize: 18, 
              paddingVertical: 20,
              paddingLeft: 10, 
              backgroundColor: '#FF9C00', 
              color: 'white', 
              marginBottom: 8, 
              borderRadius: 5, 
              borderColor: '000000',
              borderWidth: 1
              }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ContinentsScreen;
