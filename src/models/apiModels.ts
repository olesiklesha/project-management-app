import { SerializedError } from '@reduxjs/toolkit';

interface IBackendError {
  status: number;
  data: {
    statusCode: number;
    message: string;
  };
}

interface IFetchError {
  status: string;
  error: string;
}

type IRequestError = IBackendError| IFetchError | SerializedError | undefined;

interface ISignUpRequest {
  name: string;
  login: string;
  password: string;
}

interface IUserData {
  id: string;
  name: string;
  login: string;
}

interface ISignInRequest {
  login: string;
  password: string;
}

interface ISignInResponse {
  token: string;
}

interface IBoard {
  id: string;
  title: string;
}

type IBoardData = IBoard & { columns: IColumnData[] };

interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

type ITaskRequest = Omit<ITask, 'id' | 'boardId' | 'columnId'>;

interface IColumn {
  id: string;
  title: string;
  order: number;
}

interface IColumnFiles {
  filename: string;
  fileSize: number;
}

type IColumnTask = Omit<ITask, 'boardId' | 'columnId'> & { files: IColumnFiles[]; done: boolean };

type IColumnData = IColumn & { tasks: IColumnTask[] };

export type {
  IRequestError,
  ISignUpRequest,
  IUserData,
  ISignInRequest,
  ISignInResponse,
  IBoard,
  IBoardData,
  ITask,
  ITaskRequest,
  IColumn,
  IColumnData,
};
