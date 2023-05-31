import { createSlice } from '@reduxjs/toolkit';
import { refreshProfile, signin, signup, signout } from "./thunks";
import { ProfileState, sliceName } from './types';
import { createAsyncUpdater, setToLoading } from '../common';

const updateUser = createAsyncUpdater<ProfileState>((state, result) => {
  state.user = 'user' in result ? result.user: state.user;
});

const userProfile = createSlice({
  name: sliceName,
  initialState: {
    loading: false,
  } as ProfileState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(refreshProfile.pending, setToLoading)
      .addCase(refreshProfile.fulfilled, updateUser)
      .addCase(signin.pending, setToLoading)
      .addCase(signin.fulfilled, updateUser)
      .addCase(signup.pending, setToLoading)
      .addCase(signup.fulfilled, updateUser)
      .addCase(signout.pending, setToLoading)
      .addCase(signout.fulfilled, updateUser)
  },
});

export const profileReducer = userProfile.reducer;