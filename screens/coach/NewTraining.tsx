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
import { ScrollView, Text, YStack } from "tamagui";
import StyleIcon from "@/components/svg/StyleIcon";
import TimeIcon from "@/components/svg/TimeIcon";
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import CustomDropdownMultiSelect from "@/components/Form/dropdown/CustomDropDownMultiSelectProps";
import CustomDropdown from "@/components/Form/dropdown/CustomDropdown";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Platform, StyleSheet } from "react-native";
import { retrieveData } from "@/api/localStorage";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getLessonById, storeLesson, updateLesson } from "@/api/lesson-api";
import fireToast from "@/services/toast";
import NewTrainingSkeleton from "@/components/skeletons/NewTrainingSkeleton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TimerPickerModal } from "react-native-timer-picker";
import { useDispatch } from "react-redux";
import { setCalendarOption } from "@/store/slices/calendarSlice";
import { Path, Svg } from "react-native-svg";
import moment from "moment";


export default function NewTrainingScreen() {
    const { mode, selectedDate } = useLocalSearchParams();
    const parts = selectedDate.split(/[/, :]/);
    const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const date = new Date(Date.UTC(parts[2], months[parts[1]], parts[0], parts[3], parts[4]));
    const router = useRouter()
    const [showDuration, setShowDuration] = useState(false);
    const [showStartDate, setShowStartDate] = useState(false);
    const [showSignInDeadLine, setShowSignInDeadLine] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [startDate, setStartDate] = useState(date);
    const [startTime, setStartTime] = useState('12:00:00.000Z')
    const [deadLineTime, setDeadLineTime] = useState('12:00:00.000Z')
    const marginRight = Platform.OS === 'ios' ? 50 : 20
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const handleShow = (field: string) => {
        if (field === 'startDate') setShowStartDate(!showStartDate)
        if (field === 'endDate') setShowEndDate(!showEndDate)
        if (field === 'signInDeadLine') setShowSignInDeadLine(!showSignInDeadLine)
    };

    const startTimeParts = startTime.split(':')
    const initialValues = {
        organiser: '',
        description: '',
        startDate: selectedDate,
        endDate: moment().add(7, 'days').format('DD/MMM/yyyy'),
        duration: '',
        maxPeople: '',
        minPeople: '1',
        club: '',
        court: '',
        recurrence: 'Does not repeat',
        tags: '',
        minAge: '',
        paymentMode: ['On App'],
        trainingTitle: '',
        price: '',
        signInDeadLine: moment().format('DD/MMM/yyyy') + ', ' + startTimeParts[0] + ':' + startTimeParts[1],
    }
    const validationSchema = Yup.object().shape({
        description: Yup.string()
            .min(5, 'Description is too short!')
            .max(200, 'Description is too long!')
            .required('Description is required'),
        startDate: Yup.string().required('Start date is required !'),
        price: Yup.number().min(1, 'Price at least 1 !').required('Price is required !'),
        trainingTitle: Yup.string().required('Training title is required !'),
        signInDeadLine: Yup.string().required('Training title is required !'),
        endDate: Yup.string().required('End date is required !'),
        duration: Yup.string().required('Duration is required !'),
        maxPeople: Yup.number().min(1, 'Minimum value is 1 !').max(50, 'Maximum value is 50 !').required('Max people is required !'),
        minPeople: Yup.number().min(1, 'Minimum value is 1 !').max(20, 'Maximum value is 20 !').required('Min people is required !'),
        court: Yup.number().min(1, 'Court is too short!').max(200, 'Court is too long!'),
        recurrence: Yup.string().required('Recurrence is required !'),
        paymentMode: Yup.array().required('Payement mode is required !'),
        minAge: Yup.number().min(1, 'Minimum value is 1 !').max(200, 'No !').required('Min age is required !'),
    });
    const handleChange = (name: string, value: any) => {
        formik.setFieldValue(name, value);
    };
    const storeAndRedirect = async () => {
        formik.values.startDate = moment(formik.values.startDate, 'DD/MMM/YYYY, HH:mm').format('MM/DD/yyyy')
        formik.values.endDate = moment(formik.values.endDate, 'DD/MMM/YYYY, HH:mm').format('MM/DD/yyyy')
        formik.values.signInDeadLine = moment(formik.values.signInDeadLine, 'DD/MMM/YYYY, HH:mm').format('MM/DD/yyyy')
        if (mode === 'EDIT TRAINING') {
            const trainingID = await retrieveData('trainingID')
            await updateLesson(trainingID ?? '', formik.values, startTime, deadLineTime);
        }
        else
            await storeLesson(formik.values, startTime, deadLineTime);
        dispatch(setCalendarOption('D'))
        router.replace('/calendar-coach');
    }
    const handleSubmit = async () => {
        if (Object.keys(formik.errors).length === 0) {
            storeAndRedirect()
        }
        else {
            fireToast('error', 'Please fill all the fields!');
        }
    }

    const formik = useFormik({
        validateOnMount: true,
        initialValues,
        validationSchema,
        onSubmit: () => handleSubmit(),
    });
    const handleConfirm = (field: string, date: Date) => {
        const dateParts = date.toISOString().split('T')
        if (field === "startDate") {
            setStartDate(date)
            setStartTime(dateParts[1])
            const endDate = date.setDate(date.getDate() + 5)
            handleChange('endDate', moment(endDate).format('DD/MMM/yyyy'))
            date.setDate(date.getDate() - 5)
        } else if (field === "signInDeadLine") {
            setDeadLineTime(dateParts[1])
        }
        handleChange(field, moment(date).format('DD/MMM/yyyy, HH:mm'))
        handleShow(field);
    };


    useEffect(() => {
        const getUserName = async () => {
            const userInfo = await retrieveData('userInfo')
            if (userInfo) {
                const json = JSON.parse(userInfo)
                const userID = json.user._tokenResponse.localId
                const userCollection = collection(db, 'coach');
                const result = await getDoc(doc(userCollection, userID))
                const user = result.data()
                if (user) {
                    handleChange('coachId', userID)
                    handleChange('organiser', user.displayName)
                    handleChange('club', user.club)
                }
            }
        }
        const getTraining = async () => {
            if (mode === 'EDIT TRAINING') {
                const trainingID = await retrieveData('trainingID')
                if (trainingID) {
                    const training = await getLessonById(trainingID)
                    if (training) {
                        formik.setFieldValue('organiser', training.organiser);
                        formik.setFieldValue('description', training.description);
                        formik.setFieldValue('trainingTitle', training.trainingTitle);
                        formik.setFieldValue('maxPeople', training.maxPeople.toString());
                        formik.setFieldValue('minPeople', training.minPeople.toString());
                        formik.setFieldValue('price', training.price);
                        formik.setFieldValue('club', training.club);
                        formik.setFieldValue('duration', training.duration);
                        let timestamps = new Date(training.startDate.seconds * 1000)
                        let date = timestamps.toLocaleString().split(',')[0]
                        let time = timestamps.toISOString().split('T')[1]
                        setStartTime(time)
                        setStartDate(timestamps)
                        formik.setFieldValue('startDate', moment(timestamps).format('DD/MMM/yyyy, hh:mm'));
                        timestamps = new Date(training.endDate.seconds * 1000)
                        date = timestamps.toLocaleString().split(',')[0]
                        formik.setFieldValue('endDate', moment(timestamps).format('DD/MMM/yyyy'));
                        timestamps = new Date(training.signInDeadLine.seconds * 1000)
                        date = timestamps.toLocaleString().split(',')[0]
                        time = timestamps.toISOString().split('T')[1]
                        setDeadLineTime(time)
                        formik.setFieldValue('signInDeadLine', moment(timestamps).format('DD/MMM/yyyy, hh:mm'));
                        if (training.court !== "") formik.setFieldValue('court', training.court.toString());
                        formik.setFieldValue('minAge', training.minAge.toString());
                        formik.setFieldValue('recurrence', training.recurrence);
                        formik.setFieldValue('paymentMode', training.paymentMode);
                        let tags = training.tags[0]
                        for (let index = 1; index < training.tags.length; index++) {
                            const element = training.tags[index];
                            tags += ', ' + element
                        }
                        formik.setFieldValue('tags', tags);
                    }
                }
            }
            setIsLoading(false)
        }
        getUserName()
        getTraining()
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
                        value={formik.values.trainingTitle}
                        onChangeText={(value: any) => {
                            handleChange('trainingTitle', value)
                        }}
                        onBlur={formik.handleBlur('trainingTitle')}
                        errors={formik.errors.trainingTitle}
                        validateOnInit
                        placeholder="Training Title"
                        icon={<Sutitles />}
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
                    {formik.errors.description != 'Description is required' && <Text style={styles.errormessage}>{formik.errors.description}</Text>}
                </YStack>
                <YStack style={styles.ystackselect}>
                    <CustomInput
                        fontSize={13}
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
                        }}
                        onCancel={() => { handleShow('startDate') }}
                    />
                    <CustomInput
                        readOnly
                        value={formik.values.duration}
                        onPress={() => { setShowDuration(true) }}
                        onBlur={formik.handleBlur('duration')}
                        errors={formik.errors.duration}
                        validateOnInit
                        width={'48%'}
                        placeholder="Duration"
                        icon={<Alarm />}
                    />
                    <TimerPickerModal
                        hideSeconds
                        visible={showDuration}
                        setIsVisible={setShowDuration}
                        hourLimit={{ max: 8 }}
                        onConfirm={(pickedDuration) => {
                            let minutes = pickedDuration.minutes + ""
                            if (pickedDuration.minutes < 10) minutes = '0' + pickedDuration.minutes
                            handleChange('duration', `${pickedDuration.hours}:${minutes}`)
                            setShowDuration(false)
                        }}
                        modalTitle="Set Duration"
                        onCancel={() => setShowEndDate(false)}
                        closeOnOverlayPress
                        modalProps={{
                            overlayOpacity: 0.2,
                        }}
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
                {(formik.errors.maxPeople != 'Max people is required !' && formik.errors.minPeople != 'Min people is required !') &&
                    <YStack style={{ ...styles.ystackselect, marginBottom: -15 }}>
                        {formik.errors.maxPeople != 'Max people is required !' && <Text style={{ ...styles.errormessage, position: "relative", top: -20, marginRight: marginRight }}>{formik.errors.maxPeople}</Text>}
                        {formik.errors.minPeople != 'Min people is required !' && <Text style={{ ...styles.errormessage, position: "relative", top: -20 }}>{formik.errors.minPeople}</Text>}
                    </YStack>
                }

                <YStack style={styles.ystack}>
                    <CustomInput
                        value={formik.values.signInDeadLine}
                        onChangeText={(value: any) => {
                            handleChange('signInDeadLine', value)
                        }}
                        onBlur={formik.handleBlur('signInDeadLine')}
                        errors={formik.errors.signInDeadLine}
                        validateOnInit
                        placeholder="Sign In Dead Line"
                        readOnly
                        onPress={() => { handleShow('signInDeadLine') }}
                        icon={<CalendarDays color={Colors.secondary} />}
                    />
                    <DateTimePickerModal
                        isVisible={showSignInDeadLine}
                        mode="datetime"
                        minuteInterval={30}
                        onConfirm={(date) => {
                            handleConfirm('signInDeadLine', date)
                        }}
                        onCancel={() => { handleShow('signInDeadLine') }}
                        minimumDate={startDate}
                    />
                </YStack>
                <YStack style={styles.ystack}>
                    <CustomInput
                        value={formik.values.price}
                        onChangeText={(value: any) => {
                            handleChange('price', value)
                        }}
                        onBlur={formik.handleBlur('price')}
                        errors={formik.errors.price}
                        validateOnInit
                        keyboardType="numeric"
                        placeholder="Price"
                        icon={<Svg
                            width={20}
                            height={20}
                            viewBox="-96 0 512 512"
                        >
                            <Path
                                fill="#3A4D6C"
                                d="M308 352h-45.495c-6.627 0-12 5.373-12 12v50.848H128V288h84c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-84v-63.556c0-32.266 24.562-57.086 61.792-57.086 23.658 0 45.878 11.505 57.652 18.849 5.151 3.213 11.888 2.051 15.688-2.685l28.493-35.513c4.233-5.276 3.279-13.005-2.119-17.081C273.124 54.56 236.576 32 187.931 32 106.026 32 48 84.742 48 157.961V224H20c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h28v128H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h296c6.627 0 12-5.373 12-12V364c0-6.627-5.373-12-12-12z" />
                        </Svg>}
                    />
                    {formik.errors.price != 'Price is required !' && <Text style={styles.errormessage}>{formik.errors.price}</Text>}

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
                        keyboardType="numeric"
                        onBlur={formik.handleBlur('court')}
                        errors={formik.errors.court}
                        validateOnInit
                        placeholder="Court"
                        icon={<Portrait />}
                    />
                </YStack>
                <YStack style={{ marginTop: -15 }}>
                    {formik.errors.court != 'Court is required !' && <Text style={{ ...styles.errormessage, marginBottom: 15 }}>{formik.errors.court}</Text>}
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
                {(formik.values.recurrence !== 'Does not repeat') &&
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
                            }}
                            onCancel={() => { handleShow('endDate') }}
                            minimumDate={startDate}
                        />
                    </YStack>
                }
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
                    {formik.errors.minAge != 'Min age is required !' && <Text style={styles.errormessage}>{formik.errors.minAge}</Text>}
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
    }
})