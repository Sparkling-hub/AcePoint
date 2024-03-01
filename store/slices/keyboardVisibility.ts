// In your store/slices/keyboardVisibility.ts file

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface KeyboardVisibilityState {
  keyboardVisible: boolean;
}

const initialState: KeyboardVisibilityState = {
  keyboardVisible: false,
};

const keyboardVisibilitySlice = createSlice({
  name: 'keyboardVisibility',
  initialState,
  reducers: {
    setKeyboardVisibility: (state, action: PayloadAction<boolean>) => {
      state.keyboardVisible = action.payload;
    },
  },
});

export const { setKeyboardVisibility } = keyboardVisibilitySlice.actions;

export default keyboardVisibilitySlice.reducer;
