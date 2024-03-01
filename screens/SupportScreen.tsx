import { styles } from '@/components/ButtonStyles';
import { Text, YStack, } from 'tamagui';

export default function SupportScreen() {

    return (
        <YStack flex={1} paddingTop={60}>
            <YStack gap={20} paddingHorizontal={15} marginBottom={40}>
                <YStack>
                    <Text style={styles.title}>Support</Text>
                </YStack>
                <YStack>
                    <Text style={styles.text}>Lorem ipsum</Text>
                </YStack>
                <YStack>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Curabitur leo ex, dapibus sit amet nisi ut, posuere laoreet nulla. Suspendisse
                        dignissim elit in justo efficitur.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo ex, dapibus sit amet
                        nisi ut, posuere laoreet nulla. Suspendisse dignissim elit in justo efficitur.</Text>
                </YStack>
            </YStack>
        </YStack>
    )
}