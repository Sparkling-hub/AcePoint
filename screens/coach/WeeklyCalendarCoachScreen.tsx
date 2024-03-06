import Colors from "@/constants/Colors";
import CalendarStrip from 'react-native-calendar-strip';
export default function WeeklyCalendarCoachScreen() {
    return (
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
        />
    )
}