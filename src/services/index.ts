import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ISignUpRequest,
  ISignUpResponse,
  ISignInRequest,
  ISignInResponse,
} from '../models/apiModels';
import { authSlice } from '../store/reducers/auth';

const BASE_URL = 'https://cream-task-app.herokuapp.com/';

const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    signUp: builder.mutation<ISignUpResponse, ISignUpRequest>({
      query: (body: ISignUpRequest) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
    signIn: builder.mutation<ISignInResponse, ISignInRequest>({
      query: (body: ISignInRequest) => ({
        url: '/signin',
        method: 'POST',
        body,
      }),
      async onQueryStarted({ login }, { dispatch }) {
        dispatch(authSlice.actions.changeLogin(login));
      },
    }),
  }),
});

const { useSignUpMutation, useSignInMutation } = appApi;

export { useSignUpMutation, useSignInMutation, appApi };
