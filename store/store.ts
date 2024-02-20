import { configureStore } from '@reduxjs/toolkit';
import editProfileReducer from './slices/editProfile';

export const store = configureStore({
  reducer: {
    editProfile: editProfileReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;