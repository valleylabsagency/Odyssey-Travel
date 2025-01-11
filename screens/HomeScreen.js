import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export default function HomePage({ navigation }) {
  const gifPath = require('../assets/images/vacation.gif'); // Import the local GIF

  return (
    <ImageBackground style={styles.background} source={gifPath}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Odyssey Travel</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Schedule')}
          style={styles.button}
        >
            <Text style={{color: "white", fontWeight: "bold"}}>Schedule Appointment</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: '80%', // Set a width (percentage or fixed)
    padding: 20, // Add padding inside the rectangle
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    borderRadius: 10, // Rounded corners
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00BFFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10
  }
});
