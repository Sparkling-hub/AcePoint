import { Timestamp } from 'firebase/firestore';

export type message = {
  message?: string;
  senderId?: string;
  image?: string;
  senderName?: string;
  seen?: boolean;
  createdAt: Timestamp;
};
