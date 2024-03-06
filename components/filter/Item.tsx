import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'tamagui';

interface ItemProps {
  value: number;
  isMiddleValue?: boolean;
}

const Item: React.FC<ItemProps> = ({ value, isMiddleValue = false }) => {
  return (
    <View alignItems="center" marginTop={18}>
      <View style={styles.border} />
      <Text
        style={{ fontFamily: 'MontserratMedium' }}
        fontSize={16}
        lineHeight={19}
        color={Colors.secondary}>
        {!isMiddleValue && value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    width: 8,
    height: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.secondary,
    transform: [{ rotate: '-90deg' }],
    marginBottom: 7,
  },
});

export default Item;
