import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  reducers: {
    addBoard: (state, action: PayloadAction<IShortBoard>) => {
      state.boards.push(action.payload);
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((el) => el.id !== action.payload);
    },
    editBoard: (state, action: PayloadAction<IShortBoard>) => {
      state.boards = state.boards.map((el) => (el.id === action.payload.id ? action.payload : el));
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.getAllBoards.matchFulfilled,
      (state: IBoardState, { payload }) => {
        state.boards = payload;
      }
    );
    builder.addMatcher(
      appApi.endpoints.createBoard.matchFulfilled,
      (state: IBoardState, { payload }) => {
        state.boards.push(payload);
      }
    );
  },
});

export default boardsSlice.reducer;
