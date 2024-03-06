import Colors from '@/constants/Colors';
import React, { useMemo } from 'react';
import { Slider, XStack, YStack } from 'tamagui';
import Item from './Item';

interface CustomSliderProps {
  sliderValue: number[];
  setSliderValue: (value: number[]) => void;
  min: number;
  max: number;
  step?: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  sliderValue,
  setSliderValue,
  min,
  max,
  step = 1,
}) => {
  // Memoized rendering of scale items
  const renderScale = useMemo(() => {
    const items = [];
    for (let i = min; i <= max; i += step) {
      // Determine if the current value is in the middle of the range
      const isMiddleValue = step > 1 && (i - min) % (2 * step) === step;
      items.push(<Item key={i} value={i} isMiddleValue={isMiddleValue} />);
    }
    return items;
  }, [min, max, step]);

  return (
    <YStack width={'100%'} gap={'$3'}>
      <Slider
        size="$4"
        min={min}
        max={max}
        defaultValue={sliderValue}
        onValueChange={(value) => setSliderValue(value)}
        step={step}>
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
      {/* Stack to display scale items */}
      <XStack
        justifyContent="space-between"
        width={'100%'}
        marginLeft={step === 5 && 5}>
        {renderScale}
      </XStack>
    </YStack>
  );
};

export default CustomSlider;
