// nearbyClubsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Club } from '@/model/club';

interface NearbyClubsState {
  nearbyClubs: Club[];
}

const initialState: NearbyClubsState = {
  nearbyClubs: [],
};

const nearbyClubsSlice = createSlice({
  name: 'nearbyClubs',
  initialState,
  reducers: {
    setNearbyClubs: (state, action: PayloadAction<Club[]>) => {
      state.nearbyClubs = action.payload;
    },
  },
});

export const { setNearbyClubs } = nearbyClubsSlice.actions;

export default nearbyClubsSlice.reducer;
