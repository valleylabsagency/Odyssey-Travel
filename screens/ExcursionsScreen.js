import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import colors from '../assets/styles';

export default function ExcursionsScreen() {
  const [excursions, setExcursions] = useState([]);

  useEffect(() => {
    const fetchExcursions = async () => {
      try {
        const response = await fetch('https://api.viator.com/partner/v2/products/search?location=San+Juan', {
          headers: {
            'exp-api-key': 'YOUR_VIATOR_API_KEY',
          },
        });
        const data = await response.json();
        setExcursions(data.data);
      } catch (error) {
        console.error('Error fetching excursions:', error);
      }
    };

    fetchExcursions();
  }, []);

  const renderExcursion = ({ item }) => (
    <View style={styles.excursionContainer}>
      <Image source={{ uri: item.thumbnailUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.description}>{item.shortDescription}</Text>
        <Text style={styles.price}>From ${item.price.amount} {item.price.currencyCode}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Suggested excursions for your trip in San Juan</Text>
      <FlatList
        data={excursions}
        keyExtractor={(item) => item.productCode}
        renderItem={renderExcursion}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  list: {
    padding: 15,
  },
  excursionContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  description: {
    fontSize: 14,
    color: colors.secondary,
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.accent,
  },
});
