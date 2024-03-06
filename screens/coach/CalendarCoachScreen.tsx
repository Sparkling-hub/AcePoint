import { useSelector } from "react-redux";
import AgendaCoachScreen from "./AgendaCoachScreen";
import WeeklyCalendarCoachScreen from "./WeeklyCalendarCoachScreen";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from "@/constants/Colors";

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
function getTimeIndex(time: string): number {
    return times.indexOf(time);
}

function calculateEventTopOffset(startTime: string): number {
    const timeIndex = getTimeIndex(startTime);
    return timeIndex * 40; // Assuming each time slot has a height of 40
}

function calculateEventHeight(startTime: string, endTime: string): number {
    const startIndex = getTimeIndex(startTime);
    const endIndex = getTimeIndex(endTime);
    return (endIndex - startIndex) * 40; // Assuming each time slot has a height of 40
}

export default function CalendarCoachScreen() {
    const result = useSelector((state: any) => state.calendarOption);
    const weeklyEvents: { [key: number]: { [time: string]: { name: string, spacesLeft: number, isFull?: boolean, endTime: string } } } = {
        0: {},
        1: { '09:30': { name: 'Morning Yoga', spacesLeft: 2, endTime: '10:30' } },
        3: { '11:30': { name: 'Morning Yoga', spacesLeft: 0, endTime: '14:00' } },
    };
    return (
        <>
            {result.option === 'W'
                ? <View style={styles.container}>
                    <WeeklyCalendarCoachScreen />
                    <View style={styles.weekGrid}>
                        <View style={styles.timeColumn}>
                            {times.map((time, index) => (
                                <View key={time} style={[styles.timeCell, index === times.length - 1 && styles.lastTimeCell]}>
                                    <Text style={styles.timeText}>{time}</Text>
                                </View>
                            ))}
                        </View>
                        {/* Day Columns */}
                        {daysOfWeek.map((day, dayIndex) => (
                            <View key={day} style={styles.dayColumn}>
                                {times.map((time) => {
                                    const event = weeklyEvents[dayIndex]?.[time];
                                    if (event) {
                                        const eventTopOffset = calculateEventTopOffset(time);
                                        const eventHeight = calculateEventHeight(time, event.endTime);
                                        return (
                                            <View key={day + time} style={[styles.eventCell, { top: eventTopOffset, height: eventHeight }]}>
                                                <Text style={styles.eventText}>
                                                    {event.name} {event.isFull ? 'Full' : `${event.spacesLeft} Spaces left`}
                                                </Text>
                                            </View>
                                        );
                                    } else {
                                        return (
                                            <View key={day + time} style={styles.emptyEventCell}>
                                                <Text style={styles.emptyEventText}></Text>
                                            </View>
                                        );
                                    }
                                })}
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                : <AgendaCoachScreen />
            }
        </>
    );
}
const styles = StyleSheet.create({
    weekGrid: {
        flexDirection: 'row',
        flex: 1,
    },
    daySelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
    },
    dayButton: {
        padding: 10,
    },
    selectedDay: {
        borderBottomWidth: 2,
        borderBottomColor: '#007AFF',
    },
    dayText: {
        fontSize: 16,
    },
    timeColumn: {
        width: 50,
    },
    timeCell: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lastTimeCell: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    dayColumn: {
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: '#e0e0e0',
    },
    eventCell: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: Colors.secondary, // Your desired event card color
        borderRadius: 5, // Adjust as needed for desired border radius
        overflow: 'hidden', // Ensures the children don't overflow the border radius
    },
    emptyEventCell: {
        height: 40, // Match the height of your time slots
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 5,
    },
    fullEvent: {
        backgroundColor: Colors.secondary,
    },
    eventText: {
        color: '#ffffff',
        padding: 5, // Add padding to give text some space inside the event cell
    },
    emptyEventText: {
        color: '#dadada',
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
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10, // Ensure the button is above other elements
    },
    addButtonText: {
        fontSize: 30,
        color: Colors.secondary,
    },
});