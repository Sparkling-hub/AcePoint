// coachSearchResultsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Club } from '@/model/club';

interface ClubSearchState {
  clubSearchResults: Club[];
}

const initialState: ClubSearchState = {
  clubSearchResults: [],
};

const clubSearchResultsSlice = createSlice({
  name: 'clubSearchResults',
  initialState,
  reducers: {
    setClubSearchResults: (state, action: PayloadAction<Club[]>) => {
      state.clubSearchResults = action.payload;
    },
  },
});

export const { setClubSearchResults } = clubSearchResultsSlice.actions;

export default clubSearchResultsSlice.reducer;
