import { Text, YStack, Button } from 'tamagui';
import { styles } from '@/components/ButtonStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/components/Form/CustomInput';
import { useState } from 'react';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import changePassword from '@/services/changePassword';

export default function SecurityScreen() {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .matches(
                /^(?=.*[A-Z0-9]).{8,}$/,
                'Password must contain at least one capital letter or a number and have a minimum length of 8 characters'
            )
    });
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = () => {
        if (!validationSchema.isValidSync({ password: newPassword })) {
            setErrorMessage(true);
            return;
        }
        changePassword(newPassword);
    }
    return (
        <YStack flex={1} paddingTop={60}>
            <YStack gap={20} paddingHorizontal={15} marginBottom={40}>
                <YStack>
                    <YStack gap={15}>
                        <Text style={styles.text}>Change Password</Text>
                        <Text style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 0 }}>In this screen, you can change your password. {"\n"}The password should contain at least a capital letter or a number and have the minimum length of 8 characters
                        </Text>
                        <Formik
                            initialValues={{
                                password: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(false);
                            }}
                        >
                            <YStack gap={'$3'} style={{ alignItems: 'center', margin: 10, marginLeft: 25, marginRight: 25 }}>

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
                                            style={{ borderColor: "#3A4D6C", }} />}
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
                                {errorMessage && <Text style={{color: 'red'}}>
                                    Password is invalid. Please make sure it contains at least one capital letter or a number and has a minimum length of 8 characters.
                                </Text>}
                            </YStack>

                        </Formik>
                        <YStack style={{
                            paddingLeft: 13,
                            paddingRight: 13,
                        }}>
                            <Button style={{
                                height: 52,
                                color: "#fff",
                                backgroundColor: "#3A4D6C",
                                textAlign: 'center'

                            }} onPress={() => { handleSubmit() }}>Change password</Button>
                        </YStack>
                    </YStack>
                </YStack>
            </YStack>
        </YStack>
    )
}