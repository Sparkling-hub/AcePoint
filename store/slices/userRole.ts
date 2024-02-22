import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userRole: '',
};

const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    setUserRole(state, action) {
      state.userRole = action.payload;
    },
  },
});

export const { setUserRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
