import { retrieveData } from "@/api/localStorage"
import { findOrCreateNotification } from "@/api/notification-api"
import { styles } from "@/components/ButtonStyles"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Switch, Text, XStack, YStack } from "tamagui"

export default function NotificationScreen() {

    const [userId, setUserId] = useState('')
    const [message, setMessage] = useState(false)
    const [feedback, setFeedback] = useState(false)
    const [session, setSession] = useState(false)


    const handleChangeNotification = async (type: string, checked: boolean) => {
        await findOrCreateNotification(userId, type, checked);
    }
    const getNotifications = async () => {
        const userTYpe = await retrieveData('userType')
        const notifCollection = collection(db, 'notification')
        const id = await retrieveData("userID")
        if (userTYpe === 'Player') {
            const resultMessage = await getDocs(query(notifCollection, where('type', '==', 'Message'), where('playerId', '==', id)))
            const resultfeedback = await getDocs(query(notifCollection, where('type', '==', 'Feedback'), where('playerId', '==', id)))
            const resultSession = await getDocs(query(notifCollection, where('type', '==', 'Session'), where('playerId', '==', id)))
            if (!resultfeedback.empty) setFeedback(true)
            if (!resultMessage.empty) setMessage(true)
            if (!resultSession.empty) setSession(true)
        }
        if (userTYpe === 'Coach') {
            const resultMessage = await getDocs(query(notifCollection, where('type', '==', 'Message'), where('coachId', '==', id)))
            const resultfeedback = await getDocs(query(notifCollection, where('type', '==', 'Feedback'), where('coachId', '==', id)))
            const resultSession = await getDocs(query(notifCollection, where('type', '==', 'Session'), where('coachId', '==', id)))
            if (!resultfeedback.empty) setFeedback(true)
            if (!resultMessage.empty) setMessage(true)
            if (!resultSession.empty) setSession(true)
        }
    }

    useEffect(() => {
        const getInformations = async () => {
            const id = await retrieveData("userID")
            if (id) {
                setUserId(id)
                await getNotifications()
            }
        }
        getInformations();
    }, [])
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
                        <Switch size='$2'
                            onCheckedChange={(value) => {
                                handleChangeNotification("Message", value);
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
                            await handleChangeNotification("Feedback", value);
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
                                handleChangeNotification("Session", value);
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