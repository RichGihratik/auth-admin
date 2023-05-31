import { AsyncState } from '../common';
import { User } from '@/types';

export const sliceName = 'users';

export interface UsersState extends AsyncState {
  list?: User[];
}
