import AddButtonCalendar from "@/components/AddButtonCalendar";
import Colors from "@/constants/Colors";
import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import { Text, View } from "tamagui";

export default function AgendaCoachScreen({ lessons }: { readonly lessons: any[] }) {

    const [items, setItems] = useState({});
    const date = (time: any) => {
        const date = new Date(time * 1000);
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
    };
    const time = (time: any) => {
        const date = new Date(time * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes}`;
    };
    function addDurationToStartDate(startDate: string, duration: string): string {
        const [hours, minutes] = startDate.split(':').map(Number);
        const [durationHours, durationMinutes] = duration.split(':').map(Number);
        let newHours = hours + durationHours;
        let newMinutes = minutes + durationMinutes;
        if (newMinutes >= 60) {
            newHours += Math.floor(newMinutes / 60);
            newMinutes = '00';
        }

        return `${newHours}:${newMinutes}`;
    }
    const loadItems = useCallback(() => {
        const itemsByDate = lessons.reduce((acc, lesson) => {
            let lessonDate = new Date(lesson.startDate.seconds * 1000);
            const endDate = new Date(lesson.endDate.seconds * 1000);
            while (lessonDate <= endDate) {
                const formattedDate = date(lessonDate.getTime() / 1000);
                acc[formattedDate] = acc[formattedDate] || [];
                acc[formattedDate].push(lesson);

                switch (lesson.recurrence) {
                    case 'Weekly':
                        lessonDate.setDate(lessonDate.getDate() + 7);
                        break;
                    case 'Daily':
                        lessonDate.setDate(lessonDate.getDate() + 1);
                        break;
                    case 'Monthly':
                        lessonDate.setMonth(lessonDate.getMonth() + 1);
                        break;
                    case 'EveryWeekDay':
                        const day = lessonDate.getDay();
                        lessonDate.setDate(lessonDate.getDate() + (day === 5 ? 3 : day === 6 ? 2 : 1));
                        break;
                    default:
                        break;

                }
            }
            return acc;
        }, {});
        setItems(itemsByDate);
    }, [lessons, setItems]);

    const renderItem = (item: any) => {
        return (
            <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
                <Card>
                    <Card.Content style={{ backgroundColor: Colors.secondary, borderRadius: 10 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Text style={{ color: Colors.iron }}>{item.organiser}</Text>
                            <Text style={{ color: Colors.iron }}>{item.club}</Text>
                            <Text style={{ color: Colors.iron }}>{time(item.startDate)} - {addDurationToStartDate(time(item.startDate), item.duration)}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };
    return (
        <>
            <Agenda
                items={items}
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
