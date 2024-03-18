import { createSlice } from '@reduxjs/toolkit';

const filterIsLoadingSlice = createSlice({
  name: 'filterIsLoading',
  initialState: {
    filterIsLoading: false,
  },
  reducers: {
    setFilterIsLoading(state, action) {
      state.filterIsLoading = action.payload;
    },
  },
});

export const { setFilterIsLoading } = filterIsLoadingSlice.actions;
export default filterIsLoadingSlice.reducer;
