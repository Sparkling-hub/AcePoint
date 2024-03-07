import { Timestamp } from 'firebase/firestore';

export class Club {
  id?: string;
  createdAt?: Timestamp;
  location?: string;
  name?: string;
}
