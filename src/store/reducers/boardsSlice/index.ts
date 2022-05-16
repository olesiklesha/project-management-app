import { createSlice } from '@reduxjs/toolkit';
import { appApi } from '../../../services';
import { IBoard } from '../../../models/apiModels';

interface IBoardState {
  boards: IBoard[];
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
