import { db } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { retrieveData,storeData } from "./localStorage";
import { subscriptionEnum } from "@/model/subscriptionEnum";

const subscriptionData = async ()=> {
    try {
        const colRef = collection(db, "subscription");

        // Retrieve all documents in the collection
        const querySnapshot = await getDocs(colRef);
        
        // retrieve User Data
       const data= await retrieveData("userInfo")
       if (!data) {
           return 'User not authenticated';
       }
       let status
        const parsedValue = JSON.parse(data);
        querySnapshot.forEach((doc) => {
            const subscriptionData=doc.data()
            if (subscriptionData.coachId===parsedValue.user.uid) 
            {   
                status=subscriptionData.status
                return "subscription exist"
            }
            else return "there is no subscription "
    
        });
         // return  subscription value
        return status
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
        parsedValue.data=userData
        await storeData('userInfo',JSON.stringify(parsedValue))
        return "subscription changed successfully";
    }catch (error:any) {
        console.log("Error :", error);
        return error.message
    }
};
export {changeSubscription,subscriptionData}