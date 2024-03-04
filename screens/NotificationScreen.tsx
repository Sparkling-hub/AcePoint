import { retrieveData } from "@/api/localStorage"
import { findOrCreateNotification } from "@/api/notification-api"
import { styles } from "@/components/ButtonStyles"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Switch, Text, XStack, YStack } from "tamagui"

export default function NotificationScreen() {

    const [message, setMessage] = useState(false)
    const [feedback, setFeedback] = useState(false)
    const [session, setSession] = useState(false)
    const [promotion, setPromotion] = useState(false)



    const handleChangeNotification = async (type: string, checked: boolean) => {
        await findOrCreateNotification(type, checked);
    }
    const getNotifications = async () => {
        const email = await retrieveData('email')
        const userType = await retrieveData('userType')
        const userCollection = userType === 'Player' ? collection(db, 'player') : collection(db, 'coach')
        const notificationQuery = query(userCollection, where('email', '==', email))
        const result = await getDocs(notificationQuery)
        result.docs.forEach(doc => {
            setMessage(doc.data().messageNotification)
            setFeedback(doc.data().feedbackNotification)
            setSession(doc.data().sessionNotification)
            setPromotion(doc.data().promotionsViaEmail)
        })
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