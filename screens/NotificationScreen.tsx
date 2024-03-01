import { styles } from "@/components/ButtonStyles"
import Colors from "@/constants/Colors"
import { Switch, Text, XStack, YStack } from "tamagui"

export default function NotificationScreen() {
    return (
        <YStack flex={1} style={{ paddingTop: 30, backgroundColor: 'white' }}>
            <YStack gap={50} paddingHorizontal={15} marginBottom={40}>
                <YStack>
                    <Text style={styles.title}>Notifications</Text>
                </YStack>
                <YStack>
                    <Text style={styles.header}>App notifications</Text>
                </YStack>
                <YStack>
                    <XStack gap={100}>
                        <Text style={styles.text}>Message Notifications</Text>
                        <Switch size='$2' defaultChecked={false}>
                            <Switch.Thumb animation="bouncy" />
                        </Switch>
                    </XStack>
                </YStack>
                <YStack>
                    <XStack gap={92}>
                        <Text style={styles.text}>Feedback Notifications</Text>
                        <Switch size='$2' defaultChecked={false}>
                            <Switch.Thumb animation="bouncy" />
                        </Switch>
                    </XStack>
                </YStack>
                <YStack>
                    <XStack gap={110}>
                        <Text style={styles.text}>Session Notifications</Text>
                        <Switch size='$2' defaultChecked={false}>
                            <Switch.Thumb animation="bouncy" />
                        </Switch>
                    </XStack>
                </YStack>
                <YStack>
                    <Text style={styles.header}>Promotions</Text>
                </YStack>
                <YStack>
                    <XStack gap={110}>
                        <Text style={styles.text}>Promotions via email</Text>
                        <Switch size='$2' defaultChecked={false}>
                            <Switch.Thumb animation="bouncy" />
                        </Switch>
                    </XStack>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo ex, dapibus sit amet nisi ut, posuere laoreet nulla. Suspendisse dignissim elit in justo efficitur.
                    </Text>
                </YStack>
            </YStack>
        </YStack>
    )
}