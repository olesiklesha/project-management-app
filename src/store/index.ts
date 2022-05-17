import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardsSlice from './reducers/boardsSlice';
import authSlice from './reducers/auth';
import globalErrorSlice from './reducers/globalErrorSlice';
import { globalErrorSlice as globalErrorState } from './reducers/globalErrorSlice';
import { appApi } from '../services';

import { MiddlewareAPI, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn(action.payload);
    api.dispatch(globalErrorState.actions.updateError(action.payload));
  }

  return next(action);
};

const rootReducer = combineReducers({
  authSlice,
  boardsSlice,
  globalErrorSlice,
  [appApi.reducerPath]: appApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(appApi.middleware).concat(rtkQueryErrorLogger),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
