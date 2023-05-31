import { configureStore } from '@reduxjs/toolkit';
import { profileReducer, refreshProfile } from './profile';
import { usersReducer } from './users';

function setupStore() {
  const result = configureStore({
    reducer: {
      users: usersReducer, 
      profile: profileReducer
    } 
  });

  result.dispatch(refreshProfile());

  return result;
}

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch