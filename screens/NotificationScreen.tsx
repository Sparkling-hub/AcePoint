import { retrieveData } from "@/api/localStorage"
import { findOrCreateNotification } from "@/api/notification-api"
import { styles } from "@/components/ButtonStyles"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Switch, Text, XStack, YStack } from "tamagui"

export default function NotificationScreen() {

    const [message, setMessage] = useState(true)
    const [feedback, setFeedback] = useState(true)
    const [session, setSession] = useState(true)
    const [promotion, setPromotion] = useState(true)

    const handleChangeNotification = async (type: string, checked: boolean) => {
        const authMethod = await retrieveData('authMethod')
        const userType = await retrieveData('userType')
        if (authMethod === 'simple') {
            const userID = await retrieveData('userID');
            const userRef = userType === 'Player' ? doc(db, 'player', userID) : doc(db, 'coach', userID)
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data()
            console.log(userData);
            await updateDoc(userRef, {
                ...userData,
                [type]: checked
            })
        } else {
            await findOrCreateNotification(type, checked);
        }
    }
    const getNotifications = async () => {
        const userType = await retrieveData('userType')
        const userID = await retrieveData('userID');
        const userRef = userType === 'Player' ? doc(db, 'player', userID) : doc(db, 'coach', userID)
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data()
        if (userData) {
            setMessage(userData.messageNotification)
            setFeedback(userData.feedbackNotification)
            setSession(userData.sessionNotification)
            setPromotion(userData.promotionsViaEmail)
        }
    }

    useEffect(() => {
        const getInformations = async () => {
            await getNotifications()
        }
        getInformations();
    }, [])
    return (
        <YStack flex={1} style={{ paddingTop: 30, backgroundColor: 'white' }}>
            <YStack gap={50} paddingHorizontal={15} marginBottom={40}>
                <YStack>
                    <Text style={styles.header}>App notifications</Text>
                </YStack>
                <YStack>
                    <XStack gap={100}>
                        <Text style={styles.text}>Message Notifications</Text>
                        <Switch size='$2'
                            onCheckedChange={(value) => {
                                handleChangeNotification("messageNotification", value);
                                setMessage(value);
                            }}
                            checked={message}>
                            <Switch.Thumb animation="bouncy" />
                        </Switch>
                    </XStack>
                </YStack>
                <YStack>
                    <XStack gap={92}>
                        <Text style={styles.text}>Feedback Notifications</Text>
                        <Switch checked={feedback} onCheckedChange={async (value) => {
                            await handleChangeNotification("feedbackNotification", value);
                            setFeedback(value);
                        }}
                            size='$2'>
                            <Switch.Thumb animation="bouncy" />
                        </Switch>
                    </XStack>
                </YStack>
                <YStack>
                    <XStack gap={110}>
                        <Text style={styles.text}>Session Notifications</Text>
                        <Switch
                            onCheckedChange={(value) => {
                                handleChangeNotification("sessionNotification", value);
                                setSession(value);
                            }}
                            size='$2' checked={session}>
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
                        <Switch size='$2' checked={promotion}
                            onCheckedChange={(value) => {
                                handleChangeNotification("promotionsViaEmail", value);
                                setPromotion(value);
                            }}>
                            <Switch.Thumb animation="bouncy" />
                        </Switch>
                    </XStack>
                    <Text style={{ paddingLeft: 20, paddingRight: 20 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo ex, dapibus sit amet nisi ut, posuere laoreet nulla. Suspendisse dignissim elit in justo efficitur.
                    </Text>
                </YStack>
            </YStack>
        </YStack>
    )
}