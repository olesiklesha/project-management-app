import { createSlice } from '@reduxjs/toolkit';
import { IRequestError } from '../../../models';

interface IGlobalErrorState {
  globalError: IRequestError;
}

const initialState: IGlobalErrorState = {
  globalError: undefined,
};

export const globalErrorSlice = createSlice({
  name: 'globalError',
  initialState,
  reducers: {
    updateError: (state, action) => {
      state.globalError = action.payload;
    },
  },
});

export default globalErrorSlice.reducer;
