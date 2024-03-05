import CoachBox from '@/components/CoachBox';
import SearchInput from '@/components/SearchInput';
import { Filter, StarFull } from '@tamagui/lucide-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { ScrollView, Text, View, XStack, YStack } from 'tamagui';

import { router } from 'expo-router';
import {
  favoriteCoachList,
  findByName,
  findCoachByName,
} from '@/api/player-api';
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
import { debounce } from 'lodash';

export default function BookTraining() {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [clubSearchResults, setClubSearchResults] = useState<Club[]>([]);
  const [coachSearchResults, setCoachSearchResults] = useState<Coach[]>([]);
  const [favoriteCoaches, setFavoriteCoaches] = useState<Coach[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Function to handle search
  const handleSearch = debounce(async (query: string) => {
    const [clubResults, coachResults] = await Promise.all([
      findByName({ name: query }),
      findCoachByName({ name: query }),
    ]);

    const formattedClubResults =
      clubResults?.docs?.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      })) ?? [];

    const formattedCoachResults =
      coachResults?.docs?.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      })) ?? [];

    setClubSearchResults(formattedClubResults);
    setCoachSearchResults(formattedCoachResults);
  }, 300); // Debounce delay in milliseconds

  const dispatch = useDispatch();

  // Selecting filter values from Redux store
  const { distance, level, rating, tags } = useSelector(
    (state: RootState) => state.savedFilter
  );

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearch(searchQuery);
    } else {
      setClubSearchResults([]);
      setCoachSearchResults([]);
    }
  }, [searchQuery]);

  const loadFavoriteCoaches = async () => {
    try {
      const favorites = await favoriteCoachList(); // Call the function to get favorite coaches

      setFavoriteCoaches(favorites?.flat());
    } catch (error) {
      console.error('Error loading favorite coaches:', error);
    }
  };

  useEffect(() => {
    loadFavoriteCoaches();
  }, [showFavorites]);

  return (
    <YStack flex={1} paddingTop={28} paddingHorizontal={16}>
      {/* Search input */}
      <SearchInput
        placeholder={
          !showFavorites ? 'Search for a coach or club' : 'Favorites'
        }
        value={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowFavorites={setShowFavorites}
        showFavorites={showFavorites}
      />
      <XStack marginLeft={14} marginVertical={23} gap={9}>
        {/* Filter button */}
        <TouchableOpacity onPress={() => router.navigate('/book/filter')}>
          <Filter size={32} color={Colors.secondary} />
        </TouchableOpacity>
        {/* Filter items */}
        <XStack gap={7} flexWrap="wrap" flex={1}>
          {tags?.map((tag) => (
            <FilterItem
              title={tag}
              key={tag}
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
      {!showFavorites ? (
        <ScrollView flex={1}>
          <YStack>
            {clubSearchResults?.length > 0 && (
              <YStack>
                {clubSearchResults?.map((item) => (
                  <ClubBox
                    key={item.id}
                    name={item.name}
                    membership={'NO'}
                    rating={5}
                  />
                ))}
              </YStack>
            )}

            {coachSearchResults?.length > 0 && (
              <YStack>
                {clubSearchResults?.length > 0 && (
                  <Text
                    style={{ fontFamily: 'MontserratBold' }}
                    fontSize={16}
                    marginVertical={16}
                    lineHeight={19}
                    color={Colors.secondary}>
                    Coaches
                  </Text>
                )}

                {coachSearchResults?.map((item) => (
                  <CoachBox
                    key={item.id}
                    coachRef={item.id}
                    name={item.displayName}
                    rating={5}
                    level={2}
                    age={42}
                    image={item.image}
                    followedPlayer={item.followedPlayer}
                  />
                ))}
              </YStack>
            )}

            {clubSearchResults?.length === 0 &&
              coachSearchResults?.length === 0 &&
              searchQuery.trim() !== '' && (
                <Text
                  style={{ fontFamily: 'MontserratBold' }}
                  color={Colors.secondary}
                  fontSize={16}>
                  No Data
                </Text>
              )}
          </YStack>
        </ScrollView>
      ) : (
        // Display favorite coaches
        <FlatList
          data={favoriteCoaches}
          renderItem={({ item }) => (
            <CoachBox
              coachRef={item.id}
              name={item.displayName}
              rating={5}
              level={2}
              age={42}
              image={item.image}
              followedPlayer={item.followedPlayer}
            />
          )}
        />
      )}
    </YStack>
  );
}

const Spacer = ({ height = 16 }) => <View style={{ height }} />;
