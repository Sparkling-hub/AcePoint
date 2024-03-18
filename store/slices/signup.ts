import { createSlice } from "@reduxjs/toolkit"


const signUpSlice = createSlice({
    name: "signUp",
    initialState: {
        isLoading:true,
        user:{},
        userEmailPassword:{}
    },
    reducers: {
        signUpData(state, action) {
            state.user = { ...state.user, ...action.payload };
        },
        userEmailPassword(state, action) {
            state.userEmailPassword = {...state.userEmailPassword, ...action.payload};
        },
        refreshAllData(state) {
            state.userEmailPassword = {};
            state.user = {};
        },
        setLoading(state, action) {
            state.isLoading = action.payload ;
        },
    },
})

export const { signUpData,setLoading,userEmailPassword,refreshAllData } = signUpSlice.actions
export default signUpSlice.reducer