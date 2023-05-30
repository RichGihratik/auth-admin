import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './user-profile';
import { refreshProfile, signout } from './user-profile';

async function setupStore() {
  const result = configureStore({
    reducer: {
      profile: profileReducer
    } 
  });

  //await result.dispatch(signout());

  result.dispatch(refreshProfile());

  return result
}

export const store = await setupStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch