import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import WeeklyCalendarCoachScreen from '@/screens/coach/WeeklyCalendarCoachScreen';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function CoachAvailability() {
    const coach = useSelector((state: RootState) => state.coach);
    const lessons = coach.lessons;
    return (
        <SafeAreaView style={styles.container}>
            <WeeklyCalendarCoachScreen lessons={lessons} currentWeek='' />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});