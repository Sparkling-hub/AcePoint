import ClubBox from '@/components/ClubBox';
import CoachBox from '@/components/CoachBox';
import SearchInput from '@/components/SearchInput';
import { Filter } from '@tamagui/lucide-icons';
import React from 'react';
import { FlatList } from 'react-native';

import { View, YStack } from 'tamagui';
import FilterScreen from '../FilterScreen';

const clubData = [
  {
    id: '1',
    name: 'Sutton Tennis Club',
    membership: 'No',
    rating: 3,
  },
  {
    id: '2',
    name: 'Sutton Tennis Club',
    membership: 'No',
    rating: 2,
  },
  {
    id: '3',
    name: 'Sutton Tennis Club',
    membership: 'No',
    rating: 5,
  },
  {
    id: '4',
    name: 'Sutton Tennis Club',
    membership: 'No',
    rating: 3,
  },
];

const coachData = [
  {
    id: '1',
    name: 'John Doe',
    rating: 4,
    level: 3,
    age: 25,
  },
  {
    id: '2',
    name: 'John Doe',
    rating: 4,
    level: 3,
    age: 25,
  },
  {
    id: '3',
    name: 'John Doe',
    rating: 1,
    level: 3,
    age: 25,
  },
  {
    id: '4',
    name: 'John Doe',
    rating: 2,
    level: 3,
    age: 25,
  },
];

export default function BookTraining() {
  return (
    // <YStack flex={1} paddingTop={28} paddingHorizontal={16}>
    //   <SearchInput placeholder="Search for Club or Coach" />
    //   <Filter size={32} color={'#000000'} marginLeft={14} marginVertical={23} />
    //   <YStack>
    //     {/* <FlatList
    //       data={clubData}
    //       keyExtractor={(item) => item.id}
    //       ItemSeparatorComponent={() => <View height={22} />}
    //       renderItem={({ item }) => (
    //         <ClubBox
    //           name={item.name}
    //           membership={item.membership}
    //           rating={item.rating}
    //         />
    //       )}
    //     /> */}
    //     <FlatList
    //       data={coachData}
    //       keyExtractor={(item) => item.id}
    //       renderItem={({ item }) => (
    //         <CoachBox
    //           name={item.name}
    //           rating={item.rating}
    //           level={item.level}
    //           age={item.age}
    //         />
    //       )}
    //     />
    //   </YStack>
    // </YStack>
    <FilterScreen />
  );
}
