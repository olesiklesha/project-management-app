import React from 'react';
import { Header } from './components';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './constants';
import { BoardPage, ErrorPage, LoginPage, MainPage, WelcomePage } from './pages';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={AppRoutes.WELCOME} element={<WelcomePage />} />
        <Route path={AppRoutes.MAIN} element={<MainPage />} />
        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        <Route path={AppRoutes.BOARD} element={<BoardPage />} />
        <Route path={AppRoutes.ERROR} element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
