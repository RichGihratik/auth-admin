import { RootState } from '../store';

export const selectProfile = (state: RootState) => state.profile.user;
export const selectProfileLoading = (state: RootState) => state.profile.loading;