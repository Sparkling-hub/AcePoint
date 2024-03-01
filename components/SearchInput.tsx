import { Heart, Navigation } from '@tamagui/lucide-icons';
import React from 'react';
import { Input, InputProps, XStack } from 'tamagui';

interface SearchInputProps extends InputProps {
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, ...props }) => {
  return (
    <XStack
      width={'100%'}
      height={48}
      backgroundColor={'#F6F6F6'}
      borderRadius={100}
      paddingHorizontal={16}
      borderWidth={1}
      alignItems="center"
      borderColor={'#E8E8E8'}>
      <Input
        flex={1}
        unstyled
        {...props}
        style={{ fontFamily: 'Inter' }}
        fontSize={16}
        lineHeight={19}
        placeholderTextColor={'#BDBDBD'}
        onSubmitEditing={() => onSearch()}
      />
      <XStack gap={10} alignItems="center">
        <Navigation size={24} color={'#000000'} />
        <Heart size={24} color={'#000000'} />
      </XStack>
    </XStack>
  );
};

export default SearchInput;
