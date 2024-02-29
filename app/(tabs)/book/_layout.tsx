import CustomHeader from '@/components/CustomHeader';
import HeaderText from '@/components/HeaderText';
import Bell from '@/components/svg/Bell';
import Message from '@/components/svg/Message';
import Colors from '@/constants/Colors';
import { ChevronLeft } from '@tamagui/lucide-icons';

import { Stack, router } from 'expo-router';
import { Pressable, TouchableOpacity } from 'react-native';
import { XStack } from 'tamagui';

const StackLayout = () => {
  const BookHeader = () => {
    return (
      <CustomHeader
        rightContent={
          <XStack alignItems="center" gap={11}>
            <Pressable>
              {({ pressed }) => (
                <Message
                  fill={Colors.secondary}
                  style={{ opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
            <Pressable>
              {({ pressed }) => (
                <Bell
                  fill={Colors.secondary}
                  style={{ opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </XStack>
        }
        title="Book Training"
        headerTextStyle={{ fontSize: 26, lineHeight: 32 }}
      />
    );
  };

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
