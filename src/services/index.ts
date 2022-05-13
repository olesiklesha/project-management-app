import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ISignUpRequest,
  IUserData,
  ISignInRequest,
  ISignInResponse,
  IBoard,
  IBoardData,
} from '../models/apiModels';
import { authSlice } from '../store/reducers/auth';
import { RootState } from '../store';

const BASE_URL = 'https://cream-task-app.herokuapp.com/';

const appApi = createApi({
  reducerPath: 'appApi',
  tagTypes: ['Users', 'Boards'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<IUserData, ISignUpRequest>({
      query: (body: ISignUpRequest) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
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
    getAllUsers: builder.query<IUserData[], void>({
      query: () => ({ url: '/users' }),
      providesTags: ['Users'],
    }),
    getUser: builder.query<IUserData, string>({
      query: (id: string) => ({ url: `/users/${id}` }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    editUser: builder.mutation<ISignUpRequest, { id: string; body: ISignUpRequest }>({
      query: (data) => {
        const { id, body } = data;
        return {
          url: `/users/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Users'],
    }),
    getAllBoards: builder.query<IBoard[], void>({
      query: () => ({ url: '/boards' }),
      providesTags: ['Boards'],
    }),
    createBoard: builder.mutation<IBoard, string>({
      query: (title: string) => ({
        url: '/boards',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Boards'],
    }),
    getBoard: builder.query<IBoardData, string>({
      query: (id: string) => ({ url: `/boards/${id}` }),
    }),
    deleteBoard: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),
    editBoard: builder.mutation<IBoard, { id: string; title: string }>({
      query: (data) => {
        const { id, title } = data;
        return {
          url: `/boards/${id}`,
          method: 'PUT',
          body: { title },
        };
      },
      invalidatesTags: ['Boards'],
    }),
  }),
});

const {
  useSignUpMutation,
  useSignInMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetAllBoardsQuery,
  useCreateBoardMutation,
  useGetBoardQuery,
  useDeleteBoardMutation,
  useEditBoardMutation,
} = appApi;

export {
  appApi,
  useSignUpMutation,
  useSignInMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetAllBoardsQuery,
  useCreateBoardMutation,
  useGetBoardQuery,
  useDeleteBoardMutation,
  useEditBoardMutation,
};

// const [deleteUser, { isLoading, error, isError }] = useDeleteUserMutation();
// deleteUser('3836f8bf-3248-4269-b351-750ae8faf9a9');
//
// const [editUser, { isLoading, error, isError }] = useEditUserMutation();
// const response = editUser({
//   id: '2222e422-95ce-490a-a198-ce8df7dccd5f',
//   body: { name: 'Slava', login: 'Ukraine', password: '123456' },
// });
//
// const { data, isLoading } = useGetAllBoardsQuery();
//
// const [createBoard, { isLoading, error, isError }] = useCreateBoardMutation();
// const response = createBoard('Create backend');
//
// const { data, isLoading } = useGetBoardQuery('1639b95c-69a1-42bb-92a1-01d3b99f9808');
//
// const [deleteBoard, { isLoading, error, isError }] = useDeleteBoardMutation();
// deleteBoard('833c58c0-af75-4c70-8790-be115914aefb');
//
// const [editBoard, { isLoading, error, isError }] = useEditBoardMutation();
// const response = editBoard({
//   id: 'a4ffa45a-cfc9-4150-b58e-4d417aefe7ec',
//   title: 'Create frontend',
// });
