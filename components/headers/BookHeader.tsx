import { XStack } from 'tamagui';
import CustomHeader from '../CustomHeader';
import { Pressable } from 'react-native';
import Message from '../svg/Message';
import Colors from '@/constants/Colors';
import Bell from '../svg/Bell';

const BookHeader = () => {
  return (
    <CustomHeader
      rightContent={
        <XStack alignItems="center" gap={11}>
          <Pressable>
            {({ pressed }) => (
              <Message
                fill={Colors.secondary}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
          <Pressable>
            {({ pressed }) => (
              <Bell
                fill={Colors.secondary}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </XStack>
      }
      title="Book Training"
      headerTextStyle={{ fontSize: 26, lineHeight: 32 }}
    />
  );
};

export default BookHeader;
