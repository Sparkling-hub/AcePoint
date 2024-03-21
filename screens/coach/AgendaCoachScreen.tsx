import { storeData } from "@/api/localStorage";
import AddButtonCalendar from "@/components/AddButtonCalendar";
import Colors from "@/constants/Colors";
import { addDurationToStartDate, date, time } from "@/services/dateService";
import { router } from "expo-router";
import moment from "moment";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import { Text, View } from "tamagui";

export default function AgendaCoachScreen({ lessons }: { readonly lessons: any[] }) {

    const [items, setItems] = useState({});
    const loadItems = () => {
        const itemsByDate = lessons.reduce((acc, lesson) => {
            let lessonDate = new Date(lesson.startDate.seconds * 1000);
            const endDate = new Date(lesson.endDate.seconds * 1000);
            while (lessonDate <= endDate) {
                const formattedDate = date(lessonDate.getTime() / 1000);
                acc[formattedDate] = acc[formattedDate] || [];
                acc[formattedDate].push(lesson);
                if (lesson.recurrence === 'Weekly') lessonDate.setDate(lessonDate.getDate() + 7);
                else if (lesson.recurrence === 'Daily') lessonDate.setDate(lessonDate.getDate() + 1);
                else if (lesson.recurrence === 'Monthly') lessonDate.setMonth(lessonDate.getMonth() + 1);
                else if (lesson.recurrence === 'EveryWeekDay') {
                    const day = lessonDate.getDay();
                    let lessonDuration;
                    if (day === 5) {
                        lessonDuration = 3;
                    } else if (day === 6) {
                        lessonDuration = 2;
                    } else {
                        lessonDuration = 1;
                    }
                    lessonDate.setDate(lessonDate.getDate() + lessonDuration);

                }
                else {
                    lessonDate.setDate(lessonDate.getTime())
                }
            }
            return acc;
        }, {});
        setItems(itemsByDate);
    }

    const renderItem = (item: any) => {
        return (
            <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }} onPress={async () => {
                await storeData('trainingID', item.id)
                router.replace('/training')
            }}>
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
    const [selectedDate, setSelectedDate] = useState(moment().format('DD/MMM/yyyy, hh:mm'));
    const onDayPress = (day) => {
        setSelectedDate(moment(day).format('DD/MMM/yyyy, hh:mm'));
    };
    return (
        <>
            <Agenda
                onDayPress={onDayPress}
                items={items}
                loadItemsForMonth={loadItems}
                selected={new Date().toString()}
                renderItem={renderItem}
                renderEmptyData={() => {
                    return (<View style={{
                        height: 15,
                        flex: 1,
                        paddingTop: 30,
                        alignSelf: 'center',
                    }}>
                        <Text style={{
                            color: Colors.secondary
                        }}>This is empty date !</Text>
                    </View>)
                }}
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
            <AddButtonCalendar selectedDate={selectedDate} />
        </>

    )
}
