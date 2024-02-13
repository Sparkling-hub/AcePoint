import PlayerPfp from '@/components/PlayerPfp';
import Colors from '@/constants/Colors';

import { Text, XStack, YStack } from 'tamagui';

import DatePicker from '@/components/DatePicker';
import { useState } from 'react';
import CustomInput from '@/components/CustomInput';
import CountryCodePicker from '@/components/CountryCodePicker';
import CustomDropdown from '@/components/dropdown/CustomDropdown';

export default function EditPlayerProfile() {
  const [date, setDate] = useState<Date>(new Date());
  const [countryCode, setCountryCode] = useState('+44');
  const options = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
  return (
    <YStack flex={1} paddingTop={100}>
      <YStack marginBottom={30}>
        <YStack alignItems="center">
          <PlayerPfp imageContainerStyle={{ marginBottom: 20 }} />
          <Text
            style={{ fontFamily: 'Montserrat' }}
            fontSize={20}
            lineHeight={24}
            color={Colors.secondary}>
            Change profile picture
          </Text>
        </YStack>
      </YStack>
      <YStack paddingHorizontal={20} gap={'$3'} minWidth={362} flex={1}>
        <YStack gap={'$3'}>
          <CustomInput placeholder="Name" />
          <CustomInput placeholder="Email" />
        </YStack>
        <XStack gap={'$3'}>
          <YStack flex={1}>
            <CountryCodePicker
              countryCode={countryCode}
              setCountryCode={setCountryCode}
            />
          </YStack>
          <YStack flex={2}>
            <CustomInput placeholder="Phone" keyboardType="numeric" />
          </YStack>
        </XStack>
        <YStack gap={'$3'}>
          <CustomDropdown options={options} />
          <DatePicker date={date} setDate={setDate} />
        </YStack>
      </YStack>
    </YStack>
  );
}
