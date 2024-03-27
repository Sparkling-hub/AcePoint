import { storeData } from "@/api/localStorage";
import AddButtonCalendar from "@/components/AddButtonCalendar";
import Colors from "@/constants/Colors";
import { addDurationToStartDate, date, time } from "@/services/dateService";
import { RootState } from "@/store/store";
import { router } from "expo-router";
import moment from "moment";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import { useSelector } from "react-redux";
import { Text, View } from "tamagui";

export default function AgendaCoachScreen({ lessons }: { readonly lessons: any[] }) {

    const [items, setItems] = useState({});
    const timeToString = (time: number) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
    const loadItems = () => {
        let items = {}
        for (let i = 0; i < lessons.length; i++) {
            const strTime = timeToString(lessons[i].startDate.seconds * 1000);
            if (!items[strTime])
                items[strTime] = [];
            items[strTime].push({
                organiser: lessons[i].organiser,
                club: lessons[i].club,
                startDate: lessons[i].startDate,
                duration: lessons[i].duration
            });
        }
        setItems(items);
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
    const user = useSelector((state: RootState) => state.userRole);
    const userRole = user.userRole;
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
            {userRole !== 'Player' &&
                <AddButtonCalendar selectedDate={selectedDate} />
            }
        </>

    )
}
