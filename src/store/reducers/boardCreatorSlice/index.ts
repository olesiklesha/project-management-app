import { createSlice } from '@reduxjs/toolkit';

interface IBoardCreatorState {
  isOpen: boolean;
}

const initialState: IBoardCreatorState = {
  isOpen: false,
};

export const boardCreatorSlice = createSlice({
  name: 'create-boards-btn',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export default boardCreatorSlice.reducer;
