import Colors from "@/constants/Colors";
import CalendarStrip from 'react-native-calendar-strip';
import { View, Text, StyleSheet } from 'react-native';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
const weeklyEvents: { [key: number]: { [time: string]: { name: string, spacesLeft: number, isFull?: boolean, endTime: string } } } = {
    0: {},
    1: { '09:30': { name: 'Morning Yoga', spacesLeft: 2, endTime: '10:30' } },
    3: { '11:30': { name: 'Morning Yoga', spacesLeft: 0, endTime: '14:00' } },
};

function getTimeIndex(time: string): number {
    const baseTime = times[0];
    const [hours, minutes] = time.split(':').map(Number);
    const [baseHours, baseMinutes] = baseTime.split(':').map(Number);
    const minutesSinceBaseTime = (hours - baseHours) * 60 + (minutes - baseMinutes);
    return minutesSinceBaseTime / 30;
}

function calculateEventTopOffset(startTime: string): number {
    const timeIndex = getTimeIndex(startTime);
    return timeIndex * 40;
}

function calculateEventHeight(startTime: string, endTime: string): number {
    const startIndex = getTimeIndex(startTime);
    const endIndex = getTimeIndex(endTime);
    return (endIndex - startIndex) * 40;
}

export default function WeeklyCalendarCoachScreen() {
    return (
        <View style={styles.container}>
            <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: Colors.primary }}
                style={{ height: 100, paddingTop: 20, paddingBottom: 10, borderRadius: 20, marginLeft: 50, marginRight: 5 }}
                calendarHeaderStyle={{ color: 'white' }}
                calendarColor={Colors.secondary}
                dateNumberStyle={{ color: 'white' }}
                dateNameStyle={{ color: 'white' }}
                highlightDateNumberStyle={{ color: Colors.primary }}
                highlightDateNameStyle={{ color: Colors.primary }}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey' }}
                iconContainer={{ flex: 0.1 }}
                iconLeftStyle={{ tintColor: 'white' }}
                iconRightStyle={{ tintColor: 'white' }}
            />
            <View style={styles.timeColumn}>
                {times.map((time, index) => (
                    <View key={`time-${time}`} style={styles.timeCell}>
                        <Text style={styles.timeText}>{time}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.weekGrid}>
                {times.map((time, index) => {
                    const topOffset = calculateEventTopOffset(time);
                    return (
                        <View key={`line-${time}`} style={[styles.gridLine, { top: topOffset }]} />
                    );
                })}

                {daysOfWeek.map((day, dayIndex) => (
                    <View key={day} style={styles.dayColumn}>
                        <View style={[styles.gridLine, { top: 0, bottom: 0, width: 1, left: null, right: null, height: null }]} />

                        {times.map((time, index) => {
                            const event = weeklyEvents[dayIndex]?.[time];
                            if (event) {
                                const eventTopOffset = calculateEventTopOffset(time);
                                const eventHeight = calculateEventHeight(time, event.endTime);
                                return (
                                    <View key={day + time} style={[styles.eventCell, { top: eventTopOffset, height: eventHeight }]}>
                                        <Text style={styles.eventTime}>{time} - {event.endTime}</Text>
                                        <Text style={styles.eventText}>{event.name}</Text>
                                        <Text style={styles.eventTime}>{event.spacesLeft} Spaces left</Text>
                                    </View>
                                );
                            }
                        })}
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weekGrid: {
        flexDirection: 'row',
        flex: 1,
    },
    timeColumn: {
        position: 'absolute',
        left: 0,
        top: 80,
        bottom: 0,
        width: 50,
        zIndex: 1,
    },
    timeCell: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 12,
        width: 50,
        textAlign: 'right',
        marginRight: 10,
    },
    hourTimeCell: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    dayColumn: {
        flex: 1,
    },
    eventCell: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        zIndex: 2,
    },
    emptyEventCell: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    halfHourTimeCell: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        zIndex: 0,
    },
    hourSeparator: {
        position: 'absolute',
        left: 50,
        right: 0,
        bottom: 0,
        height: 1,
        backgroundColor: '#e0e0e0',
        zIndex: 1,
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
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    eventTime: {
        color: '#ffffff',
        fontSize: 8,
        fontWeight: 'normal',
        textAlign: 'center',
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
        zIndex: 10,
    },
    addButtonText: {
        fontSize: 30,
        color: Colors.secondary,
    },
    gridLine: {
        position: 'absolute',
        left: 50,
        right: 0,
        height: 1,
        backgroundColor: '#e0e0e0',
        zIndex: 0,
    },
});