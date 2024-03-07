import BookHeader from '@/components/headers/BookHeader';
import FilterHeader from '@/components/headers/FilterHeader';

import { Stack } from 'expo-router';

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: BookHeader,
        }}
      />
      <Stack.Screen
        name="filter"
        options={{
          header: FilterHeader,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
