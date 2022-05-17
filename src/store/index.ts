import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardsSlice from './reducers/boardsSlice';
import authSlice from './reducers/auth';
import globalErrorSlice from './reducers/globalErrorSlice';
import boardSlice from './reducers/board';
import { appApi } from '../services';
import { rtkQueryErrorLogger } from './middlewares';

const rootReducer = combineReducers({
  authSlice,
  boardSlice,
  boardsSlice,
  globalErrorSlice,
  [appApi.reducerPath]: appApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(appApi.middleware, rtkQueryErrorLogger),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
