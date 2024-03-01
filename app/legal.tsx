import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import LegalScreen from '@/screens/LegalScreen';

export default function Legal({ testID }: {
    readonly testID: string;
}) {
    return (
        <SafeAreaView testID={testID} style={styles.container}>
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