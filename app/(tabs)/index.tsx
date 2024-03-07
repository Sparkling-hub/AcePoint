import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import 'react-native-gesture-handler';

import { Button } from 'tamagui';
import EditScreenInfo from '@/components/EditScreenInfo';
import { locationPosition,distanceCalculation }  from '@/api/player-api'; 
import { useState } from 'react';

export default function TabOneScreen() {
  const [lat,setLat]=useState(0)
  const [lon,setLon]=useState(0)
  // const lat=37.4220936
  // const lon=-122.083922
  const handlePostion=()=>{
    console.log('clicked')
    locationPosition().then((data:any)=>{
      console.log(data)
      setLat(data.latitude)
      setLon(data.longitude)
    })
    console.log(lat,lon)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text style={{ marginBottom: 10 }}>Hello Tamagui!</Text>
      <Button size="$3" onPress={handlePostion }>
        location
      </Button>
      <Button size="$3" onPress={() => distanceCalculation(lat,lon,50)}>
        Press Me
      </Button>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
