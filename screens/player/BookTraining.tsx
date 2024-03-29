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

import { setClubSearchResults } from '@/store/slices/clubSearchResultsSlice';
import { setCoachSearchResults } from '@/store/slices/coachSearchResultsSlice';
import { useFilter } from '@/hooks/useFilter';
import NearbyClubsMap from './NearbyClubsMap';

export default function BookTraining() {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteCoaches, setFavoriteCoaches] = useState<Coach[]>([]);
  const [filteredFavoriteCoaches, setFilteredFavoriteCoaches] = useState<
    Coach[]
  >([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searching, setSearching] = useState(false);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  // Selecting values from Redux store
  const { distance, level, rating, tags } = useSelector(
    (state: RootState) => state.savedFilter
  );
  const { showMaps } = useSelector((state: RootState) => state.showMaps);
  const { showFavorites } = useSelector(
    (state: RootState) => state.showFavorites
  );
  const { filterIsLoading } = useSelector(
    (state: RootState) => state.filterIsLoading
  );

  const currentUser = auth.currentUser;

  const dispatch = useDispatch();

  const { performFilter } = useFilter();

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
        dispatch(setClubSearchResults(clubResults));
        dispatch(setCoachSearchResults(coachResults));
      } catch (error) {
        console.error('Error searching:', error);
        // Handle error, show error message, etc.
      } finally {
        setSearching(false);
      }
    } else {
      dispatch(setClubSearchResults([]));
      dispatch(setCoachSearchResults([]));
    }
  };

  // Function to handle search with debounce
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      performSearch(query);
    }, 475),
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

  // Function to load favorite coaches
  const loadFavoriteCoaches = async () => {
    try {
      setLoadingFavorites(true);
      const favorites = await favoriteCoachList();
      if (favorites.length > 0) {
        setFavoriteCoaches(favorites);
        setFilteredFavoriteCoaches(favorites);
      } else {
        setFavoriteCoaches([]);
        setFilteredFavoriteCoaches([]);
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
      setFilteredFavoriteCoaches([]);
    }
  }, [showFavorites]);

  const searchFavoriteCoaches = (query: string) => {
    setSearchQuery(query);
    if (query !== '') {
      const filteredCoaches = favoriteCoaches.filter((coach) =>
        coach.displayName?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFavoriteCoaches(filteredCoaches);
    } else {
      setFilteredFavoriteCoaches(favoriteCoaches);
    }
  };

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

  const handleOnSubmitEditing = () => {
    if (!showFavorites) {
      addToSearchHistory(searchQuery);
    }
  };

  const renderView = () => {
    if (showMaps) {
      return <NearbyClubsMap />;
    }

    if (showFavorites) {
      return (
        <FavoriteCoaches
          favoriteCoaches={filteredFavoriteCoaches}
          loading={loadingFavorites}
        />
      );
    }

    return (
      <SearchResults
        searchQuery={searchQuery}
        loading={searching}
        searchHistory={searchHistory}
        handlePressSearchItem={handlePressSearchItem}
        removeSearchHistoryItem={removeSearchHistoryItem}
      />
    );
  };

  return (
    <YStack flex={1} paddingTop={28}>
      <YStack paddingHorizontal={16}>
        {/* Search input */}
        <SearchInput
          placeholder={
            !showFavorites ? 'Search for a coach or club' : 'Favorites'
          }
          value={searchQuery}
          onChangeText={showFavorites ? searchFavoriteCoaches : handleSearch}
          setSearchQuery={setSearchQuery}
          onSubmitEditing={handleOnSubmitEditing}
          disabled={filterIsLoading || showMaps}
        />
        <XStack marginLeft={14} marginVertical={23} gap={9}>
          {/* Filter button */}
          <TouchableOpacity
            onPress={() => router.navigate('/book/filter')}
            disabled={filterIsLoading}>
            <Filter size={28} color={Colors.secondary} />
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
                  performFilter(
                    distance[0],
                    rating[0],
                    level[0],
                    tags.filter((t) => t !== tag)
                  );
                }}
              />
            ))}
            {distance[0] !== 0 && (
              <FilterItem
                title={`${distance}km`}
                onPress={() => {
                  dispatch(setDistance([0]));
                  dispatch(setTempDistance([0]));
                  performFilter(0, rating[0], level[0], tags);
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
                  performFilter(distance[0], 0, level[0], tags);
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
                  performFilter(distance[0], rating[0], 0, tags);
                }}
              />
            )}
          </XStack>
        </XStack>
      </YStack>
      {renderView()}
    </YStack>
  );
}
