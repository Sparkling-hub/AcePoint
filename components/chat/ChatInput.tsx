import React from 'react';
import { Input, InputProps, XStack } from 'tamagui';
import Colors from '@/constants/Colors';
import { Send } from '@tamagui/lucide-icons';
import { TouchableOpacity } from 'react-native';

interface ChatInputProps extends InputProps {
  onSend: () => Promise<void>;
  inputRef: React.RefObject<Input>;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  inputRef,
  ...props
}) => {
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
        ref={inputRef}
        {...props}
        style={{ fontFamily: 'MontserratMedium' }}
        fontSize={14}
        lineHeight={17}
        placeholderTextColor={Colors.secondary}
        returnKeyType="send"
        returnKeyLabel="Send"
        onSubmitEditing={onSend}
      />
      <TouchableOpacity onPress={onSend}>
        <Send size={24} color={Colors.secondary} />
      </TouchableOpacity>
    </XStack>
  );
};

export default ChatInput;
