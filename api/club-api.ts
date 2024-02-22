import {setDoc,db,doc} from'@/lib/firebase'
import { Timestamp, collection } from "firebase/firestore";
import {storeData ,retrieveData} from '@/api/localStorage'

const addClub = async ({ club }: { club:any }) => {
    try {
        setDoc(doc(db, 'club'), club)
        console.log("club added successfully!");     
    } catch (error) {
          console.error("Error adding club: ", error);
    }  
};
  

export { addClub}