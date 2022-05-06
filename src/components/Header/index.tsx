import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { LocaleSelector } from '../';

// test implementation of header

function Header() {
  const { t } = useTranslation();
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
        {t('components.header.board')}
      </Button>
      <Button component={RouterLink} to={AppRoutes.EDIT} variant="text">
        {t('components.header.editProfile')}
      </Button>
      <LocaleSelector />
      <Button onClick={handleLogout} variant="text">
        {t('components.header.logOut')}
      </Button>
    </header>
  );
}

export default Header;
