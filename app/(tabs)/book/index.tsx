import BookTraining from '@/screens/player/BookTraining';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function Book() {
  return (
    <SafeAreaView style={styles.container}>
      <BookTraining />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
