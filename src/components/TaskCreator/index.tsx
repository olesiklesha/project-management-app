import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getCurrentUser } from '../../utils';
import { useCreateTaskMutation, useGetAllUsersQuery } from '../../services';

interface IFormData {
  title: string;
}

interface ICreateTask {
  toggleIsOpened: () => void;
  id: string;
}

function TaskCreator({ toggleIsOpened, id }: ICreateTask) {
  const { id: boardId } = useParams();
  const [userId, setUserId] = useState('');
  const { data, isLoading: isGetUsersLoading } = useGetAllUsersQuery();
  const [createTask] = useCreateTaskMutation();

  useEffect(() => {
    if (data) {
      const { id } = getCurrentUser(data);
      setUserId(id);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      title: '',
    },
    reValidateMode: 'onChange',
  });

  const { t } = useTranslation();

  const onSubmit = async (data: IFormData) => {
    createTask({
      boardId: String(boardId),
      columnId: id,
      body: {
        title: data.title,
        description: ' ',
        userId,
      },
    });
    toggleIsOpened();
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '25vw',
        rowGap: '1rem',
      }}
    >
      <Typography variant="h5" sx={{ fontFamily: 'Ubuntu', fontWeight: 500 }} align="center">
        {t('pages.boardPage.addTask')}
      </Typography>
      {isGetUsersLoading ? (
        <CircularProgress />
      ) : (
        <>
          <TextField
            {...register('title', { required: t('form.errors.noTitle') })}
            type="text"
            placeholder={t('pages.boardPage.taskCreatorPlaceholder')}
            fullWidth
            inputProps={{
              style: {
                fontSize: '1.25rem',
                fontWeight: 'bold',
              },
            }}
            error={!!errors.title}
            helperText={errors.title?.message}
            autoFocus
            label={t('pages.mainPage.fieldTitle')}
            variant="standard"
            sx={{ mb: 2, mt: 2, flexGrow: 1 }}
          />
          <Box>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              sx={{ p: '0.5rem 1.25rem', mr: '1rem' }}
            >
              {t('actions.create')}
            </Button>
            <Button onClick={toggleIsOpened}>{t('actions.cancel')}</Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default TaskCreator;
