import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  option: 'W',
};

const calendarSlice = createSlice({
  name: 'calendarSlice',
  initialState,
  reducers: {
    setCalendarOption(state, action) {
      state.option = action.payload;
    },
  },
});

export const { setCalendarOption } = calendarSlice.actions;
export default calendarSlice.reducer;
