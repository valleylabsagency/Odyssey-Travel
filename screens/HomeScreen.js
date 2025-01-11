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

export default function HomePage({ navigation }) {
  const [showLogin, setShowLogin] = useState(false); // State to toggle login form
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [name, setName] = useState(''); // State for user name
  const fadeAnim = useRef(new Animated.Value(1)).current; // Animation reference
  const slideAnim = useRef(new Animated.Value(0)).current; // Slide animation reference

  const images = [
    require('../assets/images/sydney.jpg'),
    require('../assets/images/castle.jpg'),
    require('../assets/images/eiffel.jpg'),
    require('../assets/images/europe.jpg'),
  ];

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  // Handle login button click
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

  // Handle login submission
  const handleLoginSubmit = () => {
    if (name.trim()) {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
          setIsLoggedIn(true);
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }).start();
          });
    }
  };

  const handleLogout = () => {
    Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
       setIsLoggedIn(false);
       setName("");
       setShowLogin(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
  }

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
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -Dimensions.get('window').height / 2],
                }),
              },
            ],
          },
        ]}
      >
        {isLoggedIn ? (
          <>
            <Text style={styles.title}>Welcome Back, {name}!</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Schedule')}
            >
              <Text style={styles.buttonText}>Schedule Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLogout()}
            >
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
