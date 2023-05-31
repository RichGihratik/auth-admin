import { PayloadAction } from '@reduxjs/toolkit';

export interface AsyncState {
  loading: boolean;
}

type HasErrors = {
  error?: string;
}

export type ThunkResult<T extends AsyncState> = Omit<T, 'loading'> & HasErrors;

export function setToLoading<T extends AsyncState>(state: T) { 
  state.loading = true;
}

type Update<T extends AsyncState> = (state: T, result: ThunkResult<T>) => void;

export function createAsyncUpdater<T extends AsyncState>(updater: Update<T>) {
  return function updateUser(state: T, { payload }: PayloadAction<ThunkResult<T>>) {
    state.loading = false;
    updater(state, payload)
  }
}

export function isRequestFailed(item: unknown): item is HasErrors {
  return typeof item === 'object' && item !== null && 'error' in item;
}