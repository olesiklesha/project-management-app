import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoardData } from '../../../models/apiModels';
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
    id: '',
    columns: [],
  },
};

export const boardSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
  //   {addColumn: (state, action: PayloadAction<IColumn>) => {
  //     state.columns.push(action.payload);
  //   },
  //   deleteColumn: (state, action: PayloadAction<string>) => {
  //     state.columns = state.columns.filter((el) => el.id !== action.payload);
  //   },
  //   renameColumn: (state, action: PayloadAction<IColumn>) => {
  //     state.columns = state.columns.map((el) =>
  //       el.id === action.payload.id ? action.payload : el
  //     );
  //   },
  //   editTask: (state, action: PayloadAction<ITask>) => {
  //     state.columns = state.columns.map((column) => {
  //       return {
  //         title: column.title,
  //         id: column.id,
  //         order: column.order,
  //         tasks: column.tasks.map((task) =>
  //           task.id === action.payload.id ? action.payload : task
  //         ),
  //       };
  //     });
  //   },
  //   addTask: (state, action: PayloadAction<IColumn>) => {
  //     state.columns = state.columns.map((column) => {
  //       return column.id === action.payload.id
  //         ? {
  //             ...column,
  //             tasks: [...column.tasks, action.payload.tasks[0]],
  //           }
  //         : column;
  //     });
  //   },
  // }

  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.getBoard.matchFulfilled,
      (state: IInitialState, { payload }) => {
        // Object.assign(state.data, payload);
        state.data = { ...payload };
      }
    );
  },
});

export default boardSlice.reducer;
