import { useSelector } from "react-redux";
import AgendaCoachScreen from "./AgendaCoachScreen";
import WeeklyCalendarCoachScreen from "./WeeklyCalendarCoachScreen";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const TimeSlot = ({ time, event, isFull }: { time: string, event: any, isFull: boolean }) => {
    return (
        <View style={styles.timeSlot}>
            <Text style={styles.timeText}>{time}</Text>
            {event && (
                <View style={[styles.event, isFull && styles.fullEvent]}>
                    <Text style={styles.eventText}>{event.name}</Text>
                    {!isFull && <Text style={styles.spacesLeft}>{event.spacesLeft} Spaces left</Text>}
                    {isFull && <Text style={styles.fullText}>Full</Text>}
                </View>
            )}
        </View>
    );
};
export default function CalendarCoachScreen() {
    const result = useSelector((state: any) => state.calendarOption);
    const events = {
        '09:30': { name: 'Morning Squid', spacesLeft: 2 },
        '12:00': { name: 'Adi Antone', spacesLeft: 0, isFull: true },
        '13:30': { name: 'Summer Camp', spacesLeft: 3 },
    };

    const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
    return (
        <>
            {result.option === 'W'
                ? <View flex={1} justifyContent="flex-start">
                    <WeeklyCalendarCoachScreen />
                </View>
                : <AgendaCoachScreen />
            }
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    timeSlot: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    timeText: {
        width: 50,
        textAlign: 'right',
        marginRight: 10,
    },
    event: {
        flex: 1,
        backgroundColor: '#4e68d9',
        padding: 10,
        borderRadius: 5,
    },
    fullEvent: {
        backgroundColor: '#d9534f',
    },
    eventText: {
        color: '#ffffff',
    },
    spacesLeft: {
        color: '#ffffff',
        marginTop: 5,
    },
    fullText: {
        color: '#ffffff',
        marginTop: 5,
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4e68d9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 30,
        color: '#ffffff',
    },
});