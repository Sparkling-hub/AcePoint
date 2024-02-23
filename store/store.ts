import { configureStore } from '@reduxjs/toolkit';
import editProfileReducer from './slices/editProfile';
import userRoleReducer from './slices/userRole';

export const store = configureStore({
  reducer: {
    editProfile: editProfileReducer,
    userRole: userRoleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
