import { Timestamp } from 'firebase/firestore';

export class Club {
  id?: string;
  createdAt?: Timestamp;
  latitude?: number;
  longitude?: number;
  name?: string;
}
