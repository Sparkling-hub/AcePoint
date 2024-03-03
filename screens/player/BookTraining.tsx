import CoachBox from '@/components/CoachBox';
import SearchInput from '@/components/SearchInput';
import { Filter, StarFull } from '@tamagui/lucide-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { Text, View, XStack, YStack } from 'tamagui';

import { router } from 'expo-router';
import { findByName, findCoachByName } from '@/api/player-api';
import { Coach } from '@/model/coach';
import ClubBox from '@/components/ClubBox';
import { Club } from '@/model/club';
import Colors from '@/constants/Colors';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import FilterItem from '@/components/filter/FilterItem';
import Level from '@/components/svg/Level';
import {
  setDistance,
  setLevel,
  setRating,
  setTags,
} from '@/store/slices/savedFilterSlice';
import {
  setTempDistance,
  setTempLevel,
  setTempRating,
  setTempTags,
} from '@/store/slices/tempFilterSlice';

export default function BookTraining() {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [clubSearchResults, setClubSearchResults] = useState<Club[]>([]);
  const [coachSearchResults, setCoachSearchResults] = useState<Coach[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Function to handle search
  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      const [clubResults, coachResults] = await Promise.all([
        findByName({ name: searchQuery }),
        findCoachByName({ name: searchQuery }),
      ]);
      setClubSearchResults(
        clubResults?.docs?.map((doc: any) => doc.data()) ?? []
      );
      setCoachSearchResults(
        coachResults?.docs?.map((doc: any) => doc.data()) ?? []
      );
      setSubmitted(true);
    } else {
      setClubSearchResults([]);
      setCoachSearchResults([]);
    }
  };

  const dispatch = useDispatch();

  // Selecting filter values from Redux store
  const { distance, level, rating, tags } = useSelector(
    (state: RootState) => state.savedFilter
  );

  useEffect(() => {
    // Reset the submitted state to false when searchQuery changes
    setSubmitted(false);
  }, [searchQuery]);

  return (
    <YStack flex={1} paddingTop={28} paddingHorizontal={16}>
      {/* Search input */}
      <SearchInput
        placeholder="Search for Club or Coach"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />
      <XStack marginLeft={14} marginVertical={23} gap={9}>
        {/* Filter button */}
        <TouchableOpacity onPress={() => router.navigate('/book/filter')}>
          <Filter size={32} color={'#000000'} />
        </TouchableOpacity>
        {/* Filter items */}
        <XStack gap={7} flexWrap="wrap" flex={1}>
          {tags?.map((tag, index) => (
            <FilterItem
              title={tag}
              key={index}
              onPress={() => {
                dispatch(setTags(tags.filter((t) => t !== tag)));
                dispatch(setTempTags(tags.filter((t) => t !== tag)));
              }}
            />
          ))}
          {distance[0] !== 0 && (
            <FilterItem
              title={`${distance}km`}
              onPress={() => {
                dispatch(setDistance([0]));
                dispatch(setTempDistance([0]));
              }}
            />
          )}
          {rating[0] !== 0 && (
            <FilterItem
              leftIcon={<StarFull size={15} color={'white'} />}
              title={`${rating}`}
              onPress={() => {
                dispatch(setRating([0]));
                dispatch(setTempRating([0]));
              }}
            />
          )}
          {level[0] !== 0 && (
            <FilterItem
              leftIcon={<Level />}
              title={`${level}`}
              onPress={() => {
                dispatch(setLevel([0]));
                dispatch(setTempLevel([0]));
              }}
            />
          )}
        </XStack>
      </XStack>

      {/* Search results */}
      <YStack>
        {clubSearchResults?.length > 0 && (
          <FlatList
            data={clubSearchResults}
            ItemSeparatorComponent={Spacer}
            renderItem={({ item }) => (
              <ClubBox name={item.name} membership={'NO'} rating={5} />
            )}
          />
        )}

        {coachSearchResults?.length > 0 && (
          <FlatList
            data={coachSearchResults}
            renderItem={({ item }) => (
              <CoachBox
                name={item.displayName}
                rating={5}
                level={2}
                age={42}
                image={item.image}
              />
            )}
          />
        )}

        {clubSearchResults?.length === 0 &&
          coachSearchResults?.length === 0 &&
          searchQuery.trim() !== '' &&
          submitted && (
            <Text
              style={{ fontFamily: 'MontserratBold' }}
              color={Colors.secondary}
              fontSize={16}>
              No Data
            </Text>
          )}
      </YStack>
    </YStack>
  );
}

const Spacer = ({ height = 22 }) => <View style={{ height }} />;
