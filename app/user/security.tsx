import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import SecurityScreen from '@/screens/SecurityScreen';

export default function Account() {
    return (
        <SafeAreaView style={styles.container}>
            <SecurityScreen></SecurityScreen>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
