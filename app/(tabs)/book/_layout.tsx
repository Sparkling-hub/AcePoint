import CustomHeader from '@/components/CustomHeader';
import HeaderText from '@/components/HeaderText';
import BookHeader from '@/components/headers/BookHeader';

import Colors from '@/constants/Colors';
import { ChevronLeft } from '@tamagui/lucide-icons';

import { Stack, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

const StackLayout = () => {
  const FilterHeader = () => {
    return (
      <CustomHeader
        leftIcon={<ChevronLeft size={'$2.5'} color={Colors.secondary} />}
        onLeftPress={() => {
          router.navigate('/(tabs)/book');
        }}
        title="Filters"
        headerTextStyle={{ fontSize: 26, lineHeight: 32 }}
        rightContent={
          <TouchableOpacity onPress={() => console.log('pressed')}>
            <HeaderText text="SAVE" />
          </TouchableOpacity>
        }
      />
    );
  };
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: BookHeader,
        }}
      />
      <Stack.Screen
        name="filter"
        options={{
          header: FilterHeader,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
