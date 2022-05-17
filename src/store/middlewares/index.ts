import { MiddlewareAPI, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { globalErrorSlice } from '../reducers/globalErrorSlice';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    api.dispatch(globalErrorSlice.actions.updateError(action.payload));
  }

  return next(action);
};
