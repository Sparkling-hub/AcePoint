import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from 'tamagui';

export default function MonthlyCalendarCoachScreen() {
    const scheduleData = [
        { id: '1', startTime: '09:30', endTime: '10:30', title: 'Antone Adi', subtitle: 'Club Name', spots: '2 spaces left' },
        { id: '2', startTime: '11:00', endTime: '12:00', title: 'Antone Adi', subtitle: 'Club Name', spots: '2 spaces left' },
        { id: '3', startTime: '13:00', endTime: '14:00', title: 'Antone Adi', subtitle: 'Club Name', spots: '2 spaces left' },
        { id: '4', startTime: '15:00', endTime: '16:00', title: 'Antone Adi', subtitle: 'Club Name', spots: '2 spaces left' },
    ];

    const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

    const hourHeight = 60;

    const calculateTopOffset = (startTime: string) => {
        const [startHour, startMinutes] = startTime.split(':').map(Number);
        const minutesHeight = (startMinutes / 60) * hourHeight; 
        const hourOffset = (startHour - 9) * hourHeight;
        return hourOffset + minutesHeight;
    };

    const calculateCardHeight = (startTime: string, endTime: string) => {
        const [startHour, startMinutes] = startTime.split(':').map(Number);
        const [endHour, endMinutes] = endTime.split(':').map(Number);
        const durationHours = endHour - startHour;
        const durationMinutes = endMinutes - startMinutes;
        return (durationHours * hourHeight) + ((durationMinutes / 60) * hourHeight);
    };

    const renderScheduleItem = (item: { id: string, startTime: string, endTime: string, title: string, subtitle: string, spots: string }) => {
        const cardHeight = calculateCardHeight(item.startTime, item.endTime);

        return (
            <View key={item.id} style={[styles.cardContainer, { height: cardHeight }]}>
                <Card style={styles.card}>
                    <View style={styles.details}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subtitle}>{item.subtitle}</Text>
                        <Text style={styles.time}>{`${item.startTime} - ${item.endTime}`}</Text>
                        <Text style={styles.spots}>{item.spots}</Text>
                    </View>
                </Card>
            </View>
        );
    };

    const renderTableRows = () => {
        return times.map((time, index) => (
            <View key={time} style={[styles.tableRow, { height: hourHeight }]}>
                <Text style={styles.timeText}>{time}</Text>
                <View style={styles.scheduleColumn}>
                    {scheduleData
                        .filter(item => calculateTopOffset(item.startTime) === index * hourHeight)
                        .map(renderScheduleItem)}
                </View>
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            {renderTableRows()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
    },
    timeText: {
        width: 50, 
        textAlign: 'right',
        paddingRight: 10, 
    },
    scheduleColumn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10, 
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        marginHorizontal: 16,
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#4B9ED8',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    details: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    time: {
        color: '#FFFFFF',
        fontSize: 14,
        marginTop: 4,
    },
    spots: {
        color: '#FFFFFF',
        fontSize: 14,
        marginTop: 4,
    },
    gridLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'grey',
        top: 0,
    },
});
