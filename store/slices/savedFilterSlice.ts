// savedFilterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  distance: number[];
  rating: number[];
  level: number[];
  tags: string[];
}

const initialState: FilterState = {
  distance: [0],
  rating: [0],
  level: [0],
  tags: [],
};

const savedFilterSlice = createSlice({
  name: 'savedFilter',
  initialState,
  reducers: {
    setSavedFilter(_state, action: PayloadAction<FilterState>) {
      return action.payload;
    },
  },
});

export const { setSavedFilter } = savedFilterSlice.actions;
export default savedFilterSlice.reducer;
