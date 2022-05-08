import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { useTranslation } from 'react-i18next';

function Welcome() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('pages.welcomePage.title')}</h1>
      <Button component={Link} to={AppRoutes.LOG_IN}>
        {t('pages.welcomePage.logInButton')}
      </Button>
      <Button component={Link} to={AppRoutes.SIGN_UP}>
        {t('pages.welcomePage.signUpButton')}
      </Button>
    </>
  );
}

export default Welcome;
