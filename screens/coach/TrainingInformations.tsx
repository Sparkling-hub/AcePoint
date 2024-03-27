import { addPlayerToLesson, deleteLessonById, getLessonById, removePlayerToLesson } from "@/api/lesson-api"
import { retrieveData } from "@/api/localStorage"
import { useEffect, useState } from "react"
import { Text, YStack, Avatar, Separator, ScrollView, Button } from 'tamagui';
import Colors from '@/constants/Colors';
import { ExternalLink, Star } from "@tamagui/lucide-icons";
import { StyleSheet } from "react-native";
import ProgressBar from "@/components/ProgressBar";
import { getPlayerById } from "@/api/player-api";
import { getCoachById } from "@/api/coach-api";
import { addDurationToStartDate, time } from "@/services/dateService";
import moment from "moment";
import { useRouter } from "expo-router";
import fireToast from "@/services/toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function TrainingInformations() {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [training, setTraining] = useState({
        description: '',
        tags: [''],
        players: [],
        maxPeople: '',
        startDate: '',
        duration: '',
        trainingTitle: '',
        signInDeadLine: '',
        price: '',
        paymentMode: ['']
    })
    const [playersRequired, setPlayersRequired] = useState(0)
    const [id, setId] = useState('')
    const [players, setPlayers] = useState([])
    const [coach, setCoach] = useState({
        displayName: '',
        image: '',
        rating: '0',
        level: ''
    })
    const [rating, setRating] = useState(50)
    const user = useSelector((state: RootState) => state.userRole);
    const userRole = user.userRole;
    const [disabled, setDisabled] = useState(true)
    const [showCancelButton, setShowCancelButton] = useState(false)
    const pushPlayers = (arrayPlayers: Array<any>) => {
        arrayPlayers.forEach(async (element: string) => {
            const player = await getPlayerById(element)
            if (player) {
                setPlayers((prevPlayers) => [...prevPlayers, player])
            }
        });
    }
    useEffect(() => {
        const getInformations = async () => {
            const trainingID = await retrieveData('trainingID')
            const userID = await retrieveData('userID')
            if (trainingID) {
                setId(trainingID)
                const trainingDoc = await getLessonById(trainingID)
                if (trainingDoc) {
                    setDisabled((new Date(trainingDoc.signInDeadLine.seconds * 1000) > new Date()));
                    setTraining(trainingDoc)
                    const coachDoc = await getCoachById(trainingDoc.coachId)
                    if (coachDoc) setCoach(coachDoc)
                    const arrayPlayers = trainingDoc.players
                    setShowCancelButton(arrayPlayers.includes(userID))
                    setPlayersRequired(trainingDoc.maxPeople - arrayPlayers.length)
                    pushPlayers(arrayPlayers)
                    setRating(Math.round(arrayPlayers.length / parseInt(trainingDoc.maxPeople) * 100))
                }
            }
            setIsLoading(false)
        }
        getInformations()
    }, [])
    if (isLoading) {
        return (
            <></>
        )
    }
    return (
        <ScrollView>
            <YStack>
                <YStack flexDirection="row">
                    <YStack>
                        <Avatar circular
                            size="$9"
                            marginTop={30}
                            marginLeft={20}
                            borderWidth={3}
                            borderColor={Colors.primary}
                            backgroundColor={Colors.secondary}
                        >
                        </Avatar>
                    </YStack>
                    <YStack paddingTop={30} alignSelf="center" marginLeft={30}>
                        <Text fontSize={30} fontWeight={'bold'} color={Colors.secondary}>{training.trainingTitle}</Text>
                        <Text fontSize={15} color={Colors.secondary}>{moment(new Date(training.startDate.seconds * 1000)).format('dddd Do')} {time(training.startDate)} - {addDurationToStartDate(time(training.startDate), training.duration)}</Text>
                    </YStack>
                </YStack>
                <YStack paddingTop={20}>
                    <Text style={styles.title}>Organiser</Text>
                </YStack>
                <YStack>
                    <YStack flexDirection="row">
                        <Avatar circular
                            size="$7"
                            marginTop={30}
                            marginLeft={20}
                            borderWidth={3}
                            borderColor={Colors.primary}
                        >
                            {!!coach.image &&
                                <Avatar.Image src={coach.image} />
                            }
                        </Avatar>
                        <YStack paddingTop={30} alignSelf="center" marginLeft={30}>
                            <Text fontSize={20} fontWeight={'bold'} color={Colors.secondary}>{coach.displayName}</Text>
                            <Text fontSize={20} color={Colors.secondary}>Rating : <Text fontWeight={'bold'}>{coach.rating}</Text> / Level : <Text fontWeight={'bold'}>{coach.level}</Text></Text>
                            <YStack flexDirection="row">
                                {Array.from({ length: parseInt(coach.rating) }, (_, index) => (
                                    <Star key={index} size={20} fill={Colors.secondary}></Star>
                                ))}
                            </YStack>
                        </YStack>
                    </YStack>
                </YStack>
                <Separator borderColor={Colors.secondary} width={'90%'} alignSelf="center" marginTop={20} marginBottom={20}></Separator>
                <YStack marginBottom={10}>
                    <Text style={styles.title}>Description</Text>
                    <Text marginTop={10} marginLeft={20} color={Colors.secondary} marginRight={20}>{training.description}</Text>
                </YStack>
                {(training.tags.length !== 0 && training.tags[0] !== '') &&
                    <YStack>
                        <Text style={styles.title}>Tags</Text>
                        <YStack flexDirection="row" flexWrap="wrap" padding={20} marginEnd={20} rowGap={'$3'}>
                            {training.tags.map((tag, index) => (
                                <YStack key={index + 123321} style={styles.tags}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </YStack>
                            ))}
                        </YStack>
                    </YStack>
                }
                <YStack>
                    <Text style={styles.title}>Sign in dead line</Text>
                    <Text marginLeft={20} color={Colors.secondary} marginRight={20}>{moment(new Date(training.signInDeadLine.seconds * 1000)).format('dddd Do hh:mm')}</Text>
                </YStack>
                <YStack marginTop={20}>
                    <Text style={styles.title}>Players {training.players.length}/{training.maxPeople}</Text>
                    <YStack flexDirection="row" flexWrap="wrap">
                        {players.map((element) => (
                            <Avatar
                                key={element.displayName}
                                circular
                                size="$5"
                                marginTop={30}
                                marginLeft={20}
                                borderWidth={3}
                                borderColor={Colors.primary}
                                backgroundColor={Colors.secondary}
                            >
                                {element.image ?
                                    <Avatar.Image src={element.image} />
                                    :
                                    <Avatar.Image src={require('../../assets/images/user-pfp.png')} />
                                }
                            </Avatar>
                        ))}

                    </YStack>
                    <YStack marginBottom={10} marginTop={10} paddingLeft={20}>
                        <ProgressBar value={rating}></ProgressBar>
                        {playersRequired === 0 && (
                            <Text color={Colors.lightSilver}>Full</Text>
                        )}
                        {playersRequired === 1 && (
                            <Text color={Colors.lightSilver}>Minimum {playersRequired} player required</Text>
                        )}
                        {playersRequired > 1 && (
                            <Text color={Colors.lightSilver}>Minimum {playersRequired} players required</Text>
                        )}
                    </YStack>
                </YStack>
                <YStack marginBottom={10}>
                    <Text style={styles.title}>Position</Text>
                    <YStack flexDirection="row">
                        <YStack>
                            <Avatar circular
                                size="$9"
                                marginTop={20}
                                marginLeft={20}
                                borderWidth={3}
                                borderColor={Colors.primary}
                                backgroundColor={Colors.secondary}
                            >
                            </Avatar>
                        </YStack>
                        <YStack paddingTop={30} marginLeft={20}>
                            <Text fontSize={20} fontWeight={'bold'} color={Colors.secondary}>{training.club}</Text>
                            <Text fontSize={15} color={Colors.secondary}>Address</Text>
                            <Text fontSize={15} color={Colors.secondary}>{training.court}</Text>
                        </YStack>
                        <YStack position="absolute" right={20} top={40}>
                            <ExternalLink></ExternalLink>
                        </YStack>
                    </YStack>
                </YStack>
                <YStack style={{ marginBottom: 30 }}>
                    <Text style={styles.title}>Payement</Text>
                    {training.paymentMode.map((element, index) => (
                        <Text color={Colors.secondary} fontSize={15} fontWeight={'bold'} marginLeft={20} marginTop={8} key={element}>{element}</Text>
                    ))}
                </YStack>
                <YStack style={{ marginLeft: 20, marginRight: 20, marginBottom: 30 }}>
                    {userRole === 'Coach' && <Button onPress={async () => {
                        await deleteLessonById(id)
                        fireToast('success', 'Lesson deleted successfully !')
                        router.replace("/calendar-coach")
                    }} backgroundColor={Colors.danger} color={'white'} fontWeight={'bold'} fontSize={20} paddingTop={15} paddingBottom={15} height={60}>Delete</Button>
                    }
                    {userRole === 'Player' && (
                        <>
                            {new Date() < new Date(training.signInDeadLine.seconds * 1000) && players.length < parseInt(training.maxPeople) && !showCancelButton && (
                                <Button
                                    backgroundColor={Colors.secondary}
                                    color={'white'}
                                    fontWeight={'bold'}
                                    marginRight={70}
                                    marginLeft={70}
                                    fontSize={20}
                                    paddingTop={15}
                                    paddingBottom={15}
                                    height={60}
                                    onPress={async () => {
                                        const userId = await retrieveData("userID")
                                        if (userId) await addPlayerToLesson(id, userId)
                                        router.replace("/training")
                                    }}
                                >Join</Button>
                            )}
                            {showCancelButton && (
                                <Button
                                    backgroundColor={Colors.secondary}
                                    color={'white'}
                                    fontWeight={'bold'}
                                    marginRight={70}
                                    marginLeft={70}
                                    fontSize={20}
                                    paddingTop={15}
                                    paddingBottom={15}
                                    height={60}
                                    onPress={async () => {
                                        const userId = await retrieveData("userID")
                                        if (userId) await removePlayerToLesson(id, userId)
                                        router.replace("/training")
                                    }}
                                >Cancel</Button>
                            )}
                            {new Date() >= new Date(training.signInDeadLine.seconds * 1000) && !showCancelButton && (
                                <Button
                                    backgroundColor={'#7888A3'}
                                    color={'white'}
                                    fontWeight={'bold'}
                                    marginRight={70}
                                    marginLeft={70}
                                    fontSize={20}
                                    paddingTop={15}
                                    paddingBottom={15}
                                    height={60}
                                >Unavailable</Button>
                            )}
                            {players.length >= parseInt(training.maxPeople) && !showCancelButton && (
                                <Button
                                    backgroundColor={'#7888A3'}
                                    color={'white'}
                                    fontWeight={'bold'}
                                    marginRight={70}
                                    marginLeft={70}
                                    fontSize={20}
                                    paddingTop={15}
                                    paddingBottom={15}
                                    height={60}
                                >Full</Button>
                            )}
                        </>
                    )}
                </YStack>
            </YStack>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold', fontSize: 20, marginLeft: 20, color: Colors.secondary
    },
    tags: {
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 3,
        borderWidth: 2,
        borderColor: Colors.secondary,
        borderRadius: 8
    },
    tagText: {
        color: Colors.secondary,
        fontWeight: 'bold',
        fontSize: 20,
    }

})