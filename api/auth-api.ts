import { auth, updateDoc, createUserWithEmailAndPassword, setDoc, db, doc, signOut, signInWithEmailAndPassword } from '@/lib/firebase'
import { Timestamp, collection } from "firebase/firestore";
import { Coach } from '@/model/coach';
import { Player } from '@/model/player';
import {storeData ,retrieveData} from '@/api/localStorage'
const signUpCoach = async ({ email,password,coach }: { email: string ,password:string,coach:Coach }) => {
    
      createUserWithEmailAndPassword(auth,email, password)
      .then((userCredential) => { 
        const userData = {  
          displayName: coach.displayName,
          phoneNumber:coach.phoneNumber,
          terms:coach.terms,
          marketing:coach.marketing,
          createdAt:Timestamp.now()      
        }; 
        console.log("User added successfully!");
        try {
          setDoc(doc(db, 'coach',userCredential.user.uid), userData)
          console.log("Coach added successfully!");
          storeData("coachId",userCredential.user.uid).then((data)=>{
            console.log("storage data: "+data)
          })
          
        } catch (error) {
            console.error("Error adding coach: ", error);
        }
      })
      .catch((error) => {
        console.log('Sign Up Failed', error.message);
      });
      signOut(auth)
  };


const signUpPlayer = async ({ email, password, player }: { email: string, password: string, player: Player }) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      let userData = {
        displayName: player.displayName,
        phoneNumber: player.phoneNumber,
        terms: player.terms,
        marketing: player.marketing,
        createdAt: Timestamp.now()
      };
      console.log("User added successfully!");
      try {
        setDoc(doc(db, 'player', userCredential.user.uid), userData)
        console.log("player added successfully!");
        console.log(JSON.stringify(userData))
        storeData("playerId", userCredential.user.uid).then((data) => {
          console.log("storage data: " + data)
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
    const playerId = await retrieveData("playerId");
    console.log("storage data: " + playerId);
    const coachCollectionRef = collection(db, 'player');
    await updateDoc(doc(coachCollectionRef, playerId), { ...playerData });
    return 'Player updated successfully';
  } catch (error) {
    console.error('Error updating Player:', error);
    throw error;
  }
};
const updateUserCoach = async (coachData: Coach) => {
  try {
    const coachId = await retrieveData("coachId");
    console.log("storage data: " + coachId);
    const coachCollectionRef = collection(db, 'coach');
    await updateDoc(doc(coachCollectionRef, coachId), { ...coachData });
    return 'coach updated successfully';
  } catch (error) {
    console.error('Error updating coach:', error);
    throw error;
  }
};

const loginUser = async ({ email, password }: { email: string, password: string }) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    console.log(user)
    storeData("userInfo", JSON.stringify(user))
    return { user }
  } catch (error) {
    return error

  }
}
export { signUpCoach, signUpPlayer, updateUserPlayer, loginUser, updateUserCoach }
