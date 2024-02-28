import { Button, Text, YStack, AlertDialog, XStack, } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/CustomButton';
import { handleDeleteAccount } from '@/services/user';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useState } from 'react';
import { styles } from '@/components/ButtonStyles';
import { router } from 'expo-router';

export default function SettingsScreen() {

    const userRole = useSelector((state: RootState) => state.userRole);
    const userRoleValue = userRole.userRole;
    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(!show);
    }

    return (
        <YStack flex={1} paddingTop={60}>
            <YStack gap={20} paddingHorizontal={15} marginBottom={40}>
                <YStack>
                    <YStack gap={15}>
                        <Text style={styles.title}>Settings</Text>
                        <CustomButton
                            title="Notifications"
                            onPress={() => { }
                            }
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                            icon={<ChevronRight size="$2" color={Colors.secondary} />}
                        />
                        <CustomButton
                            title="Security"
                            onPress={() => { router.push('/user/security') }}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                            icon={<ChevronRight size="$2" color={Colors.secondary} />}
                        />
                    </YStack>
                </YStack>
                <YStack marginTop={30}>
                    <Text style={styles.text}>Danger zone</Text>
                    <YStack>
                        <CustomButton
                            title="Delete account and data"
                            onPress={() => { handleShow() }}
                            buttonStyle={styles.dangerbutton}
                        />
                    </YStack>
                </YStack>

                <AlertDialog open={show} >
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay
                            key="overlay"
                            animation="quick"
                            opacity={0.5}
                            enterStyle={{ opacity: 0 }}
                            exitStyle={{ opacity: 0 }}
                        />
                        <AlertDialog.Content
                            bordered
                            elevate
                            key="content"
                            animation={[
                                'quick',
                                {
                                    opacity: {
                                        overshootClamping: true,
                                    },
                                },
                            ]}
                            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                            x={0}
                            scale={1}
                            opacity={1}
                            y={0}
                        >
                            <YStack>
                                <AlertDialog.Title>Accept</AlertDialog.Title>
                                <AlertDialog.Description>
                                    Are you sure you want to delete your account ?
                                    All your data will be lost forever.
                                </AlertDialog.Description>
                                <XStack justifyContent="flex-end">
                                    <Button onPress={handleShow}>Cancel</Button>
                                    <Button onPress={() => {
                                        handleDeleteAccount(userRoleValue)
                                        handleShow()
                                    }} theme="active">Accept</Button>
                                </XStack>
                            </YStack>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog>
            </YStack>
        </YStack>
    )
}