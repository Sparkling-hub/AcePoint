import { CollectionReference,Timestamp } from "firebase/firestore";
export class Coach {
    certificationId?:CollectionReference
    clubId?:CollectionReference
    createdAt?:Timestamp
    displayName?: string
    phoneNumber?: number
    rating?: number
    subscription?: boolean
    image?:string
    age?:Date
}