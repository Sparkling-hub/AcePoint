import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import FilterScreen from '@/screens/FilterScreen';

const filter = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FilterScreen />
    </SafeAreaView>
  );
};

export default filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
