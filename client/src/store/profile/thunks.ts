import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName, ProfileState } from './types';
import { ThunkResult } from '../common';
import { get, post } from '@/api';

export type Result = ThunkResult<ProfileState>;

async function getProfile(): Promise<Result> {
  const res = await get('/profile');
  if (res.ok) return { user: await res.json() };
  else if (res.status !== 401) return { user: undefined, error: (await res.json()).message };
  return { user: undefined };
}

export const refreshProfile = createAsyncThunk(
  `${sliceName}/refresh`,
  getProfile,
);

type SigninInput = {
  email: string;
  password: string;
}

export const signin = createAsyncThunk(
  `${sliceName}/signin`,
  async (body: SigninInput): Promise<Result> => {
    const res = await post('/auth/signin', body);
    if (!res.ok) return { error: (await res.json()).message };
    else return await getProfile();
  },
);

type SignupInput = SigninInput & {
  name: string;
}

export const signup = createAsyncThunk(
  `${sliceName}/signup`,
  async (body: SignupInput): Promise<Result> => {
    const res = await post('/auth/signup', body);
    if (!res.ok) return { error: (await res.json()).message };
    else return await getProfile();
  },
);

export const signout = createAsyncThunk(
  `${sliceName}/signout`,
  async (): Promise<Result> => {
    const res = await post('/auth/signout');
    if (!res.ok) return { error: (await res.json()).message };
    else return { user: undefined };
  },
);