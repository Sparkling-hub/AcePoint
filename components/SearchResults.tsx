import { TouchableOpacity } from 'react-native';
import React from 'react';
import { ScrollView, Text, XStack, YStack } from 'tamagui';
import CoachSkeleton from '@/components/skeletons/CoachSkeleton';
import { Club } from '@/model/club';
import { Coach } from '@/model/coach';
import Colors from '@/constants/Colors';
import ClubBox from '@/components/ClubBox';
import CoachBox from '@/components/CoachBox';
import { X } from '@tamagui/lucide-icons';

interface SearchResultsProps {
  loading: boolean;
  searchQuery: string;
  searchHistory: string[];
  handlePressSearchItem: (item: string) => void;
  removeSearchHistoryItem: (item: string) => void;
  clubSearchResults: Club[];
  coachSearchResults: Coach[];
}

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
      <YStack gap={'$8'}>
        <CoachSkeleton />
        <CoachSkeleton />
        <CoachSkeleton />
        <CoachSkeleton />
      </YStack>
    );
  } else if (searchQuery.trim() === '') {
    return (
      <YStack paddingLeft={42} paddingRight={16}>
        {searchHistory?.length > 0 && (
          <YStack gap={14}>
            {searchHistory?.map((item) => (
              <XStack key={item} justifyContent="space-between">
                <TouchableOpacity onPress={() => handlePressSearchItem(item)}>
                  <Text
                    style={{ fontFamily: 'MontserratBold' }}
                    fontSize={16}
                    lineHeight={19}
                    color={Colors.secondary}>
                    {item}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeSearchHistoryItem(item)}>
                  <X size={20} color={Colors.secondary} />
                </TouchableOpacity>
              </XStack>
            ))}
          </YStack>
        )}
      </YStack>
    );
  }
  return (
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

        {coachSearchResults?.length > 0 ? (
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
        ) : clubSearchResults?.length === 0 ? (
          <Text
            style={{ fontFamily: 'MontserratMedium' }}
            textAlign="center"
            color={Colors.secondary}
            fontSize={16}>
            No club or coach found
          </Text>
        ) : null}
      </YStack>
    </ScrollView>
  );
};

export default SearchResults;
