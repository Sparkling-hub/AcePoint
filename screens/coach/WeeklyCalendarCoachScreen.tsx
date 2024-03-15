import Colors from "@/constants/Colors";
import CalendarStrip from 'react-native-calendar-strip';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddButtonCalendar from "@/components/AddButtonCalendar";
import { ScrollView } from "tamagui";
import { useEffect, useState } from "react";
import { storeData } from "@/api/localStorage";
import { router } from "expo-router";

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const times = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];

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

export default function WeeklyCalendarCoachScreen({ lessons, currentWeek }: { readonly lessons: any[], readonly currentWeek: string }) {
    const [weeklyEvents, setWeeklyEvents] = useState({})
    const [week, setWeek] = useState(currentWeek)
    useEffect(() => {
        function mapLessonsToWeeklyEvents(lessons: any[]): void {
            const weeklyEvents: { [key: number]: { [time: string]: { name: string, spacesLeft: number, isFull?: boolean, endTime: string, eventId: string } } } = {};
            const [currentWeekStart, currentWeekEnd] = week.split(' ').map(date => new Date(date));
            if (currentWeekEnd)
                currentWeekEnd.setHours(currentWeekEnd.getHours() + 11);
            lessons.forEach(lesson => {
                const startDate = new Date(lesson.startDate.seconds * 1000);
                const duration = lesson.duration;
                const endDate = new Date(startDate.getTime() + (Number(duration.split(':')[0]) * 60 * 60 * 1000) + (Number(duration.split(':')[1]) * 60 * 1000));
                if (startDate >= currentWeekStart && startDate <= currentWeekEnd) {
                    const dayOfWeek = (startDate.getDay() + 6) % 7 + 1;
                    const startTime = `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`;
                    const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
                    const spacesLeft = lesson.maxPeople - lesson.players.length;
                    const isFull = spacesLeft <= 0;

                    if (!weeklyEvents[dayOfWeek]) {
                        weeklyEvents[dayOfWeek] = {};
                    }

                    weeklyEvents[dayOfWeek][startTime] = {
                        name: lesson.description,
                        spacesLeft,
                        isFull,
                        endTime,
                        eventId: lesson.id
                    };
                }
            });
            setWeeklyEvents(weeklyEvents);
        }

        mapLessonsToWeeklyEvents(lessons);
    }, [week])
    return (
        <View style={styles.container}>
            <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: Colors.primary }}
                style={{ height: 100, paddingTop: 20, paddingBottom: 10, borderRadius: 20, marginLeft: 20, marginRight: 5 }}
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
                onWeekChanged={(start, end) => setWeek(`${start.toISOString()} ${end.toISOString()}`)}
                selectedDate={new Date()}
            />
            <ScrollView>
                <View style={styles.timeColumn}>
                    {times.map((time) => (
                        <View key={`time-${time}`} style={styles.timeCell}>
                            <Text style={styles.timeText}>{time}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ ...styles.weekGrid, marginRight: 35 }}>
                    {times.map((time) => {
                        const topOffset = calculateEventTopOffset(time);
                        return (
                            <View key={`line-${time}`} style={[styles.gridLine, { top: topOffset }]} />
                        );
                    })}

                    {daysOfWeek.map((day, dayIndex) => (
                        <View key={day} style={styles.dayColumn}>
                            <View style={[styles.gridLine, { top: 0, width: 1, left: null, right: 0, height: 20000 }]} />
                            {times.map((time) => {
                                const event = weeklyEvents[dayIndex + 1]?.[time];
                                if (event) {
                                    const eventTopOffset = calculateEventTopOffset(time);
                                    const eventHeight = calculateEventHeight(time, event.endTime);
                                    return (
                                        <TouchableOpacity onPress={async () => {
                                            await storeData('trainingID', event.eventId)
                                            router.navigate('/training')
                                        }}
                                            key={time}>
                                            <View key={day + time} style={[styles.eventCell, { top: eventTopOffset, height: eventHeight, borderWidth: 1, borderColor: Colors.primary }]}>
                                                <Text style={styles.eventTime}>{time} - {event.endTime}</Text>
                                                <Text style={styles.eventText}>{event.name}</Text>
                                                <Text style={styles.eventTime}>{event.spacesLeft} Spaces left</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }
                            })}

                        </View>
                    ))}
                </View>
            </ScrollView>
            <AddButtonCalendar />
        </View>
    )
}

const styles = StyleSheet.create({
    weekGrid: {
        position: 'absolute',
        marginTop: 35,
        flexDirection: 'row',
        flex: 1,
        marginStart: 50
    },
    timeColumn: {
        left: 0,
        top: 20,
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
        left: 0,
        right: 0,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        zIndex: 2,
    },
    halfHourTimeCell: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        zIndex: 0,
    },
    hourSeparator: {
        left: 50,
        right: 0,
        bottom: 0,
        height: 1,
        backgroundColor: '#e0e0e0',
        zIndex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    spacesLeft: {
        color: '#ffffff',
        marginTop: 5,
    },
    fullText: {
        color: '#ffffff',
        marginTop: 5,
    },
    gridLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#e0e0e0',
        zIndex: 0,
    },
});