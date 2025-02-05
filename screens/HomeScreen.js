import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useAuth } from '../context/AuthContext';


export default function HomePage({ navigation }) {
  const { user, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [name, setName] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const images = [
    require('../assets/images/sydney.jpg'),
    require('../assets/images/castle.jpg'),
    require('../assets/images/eiffel.jpg'),
    require('../assets/images/europe.jpg'),
  ];

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const handleLoginButton = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowLogin(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleLoginSubmit = () => {
    if (name.trim()) {
      login({ name });
      setShowLogin(false);
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
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}> 
        {user ? (
          <>
            <Text style={styles.title}>Welcome Back, {user.name}!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Itinerary')}>
              <Text style={styles.buttonText}>Go to Itinerary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={logout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : showLogin ? (
          <View style={styles.loginForm}>
            <Text style={styles.title}>Login</Text>
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
        ) : (
          <>
            <Text style={styles.title}>Odyssey Travel</Text>
            <TouchableOpacity style={styles.button} onPress={handleLoginButton}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
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
  loginForm: {
    alignItems: 'center',
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