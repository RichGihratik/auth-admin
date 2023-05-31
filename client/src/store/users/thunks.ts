import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName, UsersState } from './types';
import { ThunkResult } from '../common';
import { get, del, patch } from '@/api';

export type Result = ThunkResult<UsersState>;

async function getUsers(): Promise<Result> {
  const res = await get('/users');
  const result = await res.json();
  if (res.ok) return { list: result };
  else return { error: result.message };
}

export const refreshUsers = createAsyncThunk(
  `${sliceName}/refresh`,
  getUsers,
);

export const blockUsers = createAsyncThunk(
  `${sliceName}/block`,
  async (ids: number[]): Promise<Result> => {
    const res = await patch('/users/block', { blockIds: ids });
    if (!res.ok) return { error: (await res.json()).message };
    else return await getUsers();
  },
);

export const unblockUsers = createAsyncThunk(
  `${sliceName}/unblock`,
  async (ids: number[]): Promise<Result> => {
    const res = await patch('/users/unblock', { unblockIds: ids });
    if (!res.ok) return { error: (await res.json()).message };
    else return await getUsers();
  },
);

export const deleteUsers = createAsyncThunk(
  `${sliceName}/delete`,
  async (ids: number[]): Promise<Result> => {
    const res = await del('/users/delete', { deleteIds: ids });
    if (!res.ok) return { error: (await res.json()).message };
    else return await getUsers();
  },
);