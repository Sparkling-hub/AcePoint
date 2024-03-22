// Importing createSlice function from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initializing the initial state of the calendar slice
const initialState = {
  option: 'D',
};

// Creating a calendar slice with a name, initial state, and a reducer function
const calendarSlice = createSlice({
  name: 'calendarSlice',
  initialState,
  reducers: {
    // Reducer function to set the calendar option
    setCalendarOption(state, action) {
      state.option = action.payload;
    },
  },
});

// Exporting the setCalendarOption action and the calendar reducer
export const { setCalendarOption } = calendarSlice.actions;
export default calendarSlice.reducer;
