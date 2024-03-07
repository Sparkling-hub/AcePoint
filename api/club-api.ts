import {setDoc,db,doc} from'@/lib/firebase'
import { Timestamp, collection } from "firebase/firestore";
import { Club } from '@/model/club';
import {retrieveData} from '@/api/localStorage'

const addClub = async ({ club }: { club:Club }) => {
    try {
        const coachId = await retrieveData("coachId");
        console.log("storage data: " + coachId);
        let clubData = {   
            name: club.name,
            latitude: club.latitude,
            longitude: club.longitude,
            createdAt:Timestamp.now()    
        }; 
        const clubCollection = collection(db, 'club')
        setDoc(doc(clubCollection,coachId), clubData)
        console.log("club added successfully!");     
    } catch (error) {
          console.error("Error adding club: ", error);
    }  
};
  

export { addClub}