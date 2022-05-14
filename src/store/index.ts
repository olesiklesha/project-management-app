import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardsSlice from './reducers/boardsSlice';
import authSlice from './reducers/auth';
import boardCreatorSlice from './reducers/boardCreatorSlice';
import deleteModalSlice from './reducers/deleteModalSlice';
import { appApi } from '../services';

const rootReducer = combineReducers({
  authSlice,
  boardsSlice,
  boardCreatorSlice,
  deleteModalSlice,
  [appApi.reducerPath]: appApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
