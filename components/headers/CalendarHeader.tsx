import React from 'react';
import { Button, View } from 'tamagui';
import Colors from '@/constants/Colors';
import { ChevronLeft } from '@tamagui/lucide-icons';
import Calendar from '@/components/svg/Calendar';
import CustomHeader from '../CustomHeader';
import { StyleSheet } from 'react-native';

type CalendarHeaderProps = {
    readonly handleState: (selected: string) => void;
    readonly getButtonStyle: (key: string) => object;
};

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ handleState, getButtonStyle }) => {
    return (
        <CustomHeader
            leftIcon={<ChevronLeft size={'$2.5'} color={Colors.secondary} />}
            rightContent={
                <View style={styles.header}>
                    <Calendar fill={Colors.secondary} style={{ marginRight: 20, marginTop: 3 }}></Calendar>
                    {['D', 'W', 'M'].map((key) => (
                        <Button key={key} style={getButtonStyle(key)} onPress={() => handleState(key)}>
                            {key}
                        </Button>
                    ))}
                </View>
            }
        />
    );
};

export default CalendarHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})