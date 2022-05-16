import { createSlice } from '@reduxjs/toolkit';
import { IShortBoard } from '../../../models';
import { appApi } from '../../../services';

interface IBoardState {
  boards: IShortBoard[];
}

const initialState: IBoardState = {
  boards: [],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.getAllBoards.matchFulfilled,
      (state: IBoardState, { payload }) => {
        state.boards = payload;
      }
    );
  },
});

export default boardsSlice.reducer;
