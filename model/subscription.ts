import { Timestamp } from 'firebase/firestore';
import { subscriptionEnum } from './subscriptionEnum';

export class Subscription {
  id?: string;
  coachId?: string;
  startDate?: Timestamp;
  endDate?: Timestamp;
  status?: subscriptionEnum;
  renew?: boolean;
}
// 0aCcYVoq5NONUSLzjWla8hmDEUF3
