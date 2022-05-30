import { useForm } from 'react-hook-form';
import { Avatar, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEditTaskMutation, useGetTaskQuery, useGetUserQuery } from '../../services';
import { AppIcon } from '..';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { BaseSyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomizedTextareaAutosize } from './TextArea.styled';

interface ITaskModalProps {
  boardId: string;
  columnId: string;
  taskId: string;
  description: string;
  title: string;
  toggleIsEditorOpened: () => void;
}

interface IFormrState {
  description: string;
  title: string;
}

function TaskModal({ boardId, columnId, taskId, description, title }: ITaskModalProps) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editTask] = useEditTaskMutation();
  const { data: columnData, isSuccess } = useGetTaskQuery({
    boardId,
    columnId,
    taskId,
  });
  const { data } = useGetUserQuery(isSuccess ? columnData.userId : skipToken);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormrState>({
    defaultValues: {
      title: title,
      description: description.trim(),
    },
  });

  const onSubmit = ({ description, title }: IFormrState, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    if (isSuccess) {
      const formDescription = description ?? ' ';
      const formTitle = title;
      setIsEditing(false);
      editTask({
        boardId,
        columnId,
        taskId,
        body: {
          title: formTitle,
          order: columnData.order,
          description: formDescription,
          userId: columnData.userId,
          boardId,
          columnId,
        },
      });
    }
  };

  return isSuccess ? (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '1rem',
          minWidth: '33vw',
          maxWidth: { md: '50vw', lg: '35vw' },
          mb: '1.5rem',
        }}
      >
        <AppIcon fontSize="large" />
        <TextField
          {...register('title', { required: t('form.errors.noTitle') })}
          variant="standard"
          type="text"
          size="small"
          sx={{
            width: '100%',
            minHeight: '2rem',
            '& .MuiInput-root::before': {
              borderBottom: `none`,
            },
          }}
          onClick={() => setIsEditing(true)}
          inputProps={{
            style: {
              padding: '10px 0',
              fontSize: '1.25rem',
              fontWeight: 'bold',
            },
          }}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '1rem',
          minWidth: '33vw',
          mb: '1rem',
          ml: '3rem',
        }}
      >
        <Avatar>{data?.name[0].toUpperCase()}</Avatar>
        <Typography sx={{ fontSize: '1rem' }}>{data?.name}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '1rem',
          minWidth: '30vw',
          mb: '1rem',
        }}
      >
        <DehazeIcon color="secondary" fontSize="large" />
        <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold', width: '100%' }}>
          {t('components.popper.description')}
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <CustomizedTextareaAutosize
          {...register('description')}
          placeholder={t('components.popper.placeholder')}
          onClick={() => setIsEditing(true)}
          minRows={4}
          autoFocus
        />
        {isEditing && (
          <>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              sx={{ marginLeft: '3rem', marginRight: '0.5rem' }}
              type="submit"
            >
              {t('components.popper.submit')}
            </Button>
            <Button
              size="small"
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
            >
              {t('components.popper.cancel')}
            </Button>
          </>
        )}
      </Box>
    </>
  ) : (
    <CircularProgress />
  );
}

export default TaskModal;
