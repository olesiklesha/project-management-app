import { createSlice } from '@reduxjs/toolkit';

interface CountState {
  count: number;
}

const initialState: CountState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export default counterSlice.reducer;
