import {db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore';


const findByName = async ({name}: { name: string }) => {
    try {
        if(name.length !==0){
            
        const data = query(collection(db, 'club'), where('name', '==', name));
        const clubs = await getDocs(data);
        if (clubs.empty) {
            // return there is no name if name dos not exist in db
            return "there is no name"
        }
        // return the filtered data
        return clubs
        
        }
        // return the all data if there is no name
        if(name.length ===0){
        const data = collection(db, 'club');
        const clubs = await getDocs(data);
       return clubs
        }
    } catch (error: any) {
       return error.message
    }
};
export { findByName}
