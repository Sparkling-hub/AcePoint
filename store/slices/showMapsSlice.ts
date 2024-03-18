import { createSlice } from '@reduxjs/toolkit';

const showMapsSlice = createSlice({
  name: 'showMaps',
  initialState: {
    showMaps: false,
  },
  reducers: {
    setShowMaps(state, action) {
      state.showMaps = action.payload;
    },
  },
});

export const { setShowMaps } = showMapsSlice.actions;
export default showMapsSlice.reducer;
