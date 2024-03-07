import { CollectionReference, Timestamp } from 'firebase/firestore';
export class Coach {
  id?: string;
  certificationId?: CollectionReference;
  clubId?: CollectionReference;
  followedPlayer?: string[];
  createdAt?: Timestamp;
  displayName?: string;
  phoneNumber?: string;
  rating?: number;
  level?: number;
  subscription?: boolean;
  image?: string;
  age?: Date;
  country?: string;
  marketing?: boolean;
  terms?: boolean;
  tags?: string;
  bios?: string;
}
