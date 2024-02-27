import { StyleSheet } from 'react-native';
import { Button, Text, YStack, AlertDialog, XStack, } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/CustomButton';
import { handleDeleteAccount } from '@/services/user';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useState } from 'react';

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
                            onPress={() => { }}
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
                            <YStack space>
                                <AlertDialog.Title>Accept</AlertDialog.Title>
                                <AlertDialog.Description>
                                    Are you sure you want to delete your account ?
                                    All your data will be lost forever.
                                </AlertDialog.Description>
                                <XStack space="$3" justifyContent="flex-end">
                                    <Button onPress={handleShow}>Cancel</Button>
                                    <Button onPress={() => { handleDeleteAccount(userRoleValue) }} theme="active">Accept</Button>
                                </XStack>
                            </YStack>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog>
            </YStack>
        </YStack>
    )
}


const styles = StyleSheet.create({
    displayNameText: {
        fontFamily: 'MontserratBold',
        fontSize: 20,
        lineHeight: 24,
        color: Colors.secondary,
        textAlign: 'center',
    },

    text: {
        fontFamily: 'MontserratBold',
        fontSize: 16,
        lineHeight: 20,
        color: Colors.secondary,
        paddingLeft: 20,
        marginBottom: 10,
    },

    button: {
        backgroundColor: Colors.primary,
        height: 52,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        padding: 16,
        paddingHorizontal: 20,
    },
    dangerbutton: {
        backgroundColor: Colors.danger,
        height: 52,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 16,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontFamily: 'MontserratMedium',
        fontSize: 16,
        lineHeight: 20,
        color: Colors.secondary,
    },
});