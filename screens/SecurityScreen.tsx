import { Text, YStack, Button } from 'tamagui';
import { styles } from '@/components/ButtonStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/components/Form/CustomInput';
import { useState } from 'react';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import changePassword from '@/services/changePassword';

export default function SecurityScreen({ testID }: { testID: string }) {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [newPassword, setNewPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = () => {
        changePassword(newPassword);
    }
    return (
        <YStack flex={1} paddingTop={60} testID={testID}>
            <YStack gap={20} paddingHorizontal={15} marginBottom={40}>
                <YStack>
                    <YStack gap={15}>
                        <Text style={styles.title}>Security</Text>
                        <Text style={styles.text}>Change Password</Text>
                        <Text>In this screen, you can change your password.</Text>
                        <Formik
                            initialValues={{
                                password: ''
                            }}
                            validationSchema={Yup.object().shape({
                                password: Yup.string().required('Password is required').min(6)
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(false);
                            }}
                        >
                            <YStack gap={'$3'} style={{ alignItems: 'center', margin: 10 }}>

                                {passwordVisible ? (
                                    <CustomInput
                                        placeholder="New Password"
                                        validateOnInit
                                        hide={passwordVisible}
                                        onChangeText={(text) => {
                                            setNewPassword(text);
                                        }}
                                        icon={<EyeOff color={"#3A4D6C"}
                                            onPress={togglePasswordVisibility}
                                            style={{ borderColor: "#3A4D6C" }} />}
                                    />
                                ) : (
                                    <CustomInput
                                        placeholder="New Password"
                                        validateOnInit
                                        hide={passwordVisible}
                                        onChangeText={(text) => {
                                            setNewPassword(text);
                                        }}
                                        icon={<Eye color={"#3A4D6C"}
                                            onPress={togglePasswordVisibility}
                                            style={{ borderColor: "#3A4D6C" }} />
                                        }
                                    />
                                )}
                                <YStack >
                                    <Button style={{
                                        height: 52,
                                        paddingLeft:119,
                                        paddingRight:119,
                                        color: "#fff",
                                        backgroundColor: "#3A4D6C",
                                        textAlign: 'center'
                                        
                                    }} onPress={() => { handleSubmit() }}>Change password</Button>
                                </YStack>
                            </YStack>

                        </Formik>
                    </YStack>
                </YStack>
            </YStack>
        </YStack>
    )
}