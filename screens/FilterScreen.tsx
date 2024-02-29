import CustomSlider from '@/components/CustomSlider';
import FilterHeader from '@/components/FilterHeader';
import FilterText from '@/components/FilterText';
import TagItem from '@/components/TagItem';

import Colors from '@/constants/Colors';
import { StarFull } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { XStack, YStack } from 'tamagui';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const tagsData = [
  {
    id: '1',
    title: 'Beginner',
  },
  {
    id: '2',
    title: 'Fun',
  },
  {
    id: '3',
    title: 'Competitive',
  },
];

const FilterScreen = () => {
  const [distance, setDistance] = useState<number[]>([0]);
  const [rating, setRating] = useState<number[]>([0]);
  const [level, setLevel] = useState<number[]>([0]);
  const [tags, setTags] = useState<string[]>([]);

  const handlePressTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  return (
    <YStack paddingHorizontal={20} paddingTop={35} flex={1} gap={hp('3%')}>
      <YStack>
        <FilterHeader title="Clubs" containerStyles={{ marginBottom: 15 }} />
        <FilterText
          title="Distance: "
          unit="km"
          sliderValue={distance}
          marginBottom={24}
        />
        <CustomSlider
          min={0}
          max={50}
          step={5}
          sliderValue={distance}
          setSliderValue={setDistance}
        />
      </YStack>
      <YStack>
        <FilterHeader title="Coach" containerStyles={{ marginBottom: 13 }} />
        <XStack alignItems="center" marginTop={13} marginBottom={24} gap={'$1'}>
          <FilterText title="Rating: > " sliderValue={rating} />
          <StarFull size={16} color={Colors.primary} />
        </XStack>
        <CustomSlider
          min={0}
          max={5}
          sliderValue={rating}
          setSliderValue={setRating}
        />
      </YStack>
      <YStack>
        <FilterText title="Level: " sliderValue={level} marginBottom={24} />
        <CustomSlider
          min={0}
          max={5}
          sliderValue={level}
          setSliderValue={setLevel}
        />
      </YStack>
      <YStack gap={'$2'}>
        <FilterText title="Tags:" />
        <XStack gap={13} justifyContent="center">
          {tagsData.map((tag) => (
            <TagItem
              key={tag.id}
              title={tag.title}
              isActive={tags.includes(tag.title)}
              onPress={() => handlePressTag(tag.title)}
            />
          ))}
        </XStack>
      </YStack>
    </YStack>
  );
};

export default FilterScreen;
