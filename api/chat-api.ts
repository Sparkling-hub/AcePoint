import { db,auth } from "@/lib/firebase";
import { Timestamp, addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { retrieveData } from "./localStorage";
const getMessages =  (callback:any)=> {
    try {
        const msgRef =collection(db, 'chat');
        const q = query(msgRef, orderBy('sendAt'));
        const currentUser = auth.currentUser; 
        if (!currentUser) {
            return 'User not authenticated.';
        }  
        // Subscribe to real-time updates
        const data= onSnapshot(q, 
            (querySnapshot) => {
           
                const messages = querySnapshot.docs.map((x) =>  ({
                    id: x.id,
                    ...x.data(),
                }));
                // console.log(messages)
                callback(messages);
            }
        );
        
        return data
       
    }catch (error:any) {
        console.log("Error :", error);
        return error.message
    }
};
async function sendMessage( chat:any) {
    try {
        console.log(chat)
        const data= await retrieveData("userInfo")
       if (!data) {
           return 'User not authenticated.';
       }
       const parsedValue = JSON.parse(data);
        await addDoc( collection(db, 'chat'), {
            emoji: chat.emoji,
            message: chat.message,
            sendAt: Timestamp.now(),
            seen: false,
            sender: parsedValue.user.uid,
            members: chat.members,
            roomName: chat.roomName,
        });
    } catch (error:any) {
        console.log("Error :", error);
        return error.message;
    }
}
async function findAllFromCollection(collectionName:string) {
    try {
        // Get a reference to the collection
        const colRef = collection(db, collectionName);

        // Retrieve all documents in the collection
        const querySnapshot = await getDocs(colRef);

        // Extract data from each document
        const documents:any[] = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        return documents;
    } catch (error:any) {
        console.log('Error fetching documents:', error.message);
        return error.message;
    }
}

const cureentUser=()=>{
    const currentUser = auth.currentUser; 
        if (!currentUser) {
            return 'User not authenticated.';
        }  
    return currentUser.uid
}
export {getMessages,sendMessage,findAllFromCollection,cureentUser}