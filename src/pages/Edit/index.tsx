import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
  Alert,
} from '@mui/material';
import { Delete, SaveAs, ArrowBackIosNew } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../components';
import { getCurrentUser, logOut } from '../../utils';
import { ISignUpRequest } from '../../models/apiModels';
import { AppRoutes } from '../../constants';
import { useDeleteUserMutation, useEditUserMutation, useGetAllUsersQuery } from '../../services';

const editFormInitialState: ISignUpRequest = {
  name: '',
  login: '',
  password: '',
};

function Edit() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [isDeleteOpened, setDeleteOpened] = useState(false);

  const { data, isLoading: isGetUsersLoading } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }] =
    useDeleteUserMutation();
  const [editUser, { isLoading: isEditLoading, isSuccess: isEditSuccess }] = useEditUserMutation();

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
  }, [data, setValue]);

  const handleDelete = async () => {
    await deleteUser(id);
    if (isDeleteSuccess) logOut();
    navigate(AppRoutes.WELCOME);
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
          <Paper elevation={2} sx={{ p: 3, position: 'relative' }}>
            {isGetUsersLoading ? (
              <CircularProgress />
            ) : (
              <>
                <IconButton
                  onClick={() => window.history.back()}
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
                  {t('pages.editPage.action')}
                </Typography>
                {isEditSuccess && (
                  <Alert severity="success" sx={{ mb: 1 }}>
                    {t('form.messages.successEdit')}
                  </Alert>
                )}
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
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'stretch', sm: 'center' }}
                  spacing={1}
                  sx={{ mt: 3 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={
                      isEditLoading ? <CircularProgress color="inherit" size={20} /> : <SaveAs />
                    }
                    color="success"
                  >
                    {t('pages.editPage.submitButton')}
                  </Button>
                  <Button
                    onClick={() => setDeleteOpened(true)}
                    variant="outlined"
                    startIcon={<Delete />}
                    color="error"
                  >
                    {t('pages.editPage.deleteButton')}
                  </Button>
                </Stack>
              </>
            )}
          </Paper>
        </Box>
      </Grid>
      <Modal
        isOpened={isDeleteOpened}
        onCancel={() => setDeleteOpened(false)}
        onConfirm={handleDelete}
        isLoading={isDeleteLoading}
      />
    </>
  );
}

export default Edit;
