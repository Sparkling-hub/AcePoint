import SearchInput from '@/components/SearchInput';
import { Filter, StarFull } from '@tamagui/lucide-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { XStack, YStack } from 'tamagui';

import { router } from 'expo-router';
import {
  favoriteCoachList,
  findByName,
  findCoachByName,
} from '@/api/player-api';
import { Coach } from '@/model/coach';

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

import { debounce } from 'lodash';
import SearchResults from '@/components/SearchResults';
import FavoriteCoaches from '@/components/FavoriteCoaches';

export default function BookTraining() {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [clubSearchResults, setClubSearchResults] = useState<Club[]>([]);
  const [coachSearchResults, setCoachSearchResults] = useState<Coach[]>([]);
  const [favoriteCoaches, setFavoriteCoaches] = useState<Coach[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searching, setSearching] = useState(false);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  const currentUser = auth.currentUser;

  // Function to add search query to search history
  const addToSearchHistory = useCallback(
    async (query: string) => {
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
              history = [query, ...history];
            }
          } else {
            history = [query];
          }

          await AsyncStorage.setItem(
            `searchHistory_${currentUser.uid}`,
            JSON.stringify(history)
          );
          setSearchHistory(history.slice(0, 5));
        }
      } catch (error) {
        console.error('Error adding to search history:', error);
      }
    },
    [currentUser]
  );

  // Function to perform the search
  const performSearch = async (query: string) => {
    if (query.trim() !== '') {
      setSearching(true);
      try {
        const [clubResults, coachResults] = await Promise.all([
          findByName({ name: query }),
          findCoachByName({ name: query }),
        ]);
        setClubSearchResults(clubResults);
        setCoachSearchResults(coachResults);
      } catch (error) {
        console.error('Error searching:', error);
        // Handle error, show error message, etc.
      } finally {
        setSearching(false);
      }
    } else {
      setClubSearchResults([]);
      setCoachSearchResults([]);
    }
  };

  // Function to handle search with debounce
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      performSearch(query);
    }, 400),
    []
  );

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      debouncedSearch(query);
    },
    [debouncedSearch]
  );

  // Function to load search history from AsyncStorage for the current user
  const fetchSearchHistory = useCallback(async () => {
    try {
      if (currentUser) {
        const historyString = await AsyncStorage.getItem(
          `searchHistory_${currentUser.uid}`
        );
        if (historyString) {
          const history = JSON.parse(historyString);
          // Return only the last 5 items from the search history
          return history.slice(0, 5);
        }
        return [];
      }
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
    return [];
  }, [currentUser]);

  useEffect(() => {
    const loadSearchHistory = async () => {
      const history = await fetchSearchHistory();
      setSearchHistory(history);
    };

    loadSearchHistory();
  }, [fetchSearchHistory]);

  const dispatch = useDispatch();

  // Selecting filter values from Redux store
  const { distance, level, rating, tags } = useSelector(
    (state: RootState) => state.savedFilter
  );

  // Function to load favorite coaches
  const loadFavoriteCoaches = async () => {
    try {
      setLoadingFavorites(true);
      const favorites = await favoriteCoachList();
      if (favorites.length > 0) {
        setFavoriteCoaches(favorites);
      } else {
        setFavoriteCoaches([]);
      }
    } catch (error) {
      console.error('Error loading favorite coaches:', error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    if (showFavorites) {
      loadFavoriteCoaches();
    } else {
      setFavoriteCoaches([]);
    }
  }, [showFavorites]);

  // Function to remove search history item
  const removeSearchHistoryItem = useCallback(
    async (itemToRemove: string) => {
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
            setSearchHistory(updatedHistory.slice(0, 5));
          }
        }
      } catch (error) {
        console.error('Error removing search history item:', error);
      }
    },
    [currentUser]
  );

  const handlePressSearchItem = useCallback(
    (item: string) => {
      setSearchQuery(item);
      performSearch(item);
    },
    [performSearch]
  );

  return (
    <YStack flex={1} paddingTop={28} paddingHorizontal={16}>
      {/* Search input */}
      <SearchInput
        placeholder={
          !showFavorites ? 'Search for a coach or club' : 'Favorites'
        }
        value={searchQuery}
        onChangeText={handleSearch}
        setSearchQuery={setSearchQuery}
        setShowFavorites={setShowFavorites}
        showFavorites={showFavorites}
        onSubmitEditing={() => addToSearchHistory(searchQuery)}
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

      {!showFavorites ? (
        <SearchResults
          searchQuery={searchQuery}
          loading={searching}
          searchHistory={searchHistory}
          handlePressSearchItem={handlePressSearchItem}
          removeSearchHistoryItem={removeSearchHistoryItem}
          clubSearchResults={clubSearchResults}
          coachSearchResults={coachSearchResults}
        />
      ) : (
        <FavoriteCoaches
          favoriteCoaches={favoriteCoaches}
          loading={loadingFavorites}
        />
      )}
    </YStack>
  );
}
