import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import SettingsScreen from '@/screens/SettingScreen';

export default function Account() {
    return (
        <SafeAreaView style={styles.container}>
            <SettingsScreen />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
