import Colors from '@/constants/Colors';
import React from 'react';
import { Slider, Text, View, YStack, styled } from 'tamagui';

const FilterScreen = () => {
  return (
    <YStack paddingHorizontal={20} paddingTop={35}>
      <View
        height={30}
        backgroundColor={Colors.secondary}
        borderRadius={8}
        paddingLeft={13}
        paddingVertical={3}>
        <Text
          style={{ fontFamily: 'MontserratBold' }}
          color={'white'}
          fontSize={20}
          lineHeight={24}>
          Clubs
        </Text>
      </View>
      <Text
        marginTop={15}
        marginBottom={24}
        style={{ fontFamily: 'MontserratBold' }}
        color={Colors.secondary}
        fontSize={16}
        lineHeight={19}>
        Distance: <Text color={Colors.primary}>20km</Text>
      </Text>
      <Slider size="$4" width={'100%'} defaultValue={[50]} max={100} step={1}>
        <Slider.Track backgroundColor={'#3A4D6C38'} height={11}>
          <Slider.TrackActive backgroundColor={'#3A4D6C38'} />
        </Slider.Track>
        <Slider.Thumb
          size={30}
          backgroundColor={Colors.secondary}
          borderColor={Colors.secondary}
          circular
          index={0}
        />
      </Slider>
    </YStack>
  );
};

export default FilterScreen;
