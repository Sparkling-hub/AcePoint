// tempFilterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TempFilterState {
  tempDistance: number[];
  tempRating: number[];
  tempLevel: number[];
  tempTags: string[];
}

const initialState: TempFilterState = {
  tempDistance: [0],
  tempRating: [0],
  tempLevel: [0],
  tempTags: [],
};

const tempFilterSlice = createSlice({
  name: 'tempFilter',
  initialState,
  reducers: {
    setTempDistance(state, action: PayloadAction<number[]>) {
      state.tempDistance = action.payload;
    },
    setTempRating(state, action: PayloadAction<number[]>) {
      state.tempRating = action.payload;
    },
    setTempLevel(state, action: PayloadAction<number[]>) {
      state.tempLevel = action.payload;
    },
    setTempTags(state, action: PayloadAction<string[]>) {
      state.tempTags = action.payload;
    },
    resetTempFilter(_state) {
      return initialState;
    },
  },
});

export const {
  setTempDistance,
  setTempRating,
  setTempLevel,
  setTempTags,
  resetTempFilter,
} = tempFilterSlice.actions;
export default tempFilterSlice.reducer;
