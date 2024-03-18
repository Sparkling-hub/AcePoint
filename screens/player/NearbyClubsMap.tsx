import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import { Spinner, Text, View } from 'tamagui';

import { distanceCalculation } from '@/api/player-api';
import Colors from '@/constants/Colors';
import { getCurrentLocation } from '@/utils/LocationUtil';
import CustomLocationButton from '@/components/CustomLocationButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setNearbyClubs } from '@/store/slices/nearbyClubsSlice';

const NearbyClubsMap = () => {
  const [currentLocation, setCurrentLocation] = useState<Region>();
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);
  const [loading, setLoading] = useState(false);

  const { nearbyClubs } = useSelector((state: RootState) => state.nearbyClubs);
  const { filterIsLoading } = useSelector(
    (state: RootState) => state.filterIsLoading
  );

  const dispatch = useDispatch();

  const fetchNearbyClubs = async () => {
    setLoading(true);
    try {
      const region = await getCurrentLocation();
      if (region) {
        setCurrentLocation(region);
        const clubs: any = await distanceCalculation(
          region.latitude,
          region.longitude,
          50
        );
        dispatch(setNearbyClubs(clubs));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (nearbyClubs?.length === 0) {
        await fetchNearbyClubs();
      } else {
        setLoading(true);
        try {
          const region = await getCurrentLocation();
          if (region) {
            setCurrentLocation(region);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
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
      {loading || filterIsLoading ? (
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
                      ? require('../../assets/images/location_on.png')
                      : require('../../assets/images/location.png')
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
