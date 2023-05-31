import { configureStore } from '@reduxjs/toolkit';
import { profileReducer, refreshProfile } from './profile';
import { usersReducer } from './users';

async function setupStore() {
  const result = configureStore({
    reducer: {
      users: usersReducer, 
      profile: profileReducer
    } 
  });

  result.dispatch(refreshProfile());

  return result
}

export const store = await setupStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch