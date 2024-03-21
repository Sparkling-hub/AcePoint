import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    displayName: '',
    lessons: [],
};

const coachSlice = createSlice({
    name: 'coachSlice',
    initialState,
    reducers: {
        setCoachName(state, action) {
            state.displayName = action.payload;
        },
        setCoachId(state, action) {
            state.id = action.payload;
        },
        setLessons(state, action) {
            state.lessons = action.payload;
        }
    },
});

export const { setCoachName, setCoachId, setLessons } = coachSlice.actions;
export default coachSlice.reducer;