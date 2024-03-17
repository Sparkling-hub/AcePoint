import CustomInput from "@/components/Form/CustomInput";
import Alarm from "@/components/svg/Alarm";
import Badge from "@/components/svg/Badge";
import Person from "@/components/svg/Person";
import Sutitles from "@/components/svg/Subtitles";
import Tennis from "@/components/svg/Tennis";
import Colors from "@/constants/Colors";
import Portrait from "@/components/svg/Portrait";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { CalendarDays } from "@tamagui/lucide-icons";
import { ScrollView, YStack } from "tamagui";
import StyleIcon from "@/components/svg/StyleIcon";
import TimeIcon from "@/components/svg/TimeIcon";
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import CustomDropdownMultiSelect from "@/components/Form/dropdown/CustomDropDownMultiSelectProps";
import CustomDropdown from "@/components/Form/dropdown/CustomDropdown";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { StyleSheet } from "react-native";
import { retrieveData } from "@/api/localStorage";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { storeLesson } from "@/api/lesson-api";
import fireToast from "@/services/toast";
import NewTrainingSkeleton from "@/components/skeletons/NewTrainingSkeleton";
import { useRouter } from "expo-router";


export default function NewTrainingScreen() {
    const router = useRouter()

    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [startTime, setStartTime] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const handleShow = (field: string) => {
        field === 'startDate' ? setShowStartDate(!showStartDate) : setShowEndDate(!showEndDate)
    };
    const initialValues = {
        organiser: '',
        description: '',
        startDate: '',
        endDate: '',
        duration: '',
        maxPeople: '',
        minPeople: '',
        club: '',
        court: '',
        recurrence: '',
        tags: '',
        minAge: '',
        paymentMode: ['On App'],
        buffer: ''
    }
    const validationSchema = Yup.object().shape({
        organiser: Yup.string()
            .min(2, 'Organiser is too short!')
            .max(50, 'Organiser is too long!')
            .required('Organiser is required'),
        description: Yup.string()
            .min(5, 'Description is too short!')
            .max(200, 'Description is too long!')
            .required('Description is required'),
        startDate: Yup.string().required('Start date is required !'),
        endDate: Yup.string().required('End date is required !'),
        buffer: Yup.string().required('The end date cannot be before the start date.'),
        duration: Yup.number().min(1, 'Minimum value is 1 !').max(12, 'Maximum value is 12 !').required('Duration is required !'),
        maxPeople: Yup.number().min(1, 'Minimum value is 1 !').max(20, 'Maximum value is 20 !').required('Max people is required !'),
        minPeople: Yup.number().min(1, 'Minimum value is 1 !').max(20, 'Maximum value is 20 !').required('Min people is required !'),
        club: Yup.string().min(3, 'Description is too short!').max(200, 'Description is too long!').required('Club is required !'),
        court: Yup.string().min(3, 'Court is too short!').max(200, 'Court is too long!').required('Court is required !'),
        recurrence: Yup.string().required('Recurrence is required !'),
        tags: Yup.string().required('Tags is required !'),
        paymentMode: Yup.array().required('Payement mode is required !'),
        minAge: Yup.number().min(1, 'Minimum value is 1 !').max(200, 'No !').required('Min age is required !'),
    });
    const setDate = (startDate: any, endDate: any, mode: string) => {
        const dateParts = mode === 'endDate' ? startDate.split("/") : endDate.split("/")
        const s1 = new Date(parseInt(dateParts[2], 10), parseInt(dateParts[0], 10) - 1, parseInt(dateParts[1], 10));
        (s1 < endDate && mode === 'endDate') ? formik.setFieldValue('buffer', 'error') : formik.setFieldValue('buffer', '')
    }
    const handleChange = (name: string, value: any) => {
        formik.setFieldValue(name, value);
    };
    const handleSubmit = async () => {
        if (Object.keys(formik.errors).length === 0) {
            await storeLesson(formik.values, startTime)
            router.navigate('/calendar-coach')
        }
        else {
            fireToast('error', 'Please fill all the fields !')
        }
    }

    const formik = useFormik({
        validateOnMount: true,
        initialValues,
        validationSchema,
        onSubmit: () => handleSubmit(),
    });
    const handleConfirm = (field: string, date: Date) => {
        if (field === "startDate") {
            const dateParts = date.toISOString().split('T')
            setStartTime(dateParts[1])
        }
        handleChange(field, date.toLocaleDateString())
        handleShow(field);
    };
    useEffect(() => {
        const getUserName = async () => {
            const userInfo = await retrieveData('userInfo')
            if (userInfo) {
                const json = JSON.parse(userInfo)
                const userID = json.user.uid
                const userCollection = collection(db, 'coach');
                const result = await getDoc(doc(userCollection, userID))
                const user = result.data()
                if (user) {
                    handleChange('coachId', userID)
                    handleChange('organiser', user.displayName)
                    handleChange('club', user.club)
                }
            }
            setIsLoading(false)
        }
        getUserName()
    }, [])

    if (isLoading) {
        return (
            <YStack flex={1} paddingTop={35} paddingHorizontal={16}>
                <NewTrainingSkeleton />
            </YStack>
        );
    }
    return (
        <ScrollView style={styles.scrollview}>
            <YStack style={styles.container}>
                <YStack style={styles.ystack}>
                    <CustomInput
                        value={formik.values.organiser}
                        placeholder="Organiser"
                        onChangeText={(value) => {
                            handleChange('organiser', value)
                        }}
                        onBlur={formik.handleBlur('organiser')}
                        errors={formik.errors.organiser}
                        validateOnInit
                        icon={<Badge />}
                    />
                </YStack>
                <YStack style={styles.ystack}>
                    <CustomInput
                        value={formik.values.description}
                        onChangeText={(value: any) => {
                            handleChange('description', value)
                        }}
                        onBlur={formik.handleBlur('description')}
                        errors={formik.errors.description}
                        validateOnInit
                        placeholder="Description"
                        icon={<Sutitles />}
                    />
                </YStack>
                <YStack style={styles.ystackselect}>
                    <CustomInput
                        value={formik.values.startDate}
                        onChangeText={(value: any) => {
                            handleChange('startDate', value)
                        }}
                        onBlur={formik.handleBlur('startDate')}
                        errors={formik.errors.startDate}
                        validateOnInit
                        width={'49%'}
                        placeholder="Start Date"
                        readOnly
                        onPress={() => { handleShow('startDate') }}
                        icon={<CalendarDays color={Colors.secondary} />}
                    />
                    <DateTimePickerModal
                        isVisible={showStartDate}
                        mode="datetime"
                        minuteInterval={30}
                        onConfirm={(date) => {
                            handleConfirm('startDate', date)
                            setDate(date, formik.values.endDate, 'startDate')
                        }}
                        onCancel={() => { handleShow('startDate') }}
                    />
                    <CustomInput
                        value={formik.values.duration}
                        onChangeText={(value: any) => {
                            handleChange('duration', value)
                        }}
                        onBlur={formik.handleBlur('duration')}
                        errors={formik.errors.duration}
                        validateOnInit
                        width={'48%'}
                        keyboardType="numeric"
                        placeholder="Duration"
                        icon={<Alarm />}
                    />
                </YStack>
                
                <YStack style={styles.ystackselect}>
                    <CustomInput
                        value={formik.values.maxPeople}
                        onChangeText={(value: any) => {
                            handleChange('maxPeople', value)
                        }}
                        onBlur={formik.handleBlur('maxPeople')}
                        errors={formik.errors.maxPeople}
                        validateOnInit
                        width={'49%'}
                        keyboardType="numeric"
                        placeholder="Max people"
                        icon={<Person />}
                    />
                    <CustomInput
                        value={formik.values.minPeople}
                        onChangeText={(value: any) => {
                            handleChange('minPeople', value)
                        }}
                        onBlur={formik.handleBlur('minPeople')}
                        errors={formik.errors.minPeople}
                        validateOnInit
                        width={'48%'}
                        keyboardType="numeric"
                        placeholder="Min people"
                        icon={<Person />}
                    />
                </YStack>
                
                <YStack style={styles.ystack}>
                    <CustomInput
                        value={formik.values.endDate}
                        onChangeText={(value: any) => {
                            handleChange('endDate', value)
                        }}
                        onBlur={formik.handleBlur('endDate')}
                        errors={formik.errors.endDate}
                        validateOnInit
                        placeholder="End Date"
                        readOnly
                        onPress={() => { handleShow('endDate') }}
                        icon={<CalendarDays color={Colors.secondary} />}
                    />
                    
                    <DateTimePickerModal
                        isVisible={showEndDate}
                        mode="date"
                        onConfirm={(date) => {
                            handleConfirm('endDate', date)
                            setDate(formik.values.startDate, date, 'endDate')
                        }}
                        onCancel={() => { handleShow('endDate') }}
                    />
                </YStack>
                <YStack style={styles.ystack}>
                    <CustomInput
                        value={formik.values.club}
                        onChangeText={(value: any) => {
                            handleChange('club', value)
                        }}
                        onBlur={formik.handleBlur('club')}
                        errors={formik.errors.club}
                        validateOnInit
                        placeholder="Club"
                        icon={<Tennis />}
                    />
                </YStack>
                <YStack style={styles.ystack}>
                    <CustomInput
                        value={formik.values.court}
                        onChangeText={(value: any) => {
                            handleChange('court', value)
                        }}
                        onBlur={formik.handleBlur('court')}
                        errors={formik.errors.court}
                        validateOnInit
                        placeholder="Court"
                        icon={<Portrait />}
                    />
                </YStack>
                <YStack style={styles.ystack}>
                    <CustomDropdown
                        errors={formik.errors.recurrence}
                        validateOnInit
                        placeholder="Recurrence"
                        handleChange={(value: any) => { handleChange('recurrence', value) }}
                        selectedItem={formik.values.recurrence}
                        options={[
                            { label: 'Does not repeat', value: 'Does not repeat' },
                            { label: 'Every Weekday (Mon-Fri)', value: 'EveryWeekDay' },
                            { label: 'Daily', value: 'Daily' },
                            { label: 'Weekly', value: 'Weekly' },
                            { label: 'Monthly', value: 'Monthly' }
                        ]} />
                </YStack>
                <YStack style={styles.ystack}>
                    <CustomInput
                        value={formik.values.tags}
                        onChangeText={(value: any) => {
                            handleChange('tags', value)
                        }}
                        onBlur={formik.handleBlur('tags')}
                        errors={formik.errors.tags}
                        validateOnInit
                        placeholder="Tags"
                        icon={<StyleIcon />}
                    />
                </YStack>
                <YStack style={styles.ystack}>
                    <CustomDropdownMultiSelect
                        placeholder="Payment mode"
                        handleChange={(value: string[]) => { handleChange('paymentMode', value) }}
                        selectedItems={formik.values.paymentMode}
                        options={[
                            { label: 'On App', value: 'On App' },
                            { label: 'In Person', value: 'In Person' }
                        ]}
                        errors={formik.errors.paymentMode}
                        validateOnInit />
                </YStack>
                <YStack style={styles.ystack}>
                    <CustomInput
                        value={formik.values.minAge}
                        onChangeText={(value: any) => {
                            handleChange('minAge', value)
                        }}
                        errors={formik.errors.minAge}
                        validateOnInit
                        keyboardType="numeric"
                        placeholder="Min age"
                        icon={<TimeIcon />}
                    />
                </YStack>
                <YStack style={styles.ystack} alignItems="center" alignSelf="center">
                    <CustomButton title="PUBLISH" onPress={() => { handleSubmit() }}></CustomButton>
                </YStack>
            </YStack>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollview: {
        height: '100%'
    },
    container: {
        flex: 1,
        paddingTop: 35,
        paddingRight: 20,
        paddingLeft: 20
    },
    ystack: {
        marginBottom: 20
    },
    ystackselect: {
        gap: 10,
        width: '100%',
        marginBottom: 20,
        display: "flex",
        flexDirection: "row"
    },
    errormessage: {
        color: 'red',
        marginLeft: 10,
        marginBottom: 20
    }
})