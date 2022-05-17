import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ISignUpRequest,
  IUserData,
  ISignInRequest,
  ISignInResponse,
  IBoard,
  IBoardData,
  IColumn,
  IColumnData,
  ITask,
  ITaskRequest,
} from '../models/apiModels';
import { authSlice } from '../store/reducers/auth';
import { RootState } from '../store';

const BASE_URL = 'https://cream-task-app.herokuapp.com/';

const appApi = createApi({
  reducerPath: 'appApi',
  tagTypes: ['Users', 'Boards', 'Columns', 'Tasks'],
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
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    signIn: builder.mutation<ISignInResponse, ISignInRequest>({
      query: (body) => ({
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
      query: (id) => ({ url: `/users/${id}` }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    editUser: builder.mutation<ISignUpRequest, { id: string; body: ISignUpRequest }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),
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
      providesTags: ['Columns'],
    }),
    deleteBoard: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),
    editBoard: builder.mutation<IBoard, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `/boards/${id}`,
        method: 'PUT',
        body: { title },
      }),
      invalidatesTags: ['Boards'],
    }),
    getAllColumns: builder.query<IColumn[], string>({
      query: (boardId) => ({ url: `/boards/${boardId}/columns` }),
      providesTags: ['Columns'],
    }),
    createColumn: builder.mutation<IColumn, { id: string; body: Omit<IColumn, 'id'> }>({
      query: ({ id, body }) => ({
        url: `/boards/${id}/columns`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Columns'],
    }),
    getColumn: builder.query<IColumnData, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({ url: `/boards/${boardId}/columns/${columnId}` }),
    }),
    deleteColumn: builder.mutation<void, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Columns'],
    }),
    editColumn: builder.mutation<
      IColumn,
      { boardId: string; columnId: string; body: Omit<IColumn, 'id'> }
    >({
      query: ({ boardId, columnId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Columns'],
    }),
    getAllTasks: builder.query<ITask[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
      }),
      providesTags: ['Tasks'],
    }),
    createTask: builder.mutation<ITask, { boardId: string; columnId: string; body: ITaskRequest }>({
      query: ({ boardId, columnId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tasks'],
    }),
    getTask: builder.query<ITask, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      }),
    }),
    deleteTask: builder.mutation<void, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
    editTask: builder.mutation<
      ITask,
      { boardId: string; columnId: string; taskId: string; body: Omit<ITask, 'id'> }
    >({
      query: ({ boardId, columnId, taskId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Tasks'],
    }),
    uploadFile: builder.mutation<void, BinaryData>({
      query: (file) => ({
        url: `/file`,
        headers: {
          'content-type': 'multipart/form-data',
        },
        method: 'POST',
        body: file,
      }),
    }),
    getFile: builder.query<BinaryData, { taskId: string; filename: string }>({
      query: ({ taskId, filename }) => ({
        url: `/file/${taskId}/${filename}`,
      }),
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
  useGetAllColumnsQuery,
  useCreateColumnMutation,
  useGetColumnQuery,
  useDeleteColumnMutation,
  useEditColumnMutation,
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useGetTaskQuery,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useUploadFileMutation,
  useGetFileQuery,
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
  useGetAllColumnsQuery,
  useCreateColumnMutation,
  useGetColumnQuery,
  useDeleteColumnMutation,
  useEditColumnMutation,
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useGetTaskQuery,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useUploadFileMutation,
  useGetFileQuery,
};
