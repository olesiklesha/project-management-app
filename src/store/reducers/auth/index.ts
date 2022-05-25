import { createSlice } from '@reduxjs/toolkit';
import { appApi } from '../../../services';
import { AUTH } from '../../../constants';
import { getLocalAuth } from '../../../utils';

interface IAuthState {
  login: string;
  token: string;
  tokenDate: number | null;
}

const defaultInitialState: IAuthState = {
  login: '',
  token: '',
  tokenDate: null,
};

const initialState = getLocalAuth() ?? defaultInitialState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeLogin: (state, action) => {
      state.login = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(appApi.endpoints.signIn.matchFulfilled, (state: IAuthState, { payload }) => {
      state.token = payload.token;
      state.tokenDate = Date.now();
      window.localStorage.setItem(AUTH, JSON.stringify(state));
    });
    builder.addMatcher(
      appApi.endpoints.editUser.matchFulfilled,
      (state: IAuthState, { payload }) => {
        state.login = payload.login;
        window.localStorage.setItem(AUTH, JSON.stringify(state));
      }
    );
  },
});

export default authSlice.reducer;
