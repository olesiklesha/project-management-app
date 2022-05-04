import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../constants';

// test implementation of header

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.clear();
    navigate(AppRoutes.WELCOME);
  };

  return (
    <header>
      <Button component={RouterLink} to={AppRoutes.MAIN} variant="text">
        this is logo
      </Button>
      <Button component={RouterLink} to={AppRoutes.BOARD} variant="text">
        board
      </Button>
      <Button component={RouterLink} to={AppRoutes.EDIT} variant="text">
        Edit profile
      </Button>
      <Button onClick={handleLogout} variant="text">
        log out
      </Button>
    </header>
  );
}

export default Header;
