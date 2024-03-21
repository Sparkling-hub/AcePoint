import { auth, createUserWithEmailAndPassword, setDoc, db   } from '@/lib/firebase'
import { Timestamp, getDoc,doc } from "firebase/firestore";
import { Coach } from '@/model/coach';
import { Player } from '@/model/player';
import { storeData } from '@/api/localStorage'
import { signInWithEmailAndPassword,signOut } from 'firebase/auth'

const signUpCoach = async ({ email, password, coach }: { email: string, password: string, coach: Coach }): Promise<string> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userData = {
      displayName: coach.displayName,
      phoneNumber: coach.phoneNumber,
      terms: coach.terms,
      marketing: coach.marketing,
      createdAt: Timestamp.now(),
      sessionNotification: true,
      messageNotification: true,
      promotionsViaEmail: true,
      feedbackNotification: true,
      image: coach.image,
      tags: coach.tags,
      bios: coach.bios,
      clubId: coach.clubId ??null,
      followedPlayer:[]
    };
    const docRef = doc(db, 'coach', userCredential?.user?.uid);
    await setDoc(docRef, userData);
    signOut(auth);
    return "User with coach added successfully";
  } catch (error:any) {
    console.log("Error adding coach:", error);
    return `Sign Up Failed ${error.message}`;
  }
};

const signUpPlayer = async ({ email, password, player }: { email: string, password: string, player: Player }): Promise<string> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("gender=========>",player.gender)
    console.log("fitness=========>",player.fitness)
    console.log("age=========>",player.age)
    console.log("player=========>",player)
    const userData = {
      displayName: player.displayName,
      phoneNumber: player.phoneNumber,
      terms: player.terms,
      marketing: player.marketing,
      createdAt: Timestamp.now(),
      sessionNotification: true,
      messageNotification: true,
      promotionsViaEmail: true,
      feedbackNotification: true,
      tennisLevel: player.tennisLevel,
      fitness: player.fitness,
      age: player.age,
      favoriteCoach:[],
      gender: player.gender,
    };
    
    // Add logging for better visibility
    console.log("User added successfully!");
    const docRef = doc(db, 'player', userCredential.user.uid);
    // Add await to ensure setDoc is executed before signOut
    await setDoc(docRef, userData);
    
    // Add logging for better visibility
    console.log("Player added successfully!");
    
    // Sign out the user
    await signOut(auth);
    
    return "Player added successfully";
  } catch (error:any) {
    console.log("Sign Up Failed", error.message);
    return `Sign Up Failed ${error.message}`;
  }
};

const loginUser = async ({ email, password,usertype }: { email: string, password: string,usertype:any }) => {
  try {
    if (usertype==="Coach") {
      const user = await signInWithEmailAndPassword(auth, email, password)
        const coachRef = doc(db, 'coach', user.user.uid);
        const coachSnap = await getDoc(coachRef);
        if (!coachSnap.exists()) {
          signOut(auth)
          return 'coach does not exist.';
        }
        
        const coachData = coachSnap.data();
        storeData("userInfo",JSON.stringify({user:user.user,coachData}) )
        return {user,coachData}
    }
    if (usertype==="Player") {
      const user = await signInWithEmailAndPassword(auth, email, password)
        const playerRef = doc(db, 'player', user.user.uid);
        const playerSnap = await getDoc(playerRef);
        if (!playerSnap.exists()) {
          signOut(auth)
          return 'player does not exist.';
        }
        const playerData = playerSnap.data();
        storeData("userInfo",JSON.stringify({user:user.user,playerData}))
        return {user,playerData}
    }
  } catch (error) {
    return error
  }
}


export { signUpCoach, signUpPlayer, loginUser }
