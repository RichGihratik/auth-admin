import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './user-profile';
import { refreshProfile } from './user-profile';

function setupStore() {
  const result = configureStore({
    reducer: {
      profile: profileReducer
    } 
  });

  result.dispatch(refreshProfile());

  return result
}

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch