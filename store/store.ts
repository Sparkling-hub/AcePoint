// store.ts
import { configureStore } from '@reduxjs/toolkit';
import tempFilterReducer from './slices/tempFilterSlice';
import savedFilterReducer from './slices/savedFilterSlice';
import editProfileReducer from './slices/editProfile';
import userRoleReducer from './slices/userRole';
import showMapsReducer from './slices/showMapsSlice';
import showFavoritesReducer from './slices/showFavoritesSlice';
import coachSearchResultsReducer from './slices/coachSearchResultsSlice';
import clubSearchResultsReducer from './slices/clubSearchResultsSlice';
import filterIsLoadingReducer from './slices/filterIsLoadingSlice';

export const store = configureStore({
  reducer: {
    editProfile: editProfileReducer,
    userRole: userRoleReducer,
    tempFilter: tempFilterReducer,
    savedFilter: savedFilterReducer,
    showMaps: showMapsReducer,
    showFavorites: showFavoritesReducer,
    coachSearchResults: coachSearchResultsReducer,
    clubSearchResults: clubSearchResultsReducer,
    filterIsLoading: filterIsLoadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
