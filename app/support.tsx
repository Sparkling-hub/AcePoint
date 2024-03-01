import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import SupportScreen from '@/screens/SupportScreen';

export default function Support() {
    return (
        <SafeAreaView style={styles.container}>
            <SupportScreen />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});