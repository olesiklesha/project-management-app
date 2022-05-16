import React, { useEffect, useState } from 'react';
import { AppBar, IconButton, Container, Toolbar, Box, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { AppRoutes } from '../../constants';
import { AppIcon } from '../';
import { LocaleSwitcher } from '../';
import CreateBoardButton from '../CreateBoardButton';
import UserMenu from '../UserMenu';

let timeout: TimeoutId;

function Header() {
  const [isStickied, setStickied] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        const val = window.scrollY > 10;
        setStickied(val);
      }, 10);
    };
  });

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        height: !isStickied ? '64px' : '54px',
        transition: 'height 0.3s',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: '100%',
          alignItems: 'center',
        }}
      >
        <Toolbar disableGutters sx={{ minHeight: { xs: '100%' }, display: 'flex', flexGrow: 1 }}>
          <Tooltip title={'boards'}>
            <IconButton component={RouterLink} to={AppRoutes.MAIN} aria-label="home-icon">
              <AppIcon />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <LocaleSwitcher />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <CreateBoardButton />
          </Box>
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
