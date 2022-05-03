import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AppRoutes } from '../../constants';

function Header() {
  return (
    <header>
      <Button component={RouterLink} to={AppRoutes.MAIN} variant="text" color="secondary">
        main
      </Button>
      <Button component={RouterLink} to={AppRoutes.LOGIN} variant="text">
        login
      </Button>
      <Button component={RouterLink} to={AppRoutes.BOARD} variant="text">
        board
      </Button>
    </header>
  );
}

export default Header;
