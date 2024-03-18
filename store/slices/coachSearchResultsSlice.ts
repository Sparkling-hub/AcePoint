// coachSearchResultsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coach } from '@/model/coach';

interface CoachSearchState {
  coachSearchResults: Coach[];
}

const initialState: CoachSearchState = {
  coachSearchResults: [],
};

const coachSearchResultsSlice = createSlice({
  name: 'coachSearchResults',
  initialState,
  reducers: {
    setCoachSearchResults: (state, action: PayloadAction<Coach[]>) => {
      state.coachSearchResults = action.payload;
    },
  },
});

export const { setCoachSearchResults } = coachSearchResultsSlice.actions;

export default coachSearchResultsSlice.reducer;
