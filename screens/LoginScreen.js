import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { user, login } = useAuth();
  const [name, setName] = useState('');

  const images = [
    require('../assets/images/sydney.jpg'),
    require('../assets/images/castle.jpg'),
    require('../assets/images/eiffel.jpg'),
    require('../assets/images/europe.jpg'),
  ];

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const handleLoginSubmit = async () => {
    if (name.trim()) {
      await AsyncStorage.setItem('user', JSON.stringify({ name }));
      login({ name }, navigation);
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        autoPlay
        autoPlayInterval={3000}
        data={images}
        width={width}
        height={height}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} />
        )}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Odyssey Travel</Text>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#ddd"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: '40%',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00BFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: 200,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
});
