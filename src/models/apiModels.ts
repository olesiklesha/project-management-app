import { SerializedError } from '@reduxjs/toolkit';

interface IBackendError {
  status: number;
  data: {
    statusCode: number;
    message: string;
  };
}

type IRequestError = IBackendError | SerializedError | undefined;

interface ISignUpRequest {
  name: string;
  login: string;
  password: string;
}

interface ISignUpResponse {
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

export type { IRequestError, ISignUpRequest, ISignUpResponse, ISignInRequest, ISignInResponse };
