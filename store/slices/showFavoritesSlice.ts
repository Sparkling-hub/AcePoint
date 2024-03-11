import { createSlice } from '@reduxjs/toolkit';

const showFavoritesSlice = createSlice({
  name: 'showFavorites',
  initialState: {
    showFavorites: false,
  },
  reducers: {
    setShowFavorites(state, action) {
      state.showFavorites = action.payload;
    },
  },
});

export const { setShowFavorites } = showFavoritesSlice.actions;
export default showFavoritesSlice.reducer;
