import ChatsHeader from '@/components/headers/ChatsHeader';
import ProfileHeader from '@/components/headers/ProfileHeader';

import { Stack } from 'expo-router';

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: ProfileHeader,
        }}
      />
      <Stack.Screen
        name="chats"
        options={{
          header: ChatsHeader,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
