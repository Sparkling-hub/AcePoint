import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the coach slice
const initialState = {
    id: '',
    displayName: '',
    lessons: [],
};

// Create a coach slice with a name, initial state, and a reducer function
const coachSlice = createSlice({
    name: 'coachSlice',
    initialState,
    reducers: {
        // Reducer function to set the coach name
        setCoachName(state, action) {
            state.displayName = action.payload;
        },
        // Reducer function to set the coach ID
        setCoachId(state, action) {
            state.id = action.payload;
        },
        // Reducer function to set the coach's lessons
        setLessons(state, action) {
            state.lessons = action.payload;
        }
    },
});

// Export the setCoachName, setCoachId, and setLessons actions and the coach reducer
export const { setCoachName, setCoachId, setLessons } = coachSlice.actions;
export default coachSlice.reducer;