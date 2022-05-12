import { combineReducers, configureStore } from '@reduxjs/toolkit';
import testSlice from './reducers/testSlice';
import authSlice from './reducers/auth';
import { appApi } from '../services';

const rootReducer = combineReducers({
  testSlice,
  authSlice,
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
