import { FlatList, Platform } from 'react-native';
import { Text, YStack, Paragraph, XStack } from 'tamagui';

import PorfileCard from '@/components/frontend/ProfileCard';
import Colors from '@/constants/Colors';
import CertificationBox from '@/components/frontend/CertificationBox';
import CheckMark from '@/components/frontend/svg/CheckMark';

const CertificationData = [
  {
    id: '1',
    name: 'Name',
    issued: 'Issued',
    date: 'Date',
  },
  {
    id: '2',
    name: 'Name',
    issued: 'Issued',
    date: 'Date',
  },
  {
    id: '3',
    name: 'Name',
    issued: 'Issued',
    date: 'Date',
  },
  {
    id: '4',
    name: 'Name',
    issued: 'Issued',
    date: 'Date',
  },
  // Add more objects as needed following the same structure
];

export default function CoachProfile() {
  return (
    <YStack
      flex={1}
      paddingTop={Platform.OS === 'ios' ? 90 : 70}
      paddingHorizontal={16}>
      <YStack justifyContent="center" alignItems="center">
        <PorfileCard rating={5.7}>
          <YStack gap={'$2'}>
            <YStack justifyContent="center" alignItems="center">
              <XStack alignItems="center">
                <Text
                  style={{ fontFamily: 'MontserratBold' }}
                  color={Colors.secondary}
                  fontSize={20}
                  lineHeight={24}
                  marginRight={8}
                  textAlign="center"
                  marginTop={10}>
                  Daniel Antone
                </Text>
                <CheckMark style={{ marginTop: 8 }} />
              </XStack>
              <Text
                style={{ fontFamily: 'MontserratSemiBold' }}
                fontSize={14}
                lineHeight={17}
                marginRight={8}
                textAlign="center"
                color={Colors.secondary}>
                Club Name
              </Text>
            </YStack>
            <YStack paddingHorizontal={10}>
              <Paragraph
                style={{ fontFamily: 'Montserrat' }}
                color={Colors.secondary}
                fontSize={12}
                lineHeight={14}
                textAlign="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex
                dui, tempor ut libero ac, dictum molestie dolor. Morbi
                ullamcorper convallis nulla et semper.
              </Paragraph>
            </YStack>
          </YStack>
        </PorfileCard>
      </YStack>

      <YStack flex={1} gap={'$4'}>
        <Text
          style={{ fontFamily: 'MontserratBold' }}
          textAlign="center"
          fontSize={16}
          color={Colors.secondary}
          lineHeight={19}>
          Certifications
        </Text>
        <YStack>
          <FlatList
            data={CertificationData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CertificationBox
                name={item.name}
                date={item.date}
                issued={item.issued}
              />
            )}
          />
        </YStack>
      </YStack>
    </YStack>
  );
}
