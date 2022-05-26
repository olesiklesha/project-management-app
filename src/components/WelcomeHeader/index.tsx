import { AppBar, BottomNavigation, Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { AppIcon } from '..';
import { isAuth } from '../../utils';

interface Props {
  goBack?: () => void | null;
}

function WelcomeHeader({ goBack }: Props) {
  const { t } = useTranslation();
  const token = isAuth();

  return (
    <AppBar color="primary" position="relative" sx={{ boxShadow: 'none' }}>
      <BottomNavigation component="nav" sx={{ padding: '16px', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AppIcon fontSize="large" />
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            sx={{
              mb: 0,
              ml: 1,
              fontFamily: 'Ubuntu',
              fontSize: '2rem',
              fontWeight: 'bold',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Cream
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 900 }}>
          {!token ? (
            <>
              <Button
                component={Link}
                to={AppRoutes.LOG_IN}
                color="secondary"
                sx={{ fontWeight: 900, color: 'black' }}
                onClick={goBack}
              >
                {t('pages.welcomePage.logInButton')}
              </Button>
              <Button
                component={Link}
                to={AppRoutes.SIGN_UP}
                color="secondary"
                variant="contained"
                sx={{ fontWeight: 900, fontSize: { xs: '0.75rem', sm: '1rem' } }}
                onClick={goBack}
              >
                {t('pages.welcomePage.signUpButton')}
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to={AppRoutes.MAIN}
              color="secondary"
              variant="contained"
              sx={{ fontWeight: 900 }}
              onClick={goBack}
            >
              {t('pages.welcomePage.goToMain')}
            </Button>
          )}
        </Box>
      </BottomNavigation>
    </AppBar>
  );
}

export default WelcomeHeader;
