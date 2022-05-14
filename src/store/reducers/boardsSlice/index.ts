import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IShortBoard } from '../../../models';

interface CountState {
  boards: IShortBoard[];
}

const initialState: CountState = {
  boards: [],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoards: (state, action: PayloadAction<IShortBoard>) => {
      state.boards.push(action.payload);
    },
    deleteBoards: (state, action: PayloadAction<string>) => {
      state.boards.map((el) => el.id !== action.payload);
    },
  },
});

export default boardsSlice.reducer;
