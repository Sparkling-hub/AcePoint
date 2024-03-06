import CoachBox from '@/components/CoachBox';
import SearchInput from '@/components/SearchInput';
import { Filter, StarFull, X } from '@tamagui/lucide-icons';
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

import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '@/lib/firebase';

export default function BookTraining() {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [clubSearchResults, setClubSearchResults] = useState<Club[]>([]);
  const [coachSearchResults, setCoachSearchResults] = useState<Coach[]>([]);
  const [favoriteCoaches, setFavoriteCoaches] = useState<Coach[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const currentUser = auth.currentUser;

  // Function to add search query to search history
  const addToSearchHistory = async (query: string) => {
    try {
      if (currentUser) {
        let historyString = await AsyncStorage.getItem(
          `searchHistory_${currentUser.uid}`
        );
        let history = [];

        if (historyString) {
          history = JSON.parse(historyString);
          // Check if the searchQuery already exists in the history
          if (!history.includes(query)) {
            history = [query, ...history.slice(0, 4)]; // Limit search history to 5 items
          }
        } else {
          history = [query];
        }

        await AsyncStorage.setItem(
          `searchHistory_${currentUser.uid}`,
          JSON.stringify(history)
        );
      }
    } catch (error) {
      console.error('Error adding to search history:', error);
    }
  };

  // Function to handle search
  const handleSearch = async (query: string) => {
    if (query.trim() !== '') {
      const [clubResults, coachResults] = await Promise.all([
        findByName({ name: query }),
        findCoachByName({ name: query }),
      ]);

      const formattedCoachResults =
        coachResults?.docs?.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        })) ?? [];

      const formattedClubResults =
        clubResults?.docs?.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        })) ?? [];

      setClubSearchResults(formattedClubResults);
      setCoachSearchResults(formattedCoachResults);
      setSubmitted(true);
      await addToSearchHistory(query);
    } else {
      setClubSearchResults([]);
      setCoachSearchResults([]);
    }
  };

  // Function to load search history from AsyncStorage for the current user
  const fetchSearchHistory = async () => {
    try {
      if (currentUser) {
        const historyString = await AsyncStorage.getItem(
          `searchHistory_${currentUser.uid}`
        );
        if (historyString) {
          return JSON.parse(historyString);
        }
        return [];
      }
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
    return [];
  };

  // Load and filter search history based on the current search query
  const loadSearchHistory = async () => {
    const history = await fetchSearchHistory();
    const filteredHistory = history.filter((item: any) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchHistory(filteredHistory);
  };

  useEffect(() => {
    loadSearchHistory();
    // Reset the submitted state to false when searchQuery changes
    if (submitted) {
      setSubmitted(false);
    }
    if (searchQuery.trim() === '') {
      setClubSearchResults([]);
      setCoachSearchResults([]);
    }
  }, [searchQuery]);

  const dispatch = useDispatch();

  // Selecting filter values from Redux store
  const { distance, level, rating, tags } = useSelector(
    (state: RootState) => state.savedFilter
  );

  // Function to load favorite coaches
  const loadFavoriteCoaches = async () => {
    try {
      const favorites = await favoriteCoachList(); // Call the function to get favorite coaches
      if (favorites) {
        setFavoriteCoaches(favorites[0]);
      }
    } catch (error) {
      console.error('Error loading favorite coaches:', error);
    }
  };

  useEffect(() => {
    loadFavoriteCoaches();
  }, [showFavorites]);

  // Function to remove search history item
  const removeSearchHistoryItem = async (itemToRemove: string) => {
    try {
      if (currentUser) {
        let historyString = await AsyncStorage.getItem(
          `searchHistory_${currentUser.uid}`
        );
        let history = [];

        if (historyString) {
          history = JSON.parse(historyString);
          const updatedHistory = history.filter(
            (item: any) => item !== itemToRemove
          );
          await AsyncStorage.setItem(
            `searchHistory_${currentUser.uid}`,
            JSON.stringify(updatedHistory)
          );

          const filteredHistory = updatedHistory.filter((item: any) =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
          );

          setSearchHistory(filteredHistory);
        }
      }
    } catch (error) {
      console.error('Error removing search history item:', error);
    }
  };

  const handlePressSearchItem = async (item: string) => {
    setSearchQuery(item);
    await handleSearch(item);
  };

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
        onSearch={handleSearch}
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
          {!submitted && searchQuery.trim() !== '' ? (
            <YStack paddingLeft={42} paddingRight={16}>
              {searchHistory?.length > 0 && (
                <YStack gap={14}>
                  {searchHistory?.map((item, index) => (
                    <XStack justifyContent="space-between">
                      <TouchableOpacity
                        onPress={() => handlePressSearchItem(item)}>
                        <Text
                          style={{ fontFamily: 'MontserratBold' }}
                          fontSize={16}
                          lineHeight={19}
                          color={Colors.secondary}
                          key={index}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => removeSearchHistoryItem(item)}>
                        <X size={20} color={Colors.secondary} />
                      </TouchableOpacity>
                    </XStack>
                  ))}
                </YStack>
              )}
            </YStack>
          ) : (
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
          )}
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
