import {auth,updateDoc ,createUserWithEmailAndPassword,setDoc,db,doc,signOut} from'@/lib/firebase'
import { Timestamp, collection } from "firebase/firestore";
import { Coach } from '@/model/coach';
import { Player } from '@/model/player';
import {storeData ,retrieveData} from '@/api/localStorage'
const signUpCoach = async ({ email,password,coach }: { email: string ,password:string,coach:Coach }) => {
      createUserWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
        const userData = {   
          displayName: coach.displayName,
          subscription:coach.subscription,
          phoneNumber:coach.phoneNumber,
          age:coach.age,
          image:coach.image,
          createdAt:Timestamp.now()    
        }; 
        console.log("User added successfully!");
        try {
          setDoc(doc(db, 'coach',userCredential.user.uid), userData)
          console.log("Coach added successfully!");
          
        } catch (error) {
            console.error("Error adding coach: ", error);
        }
      })
      .catch((error) => {
        console.log('Sign Up Failed', error.message);
      });
  };


const signUpPlayer = async ({ email,password,player }: { email: string ,password:string,player:Player }) => {
  createUserWithEmailAndPassword(auth,email, password)
  .then((userCredential) => {
    let userData = {   
      displayName: player.displayName,
      phoneNumber:player.phoneNumber,
      country:player.country,
      createdAt:Timestamp.now()    
    }; 
    console.log("User added successfully!");
    try {
      setDoc(doc(db, 'player',userCredential.user.uid), userData)
      console.log("player added successfully!");
      console.log(JSON.stringify(userData))
      storeData("userId",userCredential.user.uid).then((data)=>{
        console.log("storage data: "+data)
      })
      
    } catch (error) {
        console.error("Error adding player: ", error);
    }
  })
  .catch((error) => {
    console.log('Sign Up Failed', error.message);
  });
  signOut(auth)
};

const updateUserPlayer = async (playerData: Player) => {
  try {
    const userId = await retrieveData("userId");
    console.log("storage data: " + userId);
    const coachCollectionRef = collection(db, 'player');
    await updateDoc(doc(coachCollectionRef, userId), { ...playerData });
      return 'Player updated successfully';
  }catch (error) {
    console.error('Error updating Player:', error);
    throw error; 
  }
};


export { signUpCoach ,signUpPlayer,updateUserPlayer}