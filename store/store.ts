// store.ts
import { configureStore } from '@reduxjs/toolkit';
import tempFilterReducer from './slices/tempFilterSlice';
import savedFilterReducer from './slices/savedFilterSlice';
import editProfileReducer from './slices/editProfile';
import userRoleReducer from './slices/userRole';
import showMapsReducer from './slices/showMapsSlice';
import showFavoritesReducer from './slices/showFavoritesSlice';

export const store = configureStore({
  reducer: {
    editProfile: editProfileReducer,
    userRole: userRoleReducer,
    tempFilter: tempFilterReducer,
    savedFilter: savedFilterReducer,
    showMaps: showMapsReducer,
    showFavorites: showFavoritesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
