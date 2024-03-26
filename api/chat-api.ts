import { db, auth } from '@/lib/firebase';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { retrieveData } from './localStorage';
import { getRoomId } from '@/utils/chatRoomUtil';
const getMessages = (callback: any) => {
  try {
    const msgRef = collection(db, 'chat');
    const q = query(msgRef, orderBy('sendAt'));
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return 'User not authenticated.';
    }
    // Subscribe to real-time updates
    const data = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((x) => ({
        id: x.id,
        ...x.data(),
      }));
      // console.log(messages)
      callback(messages);
    });

    return data;
  } catch (error: any) {
    console.log('Error :', error);
    return error.message;
  }
};
async function sendMessage(roomId: string, message: string) {
  try {
    const data = await retrieveData('userInfo');
    if (!data) {
      return 'User not authenticated.';
    }
    const parsedValue = JSON.parse(data);

    const docRef = doc(db, 'chat', roomId);
    const messagesRef = collection(docRef, 'messages');

    const newDoc = await addDoc(messagesRef, {
      message: message,
      senderId: parsedValue.user?.uid,
      image: parsedValue.data?.image ?? null,
      senderName: parsedValue.data?.displayName,
      seen: false,
      createdAt: Timestamp.now(),
    });

    console.log('new message id:', newDoc.id);
  } catch (error) {
    console.log(error);
  }
}

async function findAllFromCollection(collectionName: string) {
  try {
    // Get a reference to the collection
    const colRef = collection(db, collectionName);

    // Retrieve all documents in the collection
    const querySnapshot = await getDocs(colRef);

    // Extract data from each document
    const documents: any[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error: any) {
    console.log('Error fetching documents:', error.message);
    return error.message;
  }
}

const cureentUser = () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return 'User not authenticated.';
  }
  return currentUser.uid;
};

async function getAllUsers() {
  const currentUser = auth.currentUser;
  try {
    if (!currentUser) {
      console.log('User not authenticated.');
      return [];
    }
    const playerCollection = collection(db, 'player');
    const coachCollection = collection(db, 'coach');
    const [playerQuerySnapshot, coachQuerySnapshot] = await Promise.all([
      getDocs(playerCollection),
      getDocs(coachCollection),
    ]);
    const users: any[] = [];
    playerQuerySnapshot.forEach((doc) => {
      // Assuming the document ID is the user ID
      if (doc.id !== currentUser.uid) {
        const { displayName, image } = doc.data();
        users.push({ id: doc.id, displayName, image });
      }
    });
    coachQuerySnapshot.forEach((doc) => {
      if (doc.id !== currentUser.uid) {
        const { displayName, image } = doc.data();
        users.push({ id: doc.id, displayName, image });
      }
    });
    return users;
  } catch (error: any) {
    console.error('Error fetching users:', error.message);
    return error.message;
  }
}

async function createRoom(id: string) {
  try {
    const userId = cureentUser();
    const roomId = getRoomId(userId, id);
    const roomRef = doc(db, 'chat', roomId); // Obtain a reference to the document
    await setDoc(roomRef, {
      roomId,
      createdAt: Timestamp.now(),
      members: [userId, id],
    });
  } catch (error) {
    console.log(error);
  }
}

export {
  getMessages,
  sendMessage,
  findAllFromCollection,
  cureentUser,
  getAllUsers,
  createRoom,
};
