import { createSlice } from "@reduxjs/toolkit"

const UserData = {}

const editProfileSlice = createSlice({
    name: "editProfile",
    initialState: {
        UserData
    },
    reducers: {
        updateProfile(state, action) {
            state.UserData = { ...state.UserData, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateProfile, (state, action) => {
            state.UserData = action.payload;
        });
    },
})

export const { updateProfile } = editProfileSlice.actions
export default editProfileSlice.reducer