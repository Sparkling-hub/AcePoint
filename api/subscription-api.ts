import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { retrieveData,storeData } from "./localStorage";
import { subscriptionEnum } from "@/model/subscriptionEnum";

const subscriptionData = async ()=> {
    try {
        // retrieve User Data
       const data= await retrieveData("userInfo")
       if (!data) {
           return 'User not authenticated';
       }
        const parsedValue = JSON.parse(data);
        if(!(parsedValue.coachData.hasOwnProperty('subscription'))){
            // return msg if subscription is not existing in coach schema
            return "subscription is not exist"
        }
         // return  subscription value
        return parsedValue.coachData.subscription
    }catch (error:any) {
        console.log("Error :", error);
        return error.message;
    }
};
const changeSubscription = async ({  subscription }: {subscription: subscriptionEnum })=> {
    try {
        // retrieve User Data 
       const data= await retrieveData("userInfo")
       if (!data) {
           return 'User not authenticated.';
       }
        const parsedValue = JSON.parse(data);
        const userData = {
            ...parsedValue.coachData,
            subscription: subscription
        };
        // retrieve coach data and add it to db 
        const docRef = doc(db, 'coach', parsedValue.user.uid);
        await setDoc(docRef, userData);
        // return msg when value changed with successful status
        
        // update the local storage with new values
        //updating the storage
        parsedValue.coachData=userData
        await storeData('userInfo',JSON.stringify(parsedValue))
        return "subscription changed successfully";
    }catch (error:any) {
        console.log("Error :", error);
        return error.message
    }
};
export {changeSubscription,subscriptionData}