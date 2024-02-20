import { Timestamp } from "firebase/firestore";

export class Player {
    createdAt?:Timestamp
    displayName?: string
    phoneNumber?: string
    rating?: number
    image?:string
    age?:string
    gender?:string
    tennisLevel?:string
    country?:string
    marketing?:boolean
    terms?:boolean
    fitness?:string
}