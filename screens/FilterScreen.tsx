import CustomSlider from '@/components/filter/CustomSlider';
import FilterHeader from '@/components/filter/FilterHeader';
import FilterText from '@/components/filter/FilterText';
import TagItem from '@/components/filter/TagItem';

import Colors from '@/constants/Colors';
import { StarFull } from '@tamagui/lucide-icons';
import React from 'react';
import { XStack, YStack } from 'tamagui';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  setTempDistance,
  setTempLevel,
  setTempRating,
  setTempTags,
} from '@/store/slices/tempFilterSlice';

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
  const dispatch = useDispatch();
  const { tempDistance, tempRating, tempLevel, tempTags } = useSelector(
    (state: RootState) => state.tempFilter
  );

  const { showMaps } = useSelector((state: RootState) => state.showMaps);

  const handlePressTag = (tag: string) => {
    if (tempTags.includes(tag)) {
      dispatch(setTempTags(tempTags.filter((t) => t !== tag)));
    } else {
      dispatch(setTempTags([...tempTags, tag]));
    }
  };

  return (
    <YStack paddingHorizontal={20} paddingTop={35} flex={1} gap={hp('3%')}>
      <YStack>
        <FilterHeader title="Clubs" containerStyles={{ marginBottom: 15 }} />
        <FilterText
          title="Distance: "
          unit="km"
          sliderValue={tempDistance}
          marginBottom={24}
        />
        <CustomSlider
          min={0}
          max={50}
          step={5}
          sliderValue={tempDistance}
          setSliderValue={(value) => dispatch(setTempDistance(value))}
        />
      </YStack>
      {!showMaps && (
        <YStack gap={hp('3%')}>
          <YStack>
            <FilterHeader
              title="Coach"
              containerStyles={{ marginBottom: 13 }}
            />
            <XStack
              alignItems="center"
              marginTop={13}
              marginBottom={24}
              gap={'$1'}>
              <FilterText title="Rating: > " sliderValue={tempRating} />
              <StarFull size={16} color={Colors.primary} />
            </XStack>
            <CustomSlider
              min={0}
              max={5}
              sliderValue={tempRating}
              setSliderValue={(value) => dispatch(setTempRating(value))}
            />
          </YStack>
          <YStack>
            <FilterText
              title="Level: "
              sliderValue={tempLevel}
              marginBottom={24}
            />
            <CustomSlider
              min={0}
              max={5}
              sliderValue={tempLevel}
              setSliderValue={(value) => dispatch(setTempLevel(value))}
            />
          </YStack>
          <YStack gap={'$2'}>
            <FilterText title="Tags:" />
            <XStack gap={13} justifyContent="center">
              {tagsData.map((tag) => (
                <TagItem
                  key={tag.id}
                  title={tag.title}
                  isActive={tempTags.includes(tag.title)}
                  onPress={() => handlePressTag(tag.title)}
                />
              ))}
            </XStack>
          </YStack>
        </YStack>
      )}
    </YStack>
  );
};

export default FilterScreen;
