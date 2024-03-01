import CoachBox from '@/components/CoachBox';
import SearchInput from '@/components/SearchInput';
import { Filter } from '@tamagui/lucide-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { Text, View, YStack } from 'tamagui';

import { router } from 'expo-router';
import { findByName, findCoachByName } from '@/api/player-api';
import { Coach } from '@/model/coach';
import ClubBox from '@/components/ClubBox';
import { Club } from '@/model/club';

export default function BookTraining() {
  const [searchQuery, setSearchQuery] = useState('');
  const [clubSearchResults, setClubSearchResults] = useState<Club[]>([]);
  const [coachSearchResults, setCoachSearchResults] = useState<Coach[]>([]);
  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      let clubResults;
      let coachResults;
      if (searchQuery.trim() !== '') {
        clubResults = await findByName({ name: searchQuery });
        coachResults = await findCoachByName({ name: searchQuery });
      }

      setClubSearchResults(clubResults?.docs?.map((doc: any) => doc.data()));
      setCoachSearchResults(coachResults?.docs?.map((doc: any) => doc.data()));
    } else {
      setClubSearchResults([]);
      setCoachSearchResults([]);
    }
  };

  useEffect(() => {
    console.log('clubs:', clubSearchResults);
    console.log('coaches:', coachSearchResults);
  }, [clubSearchResults, coachSearchResults]);
  return (
    <YStack flex={1} paddingTop={28} paddingHorizontal={16}>
      <SearchInput
        placeholder="Search for Club or Coach"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />
      <TouchableOpacity
        style={{ marginLeft: 14, marginVertical: 23 }}
        onPress={() => router.navigate('/book/filter')}>
        <Filter size={32} color={'#000000'} />
      </TouchableOpacity>

      <YStack>
        {clubSearchResults?.length > 0 && (
          <FlatList
            data={clubSearchResults}
            ItemSeparatorComponent={() => <View height={22} />}
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

        {!clubSearchResults && !coachSearchResults && searchQuery !== '' && (
          <Text>No Data</Text>
        )}
      </YStack>
    </YStack>
  );
}
