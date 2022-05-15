import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { AppIcon } from '../../components';
import { apiErrorParser } from '../../utils';
import { IRequestError, ISignInRequest, ISignUpRequest } from '../../models/apiModels';
import { Link as BrowserLink } from 'react-router-dom';
import { AppRoutes } from '../../constants';

const editFormInitialState: ISignUpRequest = {
  name: '',
  login: '',
  password: '',
};

function Edit() {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignUpRequest>({
    defaultValues: editFormInitialState,
  });

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        component={Container}
        sx={{ height: 'calc(100vh - 128px)' }}
      >
        <Box component="form" maxWidth={500}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography
              component="h5"
              variant="h5"
              fontWeight={500}
              align="center"
              sx={{ marginY: 2 }}
            >
              {t('pages.editPage.action')}
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
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
              {t('pages.editPage.submitButton')}
            </Button>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}

export default Edit;
