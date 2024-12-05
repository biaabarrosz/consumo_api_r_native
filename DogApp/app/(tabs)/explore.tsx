import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

const DogScreen = () => {
  const [dogImage, setDogImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDogImage = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.thedogapi.com/v1/images/search', {
        headers: {
          'x-api-key': 'live_pXgHLy6Avyntq9IqC0UBANUJHBXy8CmzLrH3flzcRMr3rvlC0sgbs6rQ09mn8LoX',
        },
      });
      setDogImage(response.data[0].url);
    } catch (error) {
      console.error('Erro ao buscar a imagem do cachorro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Veja uma foto de um cachorro!</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        dogImage && <Image source={{ uri: dogImage }} style={styles.image} />
      )}
      <Button title="Mostrar Cachorro" onPress={fetchDogImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
  },
});

export default DogScreen;
