import { createSlice } from '@reduxjs/toolkit';
import { IBoardData } from '../../../models';
import { appApi } from '../../../services';

export interface ITask {
  title: string;
  id: string;
  order: number;
}

export interface IColumn {
  title: string;
  id: string;
  order: number;
  tasks: ITask[];
}

interface IInitialState {
  data: IBoardData;
}

const initialState: IInitialState = {
  data: {
    title: '',
    description: '',
    id: '',
    columns: [],
  },
};

export const boardSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.getBoard.matchFulfilled,
      (state: IInitialState, { payload }) => {
        state.data = { ...payload };
      }
    );
  },
});

export default boardSlice.reducer;
