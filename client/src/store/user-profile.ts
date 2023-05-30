import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from './store';
import { get } from '@/api';
import { User } from '@/types';

const path = '/profile';

interface ProfileState {
  loading: boolean;
  user?: User;
  error?: string;
}

const initialState: ProfileState = {
  loading: false,
};

const sliceName = 'userProfile';

type RefreshResult = {
  error?: string;
  user?: User;
};

export const refreshProfile = createAsyncThunk(
  `${sliceName}/refreshProfile`,
  async (): Promise<RefreshResult> => {
    const res = await get(path);
    if (res.ok) return { user: await res.json() };
    else if (res.status !== 401) return { error: (await res.json()).message };
    return {};
  },
);

const userProfile = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(refreshProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        state.user = action.payload.user;
      })
  },
});

export const selectProfile = (state: RootState) => state.profile.user;
export const selectLoading = (state: RootState) => state.profile.loading;
export const selectProfileError = (state: RootState) => state.profile.error;

export default userProfile.reducer;