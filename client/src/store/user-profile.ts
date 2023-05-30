import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { get, post } from '@/api';
import { User } from '@/types';

const sliceName = 'userProfile';

// THUNKS
// ==================

type ThunkResult = {
  error?: string;
  user?: User;
};

export function isAuthDispatchSuccess(item: unknown): item is Omit<Required<ThunkResult>, 'error'> {
  return typeof item === 'object' && item !== null && 'user' in item;
}

export function isAuthDispatchFailure(item: unknown): item is Omit<Required<ThunkResult>, 'user'> {
  return typeof item === 'object' && item !== null && 'error' in item;
}

async function getProfile(): Promise<ThunkResult> {
  const res = await get('/profile');
  if (res.ok) return { user: await res.json() };
  else if (res.status !== 401) return { user: undefined, error: (await res.json()).message };
  return { user: undefined };
}

export const refreshProfile = createAsyncThunk(
  `${sliceName}/refreshProfile`,
  getProfile,
);

type SigninInput = {
  email: string;
  password: string;
}

export const signin = createAsyncThunk(
  `${sliceName}/signin`,
  async (body: SigninInput): Promise<ThunkResult> => {
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
  async (body: SignupInput): Promise<ThunkResult> => {
    const res = await post('/auth/signup', body);
    if (!res.ok) return { error: (await res.json()).message };
    else return await getProfile();
  },
);

export const signout = createAsyncThunk(
  `${sliceName}/signout`,
  async (): Promise<ThunkResult> => {
    const res = await post('/auth/signout');
    if (!res.ok) return { error: (await res.json()).message };
    else return { user: undefined };
  },
);


// SLICE
// ==================
interface ProfileState {
  loading: boolean;
  user?: User;
}

const setLoading = (state: ProfileState) => { 
  state.loading = true;
}

const updateUser = (state: ProfileState, { payload }: PayloadAction<ThunkResult>) => {
  state.loading = false;
  state.user = 'user' in payload ? payload.user: state.user;
}

const userProfile = createSlice({
  name: sliceName,
  initialState: {
    loading: false,
  } as ProfileState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(refreshProfile.pending, setLoading)
      .addCase(refreshProfile.fulfilled, updateUser)
      .addCase(signin.pending, setLoading)
      .addCase(signin.fulfilled, updateUser)
      .addCase(signup.pending, setLoading)
      .addCase(signup.fulfilled, updateUser)
      .addCase(signout.pending, setLoading)
      .addCase(signout.fulfilled, updateUser)
  },
});

// SELECTORS
// ==================

export const selectProfile = (state: RootState) => state.profile.user;
export const selectLoading = (state: RootState) => state.profile.loading;

export default userProfile.reducer;