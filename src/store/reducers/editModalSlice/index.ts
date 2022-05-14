import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IShortBoard } from '../../../models';

interface IEditModal {
  isEditModalOpened: boolean;
  target: IShortBoard | null;
}

const initialState: IEditModal = {
  isEditModalOpened: false,
  target: null,
};

export const editModalSlice = createSlice({
  name: 'edit-modal',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<IShortBoard>) => {
      state.isEditModalOpened = true;
      state.target = action.payload;
    },
    close: (state) => {
      state.isEditModalOpened = false;
      state.target = null;
    },
  },
});

export default editModalSlice.reducer;
