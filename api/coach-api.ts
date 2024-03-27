import { db } from '@/lib/firebase';
import { getDoc, doc } from 'firebase/firestore';

// This function fetches a coach document from the Firestore database by its ID.
const getCoachById = async (id: string) => {
  // Create a reference to the coach document in the Firestore database
  const docRef = doc(db, 'coach', id);
  // Get the document snapshot
  const docSnap = await getDoc(docRef);
  // Check if the document exists
  if (docSnap.exists()) {
    // Return the data of the document
    return docSnap.data();
  } else {
    // Log a message if the document does not exist
    console.log('No such document!');
  }
};

export { getCoachById };
