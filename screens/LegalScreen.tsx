import { Text, YStack, } from 'tamagui';
import { styles } from '@/components/frontend/ButtonStyles';

export default function LegalScreen() {

    return (
        <YStack flex={1} paddingTop={60}>
            <YStack gap={20} paddingHorizontal={15} marginBottom={40}>
                <YStack>
                    <Text style={{ ...styles.text, marginBottom: 0 }}>Privacy Policy</Text>
                </YStack>
                <YStack>
                    <Text style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Curabitur leo ex, dapibus sit amet nisi ut, posuere laoreet nulla. Suspendisse
                        dignissim elit in justo efficitur.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo ex, dapibus sit amet
                        nisi ut, posuere laoreet nulla. Suspendisse dignissim elit in justo efficitur.</Text>
                </YStack>
            </YStack>
        </YStack>
    )
}