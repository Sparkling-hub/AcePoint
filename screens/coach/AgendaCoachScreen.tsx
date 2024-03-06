import AddButtonCalendar from "@/components/AddButtonCalendar";
import Colors from "@/constants/Colors";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import { Text, View } from "tamagui";

export default function AgendaCoachScreen() {

    const [items, setItems] = useState({});
    const timeToString = (time: any) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    };
    const loadItems = (day: any) => {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if (!items[strTime]) {
                    items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    };

    const renderItem = (item: any) => {
        return (
            <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
                <Card>
                    <Card.Content>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Text>{item.name}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };
    return (
        <>
            <Agenda items={items}
                loadItemsForMonth={loadItems}
                selected={new Date().toString()}
                renderItem={renderItem}
                theme={{
                    agendaDayTextColor: Colors.primary,
                    agendaTodayTextColor: Colors.primary,
                    agendaDotColor: Colors.primary,
                    agendaSelectedDayTextColor: Colors.primary,
                    agendaSelectedDotColor: Colors.primary,
                    agendaTodayColor: Colors.primary,
                    selectedDayBackgroundColor: Colors.primary,
                    selectedDayTextColor: Colors.secondary,
                    todayTextColor: Colors.iron,
                    dotColor: Colors.primary,
                    selectedDotColor: Colors.secondary,
                    monthTextColor: Colors.secondary,
                    dayTextColor: Colors.secondary
                }}
            />
            <AddButtonCalendar />

        </>

    )
}