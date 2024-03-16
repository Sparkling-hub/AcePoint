import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import { Spinner, Text, View } from 'tamagui';

import CustomLocationButton from './CustomLocationButton';
import * as Location from 'expo-location';
import fireToast from './toast/Toast';
import { Club } from '@/model/club';
import { distanceCalculation } from '@/api/player-api';
import Colors from '@/constants/Colors';

const NearbyClubsMap = () => {
  const [currentLocation, setCurrentLocation] = useState<Region>();
  const [nearbyClubs, setNearbyClubs] = useState<Club[]>([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);
  const [loading, setLoading] = useState(true);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      };
      return region;
    } catch (error) {
      fireToast({
        message: 'Please enable location services',
        type: 'error',
      });
    }
  };

  const fetchNearbyClubs = async () => {
    try {
      const region = await getCurrentLocation();
      if (region) {
        setCurrentLocation(region);
        const clubs: any = await distanceCalculation(
          region.latitude,
          region.longitude,
          50
        );
        setNearbyClubs(clubs);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearbyClubs();
  }, []);

  const handleLocationPress = async () => {
    const region = await getCurrentLocation();
    if (region) {
      setCurrentLocation(region);
      mapRef.current?.animateToRegion(region, 1000);
    }
  };

  const handleMarkerPress = (markerId: string) => {
    setSelectedMarkerId(markerId === selectedMarkerId ? null : markerId);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner size="large" color={Colors.secondary} />
      ) : (
        <>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={false}
            initialRegion={currentLocation}>
            {nearbyClubs?.length > 0 &&
              nearbyClubs.map((club) => (
                <Marker
                  key={club.id}
                  coordinate={{
                    latitude: club.latitude ?? 0,
                    longitude: club.longitude ?? 0,
                  }}
                  onPress={() => handleMarkerPress(club.id ?? '')}
                  image={
                    club.id === selectedMarkerId
                      ? require('../assets/images/location_on.png')
                      : require('../assets/images/location.png')
                  }>
                  <Callout tooltip>
                    <View>
                      <View
                        height={32}
                        paddingHorizontal={13}
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={20}
                        backgroundColor={'rgba(58, 77, 108, 0.9)'}>
                        <Text color={'white'}>{club.name}</Text>
                      </View>
                    </View>
                  </Callout>
                </Marker>
              ))}
          </MapView>
          <CustomLocationButton onPress={handleLocationPress} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
  },
});

export default NearbyClubsMap;
