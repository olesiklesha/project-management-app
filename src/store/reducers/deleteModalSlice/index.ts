import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDeleteModal {
  isDeleteModalOpened: boolean;
  targetId: string;
}

const initialState: IDeleteModal = {
  isDeleteModalOpened: false,
  targetId: '',
};

export const deleteModalSlice = createSlice({
  name: 'delete-modal',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<string>) => {
      state.isDeleteModalOpened = true;
      state.targetId = action.payload;
    },
    close: (state) => {
      state.isDeleteModalOpened = false;
      state.targetId = '';
    },
  },
});

export default deleteModalSlice.reducer;
