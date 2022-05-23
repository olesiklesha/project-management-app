import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useCreateBoardMutation } from '../../services';
import { Modal } from '..';

interface ICreatorState {
  title: string;
  description: string;
}

interface IBoardCreator {
  isOpened: boolean;
  onCancel: () => void;
}

const initialState = {
  title: '',
  description: '',
};

function BoardCreator({ isOpened, onCancel }: IBoardCreator) {
  const [createBoard] = useCreateBoardMutation();
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ICreatorState>({
    defaultValues: initialState,
  });

  const onSubmit = async ({ title, description }: ICreatorState) => {
    reset();
    onCancel();

    createBoard({
      title,
      description: description || ' ',
    });
  };

  return (
    <Modal isOpened={isOpened} onCancel={onCancel}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} maxWidth={500}>
        <Typography variant="h5" sx={{ fontFamily: 'Ubuntu', fontWeight: 500 }} align="center">
          {t('pages.mainPage.createBtn')}
        </Typography>
        <TextField
          label={t('pages.mainPage.fieldTitle')}
          variant="standard"
          sx={{ mb: 2, mt: 2, flexGrow: 1 }}
          fullWidth
          {...register('title', { required: t('form.errors.noTitle') })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          multiline
          rows={4}
          label={t('form.fields.description')}
          fullWidth
          sx={{ mb: 2 }}
          {...register('description')}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: '75%', display: 'flex', flexShrink: 0, m: '0 auto' }}
        >
          {t('actions.create')}
        </Button>
      </Box>
    </Modal>
  );
}

export default BoardCreator;
