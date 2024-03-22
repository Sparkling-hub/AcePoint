import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import TrainingInformations from '@/screens/coach/TrainingInformations';

export default function Training({ testID }: {
    readonly testID: string;
}) {
    return (
        <SafeAreaView testID={testID} style={styles.container}>
            <TrainingInformations />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});