import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface BoardState {
  id: string;
  title: string;
  columns: IColumn[];
}

const initialState: BoardState = {
  id: '',
  title: 'Test',
  columns: [
    {
      title: 'My main Task',
      id: '11',
      order: 1,
      tasks: [
        {
          id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
          title: 'Task: pet the cat',
          order: 1,
        },
        {
          id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf8',
          title: 'Task: pet the dog',
          order: 1,
        },
      ],
    },
    {
      title: 'My main Task # 2',
      id: '12',
      order: 1,
      tasks: [
        {
          id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf6',
          title:
            'Task: pet the cat, pet the cat, pet the cat, pet the cat, pet the cat, pet the cat, pet the cat',
          order: 1,
        },
      ],
    },
  ],
};

export const boardSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<IColumn>) => {
      state.columns.push(action.payload);
    },
    deleteColumn: (state, action: PayloadAction<string>) => {
      state.columns = state.columns.filter((el) => el.id !== action.payload);
    },
    renameColumn: (state, action: PayloadAction<IColumn>) => {
      state.columns = state.columns.map((el) =>
        el.id === action.payload.id ? action.payload : el
      );
    },
    editTask: (state, action: PayloadAction<ITask>) => {
      state.columns = state.columns.map((column) => {
        return {
          title: column.title,
          id: column.id,
          order: column.order,
          tasks: column.tasks.map((task) =>
            task.id === action.payload.id ? action.payload : task
          ),
        };
      });
    },
    addTask: (state, action: PayloadAction<IColumn>) => {
      state.columns = state.columns.map((column) => {
        return column.id === action.payload.id
          ? {
              ...column,
              tasks: [...column.tasks, action.payload.tasks[0]],
            }
          : column;
      });
    },
  },
});

export default boardSlice.reducer;
