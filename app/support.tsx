import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import SupportScreen from '@/screens/SupportScreen';

export default function Support({ testID }: {
    readonly testID: string;
}) {
    return (
        <SafeAreaView testID={testID} style={styles.container}>
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