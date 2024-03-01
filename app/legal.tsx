import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import LegalScreen from '@/screens/LegalScreen';

export default function Legal() {
    return (
        <SafeAreaView style={styles.container}>
            <LegalScreen />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});