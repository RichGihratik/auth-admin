import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const refreshProfile = createAsyncThunk(
  `${sliceName}/refreshProfile`,
  async () => {
    const res = await get(path);
    const state: ProfileState = { loading: false };
    if (res.ok) state.user = await res.json();
    else if (res.status !== 401) state.error = (await res.json()).message;
    return state;
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
        state = action.payload;
      })
  },
});

export const selectProfile = (state: ProfileState) => state.user;
export const selectLoading = (state: ProfileState) => state.loading;

export default userProfile.reducer;