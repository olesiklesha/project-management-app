import React from 'react';
import { ErrorBoundary, PrivateOutlet, RouteSwitch, ErrorWrapper } from './components';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './constants';

import {
  BoardPage,
  EditPage,
  ErrorPage,
  LoginPage,
  MainPage,
  SignUpPage,
  WelcomePage,
} from './pages';

function App() {
  return (
    <ErrorBoundary>
      <ErrorWrapper>
        <Routes>
          <Route path={AppRoutes.R_SWITCHER} element={<RouteSwitch />} />
          <Route path={AppRoutes.WELCOME} element={<WelcomePage />} />
          <Route path={AppRoutes.LOG_IN} element={<LoginPage />} />
          <Route path={AppRoutes.SIGN_UP} element={<SignUpPage />} />
          <Route path={AppRoutes.APP} element={<PrivateOutlet />}>
            <Route path={AppRoutes.MAIN} element={<MainPage />} />
            <Route path={AppRoutes.EDIT} element={<EditPage />} />
            <Route path={AppRoutes.BOARD} element={<BoardPage />} />
          </Route>
          <Route path={AppRoutes.ERROR} element={<ErrorPage />} />
        </Routes>
      </ErrorWrapper>
    </ErrorBoundary>
  );
}

export default App;
