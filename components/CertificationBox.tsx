import Colors from '@/constants/Colors';
import { Text, View } from 'tamagui';

interface CertificationBoxProps {
  name: string;
  date: string;
  issued: string;
}

export default function CertificationBox(props: CertificationBoxProps) {
  const { name, date, issued } = props;
  return (
    <View
      backgroundColor={Colors.iron}
      width={'100%'}
      height={52}
      borderRadius={8}
      alignItems="flex-start"
      paddingHorizontal={32}
      paddingVertical={16}>
      <Text
        style={{ fontFamily: 'MontserratMedium' }}
        fontSize={16}
        lineHeight={20}
        color={Colors.secondary}>
        {name}, {date}, {issued}
      </Text>
    </View>
  );
}
