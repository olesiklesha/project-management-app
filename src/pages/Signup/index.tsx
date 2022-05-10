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
} from '@mui/material';
import { AppRoutes } from '../../constants';
import { AppIcon } from '../../components';
import { ISignUpRequest } from '../../models/apiModels';
import { useSignUpMutation, useSignInMutation } from '../../services';
import { isAuth } from '../../utils';

const signUpFormInitialState: ISignUpRequest = {
  name: '',
  login: '',
  password: '',
};

function SignUpPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();
  const [signIn, { isLoading: isSignInLoading }] = useSignInMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignUpRequest>({
    defaultValues: signUpFormInitialState,
  });

  const onSubmit = async (request: ISignUpRequest) => {
    await signUp(request);
    await signIn({ login: request.login, password: request.password });
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
          <Paper elevation={6} sx={{ p: 3 }}>
            <Typography
              component="h5"
              variant="h5"
              fontWeight={500}
              align="center"
              sx={{ marginY: 2 }}
            >
              {t('pages.signUpPage.action')}
            </Typography>
            <TextField
              label={t('form.fields.name')}
              variant="standard"
              sx={{ mb: 1 }}
              fullWidth
              {...register('name', { required: t('form.errors.noName') })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
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
              startIcon={
                (isSignUpLoading || isSignInLoading) && (
                  <CircularProgress color="secondary" size={20} />
                )
              }
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              disabled={isSignUpLoading || isSignInLoading}
            >
              {t('pages.signUpPage.signUpButton')}
            </Button>
            <Divider>{t('pages.signUpPage.or')}</Divider>
            <Link
              component={BrowserLink}
              to={AppRoutes.LOG_IN}
              color="text.primary"
              underline="hover"
              sx={{ display: 'block', textAlign: 'center', mt: 2 }}
            >
              {t('pages.signUpPage.loginLink')}
            </Link>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}

export default SignUpPage;
