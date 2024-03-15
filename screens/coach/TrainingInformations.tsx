import { getLessonById } from "@/api/lesson-api"
import { retrieveData } from "@/api/localStorage"
import { useEffect, useState } from "react"
import { Text, YStack, Avatar, Separator, ScrollView } from 'tamagui';
import Colors from '@/constants/Colors';
import { ExternalLink, Star } from "@tamagui/lucide-icons";
import { StyleSheet } from "react-native";
import ProgressBar from "@/components/ProgressBar";
import { getPlayerById } from "@/api/player-api";
import { getCoachById } from "@/api/coach-api";
import { addDurationToStartDate, time } from "@/services/dateService";

export default function TrainingInformations() {
    const [isLoading, setIsLoading] = useState(true)
    const [training, setTraining] = useState({
        description: '',
        tags: [''],
        players: [],
        maxPeople: '',
        startDate: '',
        duration: ''
    })
    const [players, setPlayers] = useState([])
    const [coach, setCoach] = useState({
        displayName: '',
        image: '',
        rating: '0',
        level: ''
    })
    const [rating, setRating] = useState(50)
    useEffect(() => {

        const getInformations = async () => {
            const trainingID = await retrieveData('trainingID')
            if (trainingID) {
                const trainingDoc = await getLessonById(trainingID)
                if (trainingDoc) {
                    setTraining(trainingDoc)
                    const coachDoc = await getCoachById(trainingDoc.coachId)
                    if (coachDoc) setCoach(coachDoc)
                    const arrayPlayers = trainingDoc.players
                    console.log(trainingDoc);
                    arrayPlayers.forEach(async (element: string) => {
                        const player = await getPlayerById(element)
                        if (player) {
                            setPlayers([...players, player])
                        }
                    });
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
                        <Text fontSize={30} fontWeight={'bold'} color={Colors.secondary}>Training Team</Text>
                        <Text fontSize={15} color={Colors.secondary}>{time(training.startDate)} - {addDurationToStartDate(time(training.startDate), training.duration)}</Text>
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
                <YStack>
                    <Text style={styles.title}>Description</Text>
                    <Text marginTop={10} marginLeft={20} color={Colors.secondary} marginRight={20}>{training.description}</Text>
                </YStack>
                <YStack marginTop={10}>
                    <Text style={styles.title}>Tags</Text>
                    <YStack flexDirection="row" flexWrap="wrap" padding={20} marginEnd={20} rowGap={'$3'}>
                        {training.tags.map((tag, index) => (
                            <YStack key={index + 123321} style={styles.tags}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </YStack>
                        ))}
                    </YStack>
                </YStack>
                <YStack>
                    <Text style={styles.title}>Sign in dead line</Text>
                    <Text marginLeft={20} color={Colors.secondary} marginRight={20}>Thursday 27th 8:00 AM</Text>
                </YStack>
                <YStack marginTop={20}>
                    <Text style={styles.title}>Players {training.players.length}/{training.maxPeople}</Text>
                    <YStack flexDirection="row" flexWrap="wrap">
                        {players.map((element, index) => (
                            <Avatar key={element.image}
                                circular
                                size="$5"
                                marginTop={30}
                                marginLeft={20}
                                borderWidth={3}
                                borderColor={Colors.primary}
                                backgroundColor={Colors.secondary}
                            >
                                {!!element.image &&
                                    <Avatar.Image src={element.image} />
                                }
                            </Avatar>
                        ))}

                    </YStack>
                    <YStack marginBottom={10} marginTop={10} paddingLeft={20}>
                        <ProgressBar value={rating}></ProgressBar>
                    </YStack>
                </YStack>
                <YStack marginBottom={30}>
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