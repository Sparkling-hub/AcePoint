import React from 'react';
import { ScrollView, Text, View, YStack } from 'tamagui';
import CoachSkeleton from '@/components/skeletons/CoachSkeleton';
import { Club } from '@/model/club';
import { Coach } from '@/model/coach';
import Colors from '@/constants/Colors';
import ClubBox from '@/components/ClubBox';
import CoachBox from '@/components/CoachBox';

import SearchHistoryItem from './SearchHistoryItem';
import { FlatList } from 'react-native';

interface SearchResultsProps {
  loading: boolean;
  searchQuery: string;
  searchHistory: string[];
  handlePressSearchItem: (item: string) => void;
  removeSearchHistoryItem: (item: string) => void;
  clubSearchResults: Club[];
  coachSearchResults: Coach[];
}

const Spacer = ({ height = 14 }) => <View style={{ height }} />;

const SearchResults: React.FC<SearchResultsProps> = ({
  loading,
  searchQuery,
  searchHistory,
  handlePressSearchItem,
  removeSearchHistoryItem,
  clubSearchResults,
  coachSearchResults,
}) => {
  if (loading) {
    return (
      <YStack gap={'$8'} paddingHorizontal={16}>
        <CoachSkeleton />
        <CoachSkeleton />
        <CoachSkeleton />
        <CoachSkeleton />
      </YStack>
    );
  } else if (searchQuery.trim() === '') {
    return (
      <YStack paddingLeft={58} paddingRight={32}>
        {searchHistory?.length > 0 && (
          <FlatList
            data={searchHistory}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={Spacer}
            renderItem={({ item }) => (
              <SearchHistoryItem
                item={item}
                handlePressSearchItem={handlePressSearchItem}
                removeSearchHistoryItem={removeSearchHistoryItem}
              />
            )}
          />
        )}
      </YStack>
    );
  }
  return (
    <ScrollView flex={1} paddingHorizontal={16}>
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
                rating={item.rating}
                level={item.level}
                age={42}
                image={item.image}
                followedPlayer={item.followedPlayer}
              />
            ))}
          </YStack>
        )}

        {clubSearchResults?.length === 0 &&
          coachSearchResults?.length === 0 && (
            <Text
              style={{ fontFamily: 'MontserratMedium' }}
              textAlign="center"
              color={Colors.secondary}
              fontSize={16}>
              No club or coach found
            </Text>
          )}
      </YStack>
    </ScrollView>
  );
};

export default SearchResults;
