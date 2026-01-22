import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    };

    getLocation();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>Getting location...</Text>
      </View>
    );
  }

const places = [
  { id: 1, lat: 35.113949, lng: 32.850552, name: 'LAU' },
  { id: 2, lat: 35.111498, lng: 35.111498, name: 'LAU Dorm' },
];

const destination = {
  latitude: 35.113949,
  longitude: 32.850552,
};

  return (
  <View style={styles.container}>
    <MapView
  style={styles.map}
  showsUserLocation
  initialRegion={{
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  }}
>
  {places.map(place => (
    <Marker
      key={place.id}
      coordinate={{
        latitude: place.lat,
        longitude: place.lng,
      }}
      title={place.name}
    />
  ))}

  <Polyline
    coordinates={[
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      destination,
    ]}
    strokeWidth={4}
    strokeColor="blue"
  />
</MapView>

  </View>
);
} 

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
