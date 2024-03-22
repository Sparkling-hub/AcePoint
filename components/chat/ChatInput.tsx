import React from 'react';
import { Input, InputProps, XStack } from 'tamagui';
import Colors from '@/constants/Colors';
import { Send } from '@tamagui/lucide-icons';

interface ChatInputProps extends InputProps {
  onSend?: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, ...props }) => {
  return (
    <XStack
      height={44}
      backgroundColor={'#FFFFFF'}
      borderWidth={1}
      borderRadius={10}
      paddingHorizontal={16}
      alignItems="center"
      justifyContent="space-between"
      borderColor={Colors.secondary}>
      <Input
        flex={1}
        unstyled
        {...props}
        style={{ fontFamily: 'MontserratMedium' }}
        fontSize={14}
        lineHeight={17}
        placeholderTextColor={Colors.secondary}
        returnKeyType="send"
        returnKeyLabel="Send"
        onSubmitEditing={(e) => {
          if (onSend) {
            onSend(e.nativeEvent.text);
          }
        }}
      />
      <Send size={24} color={Colors.secondary} />
    </XStack>
  );
};

export default ChatInput;
