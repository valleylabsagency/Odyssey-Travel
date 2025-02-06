import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../assets/styles';

const MapsScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const elCaribeHilton = {
    latitude: 18.4632,
    longitude: -66.0836,
  };
  
  const elYunqueNationalForest = {
    latitude: 18.2953,
    longitude: -65.8021,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: (elCaribeHilton.latitude + elYunqueNationalForest.latitude) / 2,
          longitude: (elCaribeHilton.longitude + elYunqueNationalForest.longitude) / 2,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
        }}
      >
        <Marker coordinate={elCaribeHilton} title="El Caribe Hilton Resort" />
        <Marker coordinate={elYunqueNationalForest} title="El Yunque National Forest" />
        <Polyline
          coordinates={[elCaribeHilton, elYunqueNationalForest]}
          strokeWidth={4}
          strokeColor={colors.accent}
        />
      </MapView>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Icon name="directions-car" size={24} color={colors.accent} />
          <Text style={styles.infoText}>Time to El Yunque by car: TBD</Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesome5 name="train" size={24} color={colors.accent} />
          <Text style={styles.infoText}>Time to El Yunque by train: TBD</Text>
        </View>
        <View style={styles.infoBox}>
          <Icon name="flight" size={24} color={colors.accent} />
          <Text style={styles.infoText}>Time to El Yunque by flight: TBD</Text>
        </View>
      </View>
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  map: {
    width: '100%',
    height: '70%',
  },
  infoContainer: {
    width: '90%',
    marginTop: 20,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: 'flex-start',
  },
  infoText: {
    fontSize: 16,
    color: colors.accent,
    marginLeft: 10,
  },
  error: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
});

export default MapsScreen;
