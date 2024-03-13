import Colors from '@/constants/Colors';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'tamagui';

interface TagItemProps {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
}

const TagItem: React.FC<TagItemProps> = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        alignItems="center"
        justifyContent="center"
        paddingHorizontal={20}
        borderRadius={8}
        height={28}
        marginVertical={12}
        borderWidth={1}
        borderColor={Colors.secondary}
        backgroundColor={isActive ? Colors.secondary : 'white'}>
        <Text
          style={{ fontFamily: 'MontserratSemiBold' }}
          fontSize={16}
          lineHeight={19}
          color={isActive ? 'white' : Colors.secondary}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TagItem;
