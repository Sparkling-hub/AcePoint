import { db } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { retrieveData } from "./localStorage";

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
       let id:any=null
       let subscriptionData:any=null
        const parsedValue = JSON.parse(data);
        querySnapshot.forEach((doc) => {
            subscriptionData=doc.data() 
            if (subscriptionData.coachId===parsedValue.user.uid) 
            {               
                subscriptionData=doc.data() 
                id=doc.id
                return {data:subscriptionData,subscriptionId:id}
            }
            else return {data:null,subscriptionId:id}
    
        });
        // return  subscription value
        return {data:subscriptionData,subscriptionId:id}
    }catch (error:any) {
        console.log("Error :", error);
        return error.message;
    }
};
const changeSubscription = async ({  subscription,id }: {subscription: any,id:string })=> {
    try {
        // retrieve User Data 
       const data= await retrieveData("userInfo")
       if (!data) {
           return 'User not authenticated.';
       }
        // retrieve coach data and add it to db 
        const docRef = doc(db, 'subscription', id);
        await setDoc(docRef, subscription);
        // return msg when value changed with successful status
        return "subscription changed successfully";
    }catch (error:any) {
        console.log("Error :", error);
        return error.message
    }
};
export {changeSubscription,subscriptionData}