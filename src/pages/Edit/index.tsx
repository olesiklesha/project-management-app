import React, { useState, useEffect } from 'react';
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
import { Delete, SaveAs } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { Link as BrowserLink } from 'react-router-dom';
import { AppIcon } from '../../components';
import { apiErrorParser, getCurrentUser, logOut } from '../../utils';
import { IRequestError, ISignInRequest, ISignUpRequest } from '../../models/apiModels';
import { AppRoutes } from '../../constants';
import { useDeleteUserMutation, useEditUserMutation, useGetAllUsersQuery } from '../../services';

const editFormInitialState: ISignUpRequest = {
  name: '',
  login: '',
  password: '',
};

function Edit() {
  const { t } = useTranslation();
  const [id, setId] = useState('');
  const { data, isLoading: isGetUsersLoading } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleteLoading, isError: isDeleteError }] =
    useDeleteUserMutation();
  const [editUser, { isLoading: isEditLoading }] = useEditUserMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ISignUpRequest>({
    defaultValues: editFormInitialState,
  });

  useEffect(() => {
    if (data) {
      const { id, login, name } = getCurrentUser(data);
      setValue('login', login);
      setValue('name', name);
      setId(id);
    }
  }, [data]);

  const handleDelete = async () => {
    await deleteUser(id);
    if (!isDeleteError) logOut();
  };

  const onSubmit = (data: ISignUpRequest) => {
    const { name, login, password } = data;
    editUser({
      id,
      body: { name, login, password },
    });
  };

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
        <Box component="form" onSubmit={handleSubmit(onSubmit)} maxWidth={500}>
          <Paper elevation={2} sx={{ p: 3 }}>
            {isGetUsersLoading ? (
              <CircularProgress />
            ) : (
              <>
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
                  label={t('form.fields.newPassword')}
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
                    isEditLoading ? <CircularProgress color="inherit" size={20} /> : <SaveAs />
                  }
                  color="success"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {t('pages.editPage.submitButton')}
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="outlined"
                  startIcon={
                    isDeleteLoading ? <CircularProgress color="inherit" size={20} /> : <Delete />
                  }
                  color="error"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {t('pages.editPage.deleteButton')}
                </Button>
              </>
            )}
          </Paper>
        </Box>
      </Grid>
    </>
  );
}

export default Edit;
