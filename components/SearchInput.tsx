import Colors from '@/constants/Colors';
import { Heart, Navigation } from '@tamagui/lucide-icons';
import React from 'react';
import { Pressable } from 'react-native';
import { Input, InputProps, XStack } from 'tamagui';

interface SearchInputProps extends InputProps {
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  showFavorites,
  setShowFavorites,
  setSearchQuery,
  ...props
}) => {
  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    setSearchQuery('');
  };
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
        onChangeText={setSearchQuery}
        returnKeyType="search"
        returnKeyLabel="Search"
      />
      <XStack gap={10} alignItems="center">
        <Navigation size={24} color={Colors.secondary} />
        <Pressable onPress={handleShowFavorites}>
          <Heart
            size={24}
            color={Colors.secondary}
            fill={showFavorites ? Colors.secondary : 'none'}
          />
        </Pressable>
      </XStack>
    </XStack>
  );
};

export default SearchInput;
