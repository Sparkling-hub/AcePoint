import { Timestamp } from "firebase/firestore";

export class Club {
    createdAt?:Timestamp
    latitude?:number
    longitude?:number
    name?:string
}