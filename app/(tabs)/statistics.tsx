import { Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';

const statistics = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>statistics</Text>
    </SafeAreaView>
  );
};

export default statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
