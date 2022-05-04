import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants';

function Welcome() {
  return (
    <>
      <h1>this is welcome page</h1>
      <Button component={Link} to={AppRoutes.LOG_IN}>
        Log in
      </Button>
      <Button component={Link} to={AppRoutes.SIGN_IN}>
        Sign in
      </Button>
    </>
  );
}

export default Welcome;
