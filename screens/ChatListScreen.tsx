import React, { useEffect, useState } from 'react';
import ChatBox from '@/components/chat/ChatBox';
import { YStack } from 'tamagui';

import { ActivityIndicator, ScrollView } from 'react-native';
import {
  cureentUser,
  getAllUsers,
  getGroupMembers,
  getLessonGroupChats,
} from '@/api/chat-api';
import { chatItem } from '@/types/chatItem';
import Colors from '@/constants/Colors';
import GroupChatBox from '@/components/chat/GroupChatBox';

const ChatListScreen = () => {
  const [users, setUsers] = useState<chatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<any[]>([]);
  const userId = cureentUser();

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroups = async () => {
    try {
      // Fetch lesson group chat member IDs
      const lessonGroups = await getLessonGroupChats(userId);
      if (lessonGroups.length > 0) {
        // Fetch group members
        let groupsData = await Promise.all(
          lessonGroups.map(async (lessonGroup) => {
            const members = await getGroupMembers(lessonGroup?.members);
            return {
              id: lessonGroup.lessonId,
              name: lessonGroup.trainingTitle,
              members: members,
            };
          })
        );
        // Set group state
        setGroups(groupsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUsers();
        await fetchGroups();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <YStack flex={1} paddingTop={27} paddingHorizontal={22}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.secondary} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap={16}>
            <YStack gap={16}>
              {users.map((item) => (
                <ChatBox item={item} key={item.id} />
              ))}
            </YStack>
            {groups?.map((group) => (
              <YStack gap={16} key={group.id}>
                <GroupChatBox
                  id={group.id}
                  groupName={group.name}
                  groupItem={group.members}
                />
              </YStack>
            ))}
          </YStack>
        </ScrollView>
      )}
    </YStack>
  );
};

export default ChatListScreen;
