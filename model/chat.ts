import { Timestamp } from 'firebase/firestore';

export class Chat {
  id?: string;
  sendAt?: Timestamp;
  message?: string;
  emoji?: string;
  seen?: boolean;
}
