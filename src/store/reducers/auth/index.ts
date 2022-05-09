import { createSlice } from '@reduxjs/toolkit';
import { appApi } from '../../../services';

interface IAuthState {
  login: string;
  token: string | null;
}

const initialState: IAuthState = {
  login: '',
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeLogin: (state, action) => {
      state.login = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(appApi.endpoints.signIn.matchFulfilled, (state, { payload }) => {
      state.token = payload.token;
    });
  },
});

export default authSlice.reducer;
