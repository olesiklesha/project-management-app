import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link as BrowserLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Grid,
  Paper,
  Container,
  TextField,
  Button,
  Typography,
  Divider,
  Link,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import { AppRoutes } from '../../constants';
import { AppIcon } from '../../components';
import { ISignInRequest, IRequestError } from '../../models/apiModels';
import { useSignInMutation } from '../../services';
import { isAuth } from '../../utils';
import { apiErrorParser } from '../../utils';

const signInFormInitialState: ISignInRequest = {
  login: '',
  password: '',
};

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signIn, { isLoading, error, isError }] = useSignInMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInRequest>({
    defaultValues: signInFormInitialState,
  });

  useEffect(() => {
    if (isAuth()) navigate(AppRoutes.MAIN);
  }, [navigate]);

  const onSubmit = async (request: ISignInRequest) => {
    await signIn(request);
    if (isAuth()) navigate(AppRoutes.MAIN);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        component={Container}
        sx={{ height: '100vh' }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} maxWidth={500}>
          <Typography component="h1" fontSize={60} fontWeight={500} align="center" gutterBottom>
            <AppIcon color="secondary" sx={{ fontSize: 60, mr: 1 }} />
            Task-app
          </Typography>
          <Paper elevation={6} sx={{ p: 3, position: 'relative' }}>
            <IconButton
              onClick={() => navigate(AppRoutes.WELCOME)}
              sx={{ position: 'absolute', top: '10px', left: '10px' }}
            >
              <ArrowBackIosNew />
            </IconButton>
            <Typography
              component="h5"
              variant="h5"
              fontWeight={500}
              align="center"
              sx={{ marginY: 2 }}
            >
              {t('pages.loginPage.action')}
            </Typography>
            {isError && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {apiErrorParser(error as IRequestError, t)}
              </Alert>
            )}
            <TextField
              label={t('form.fields.login')}
              variant="standard"
              sx={{ mb: 1 }}
              fullWidth
              {...register('login', {
                required: t('form.errors.noLogin'),
                minLength: { value: 4, message: t('form.errors.minLengthLogin') },
              })}
              error={!!errors.login}
              helperText={errors.login?.message}
            />
            <TextField
              type="password"
              label={t('form.fields.password')}
              variant="standard"
              fullWidth
              {...register('password', {
                required: t('form.errors.noPassword'),
                minLength: { value: 6, message: t('form.errors.minLengthPassword') },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={isLoading && <CircularProgress color="secondary" size={20} />}
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {t('pages.loginPage.loginButton')}
            </Button>
            <Divider>{t('pages.loginPage.or')}</Divider>
            <Link
              component={BrowserLink}
              to={AppRoutes.SIGN_UP}
              color="text.primary"
              underline="hover"
              sx={{ display: 'block', textAlign: 'center', mt: 2 }}
            >
              {t('pages.loginPage.signUpLink')}
            </Link>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}

export default LoginPage;
