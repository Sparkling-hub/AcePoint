import { Timestamp } from "firebase/firestore";

export class Club {
    createdAt?:Timestamp
    location?:string
    name?:string
}