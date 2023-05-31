import { AsyncState } from '../common';
import { User } from '@/types';

export const sliceName = 'profile';

export interface ProfileState extends AsyncState {
  user?: User;
}
