import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../assets/styles';

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
    backgroundColor: colors.background,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  section: {
    width: width * 0.9,
    height: height * 0.15,
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  suggestionSection: {
    width: width * 0.9,
    height: height * 0.15,
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 2,
    borderColor: colors.accent,
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
    color: colors.accent,
  },
  leftText: {
    position: 'absolute',
    left: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.accent,
  },
  rightText: {
    position: 'absolute',
    right: 20,
    fontSize: 18,
    color: colors.accent,
  },
  centerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.accent,
  },
  seeMoreButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.background,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  seeMoreText: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: 'bold',
  }
};

export default ItineraryScreen;
