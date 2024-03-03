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
    setDistance(state, action: PayloadAction<number[]>) {
      state.distance = action.payload;
    },
    setRating(state, action: PayloadAction<number[]>) {
      state.rating = action.payload;
    },
    setLevel(state, action: PayloadAction<number[]>) {
      state.level = action.payload;
    },
    setTags(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
    },
    setSavedFilter(_state, action: PayloadAction<FilterState>) {
      return action.payload;
    },
  },
});

export const { setDistance, setRating, setLevel, setTags, setSavedFilter } =
  savedFilterSlice.actions;
export default savedFilterSlice.reducer;
