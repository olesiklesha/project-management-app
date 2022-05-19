import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { Home, Pageview } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface IBreadcrumbs {
  title: string;
}

function AppBreadcrumbs({ title }: IBreadcrumbs) {
  const { t } = useTranslation();
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mt: '1rem', ml: '1rem' }}>
      <Link
        component={NavLink}
        to={AppRoutes.MAIN}
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Ubuntu' }}
        color="inherit"
      >
        <Home sx={{ mr: 0.5 }} fontSize="inherit" color="primary" />
        {t('pages.mainPage.title')}
      </Link>
      <Typography
        sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Ubuntu' }}
        color="text.primary"
      >
        <Pageview sx={{ mr: 0.5 }} fontSize="inherit" color="primary" />
        {title}
      </Typography>
    </Breadcrumbs>
  );
}

export default AppBreadcrumbs;
