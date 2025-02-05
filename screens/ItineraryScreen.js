import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const suggestionsList = [
  'Swimming with Dolphins in San Juan',
  'Scuba Diving in Puerto Rico',
  'ATV Tour in the Rainforest'
];

const ItineraryScreen = () => {
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestionIndex((prevIndex) => (prevIndex + 1) % suggestionsList.length);
    }, 8000); // Slower auto-change interval
    return () => clearInterval(interval);
  }, []);

  const nextSuggestion = () => {
    setCurrentSuggestionIndex((prevIndex) => (prevIndex + 1) % suggestionsList.length);
  };

  const prevSuggestion = () => {
    setCurrentSuggestionIndex((prevIndex) => (prevIndex - 1 + suggestionsList.length) % suggestionsList.length);
  };

  return (
    <View style={styles.container}>
      {/* Flights Section */}
      <Text style={styles.sectionTitle}>Flights</Text>
      <TouchableOpacity style={styles.section}>
        <Text style={styles.leftText}>Flight to Atlanta</Text>
        <Text style={styles.rightText}>in 5 days</Text>
      </TouchableOpacity>
      
      {/* Excursions Section */}
      <Text style={styles.sectionTitle}>Excursions</Text>
      <TouchableOpacity style={styles.section}>
        <Text style={styles.leftText}>Zip lining in San Juan</Text>
        <Text style={styles.rightText}>In 3 hours</Text>
      </TouchableOpacity>
      
      {/* Suggestions Section */}
      <Text style={styles.sectionTitle}>Suggestions</Text>
      <TouchableOpacity style={styles.suggestionSection}>
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={prevSuggestion}>
            <Text style={styles.arrow}>{'←'}</Text>
          </TouchableOpacity>
          <Text style={styles.centerText}>{suggestionsList[currentSuggestionIndex]}</Text>
          <TouchableOpacity onPress={nextSuggestion}>
            <Text style={styles.arrow}>{'→'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  section: {
    width: width * 0.9,
    height: height * 0.15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#00796b',
  },
  suggestionSection: {
    width: width * 0.9,
    height: height * 0.24,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#00796b',
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
  },
  leftText: {
    position: 'absolute',
    left: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004d40',
  },
  rightText: {
    position: 'absolute',
    right: 20,
    fontSize: 18,
    color: 'gray',
  },
  centerText: {
    fontSize: 18,
    maxWidth: 250,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#004d40',
  },
  seeMoreButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#00796b',
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  seeMoreText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  }
};

export default ItineraryScreen;