import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ItineraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itinerary</Text>
      <Text style={styles.subtitle}>Your planned trips will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
});