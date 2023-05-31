import { createSlice } from '@reduxjs/toolkit';
import { refreshUsers, deleteUsers, blockUsers, unblockUsers } from "./thunks";
import { UsersState, sliceName } from './types';
import { createAsyncUpdater, setToLoading } from '../common';

const update = createAsyncUpdater<UsersState>((state, result) => {
  state.list = result.list;
});

const users = createSlice({
  name: sliceName,
  initialState: {
    loading: false,
  } as UsersState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(refreshUsers.pending, setToLoading)
      .addCase(refreshUsers.fulfilled, update)
      .addCase(deleteUsers.pending, setToLoading)
      .addCase(deleteUsers.fulfilled, update)
      .addCase(blockUsers.pending, setToLoading)
      .addCase(blockUsers.fulfilled, update)
      .addCase(unblockUsers.pending, setToLoading)
      .addCase(unblockUsers.fulfilled, update)
  },
});

export const usersReducer = users.reducer;