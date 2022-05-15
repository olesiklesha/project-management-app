import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IModalForm } from '../../models/models';
import { useCreateBoardMutation } from '../../services';

interface ICreatorState {
  title: string;
}

const initialState = {
  title: '',
};

function BoardCreator({ onCancel }: IModalForm) {
  const [createBoard] = useCreateBoardMutation();
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreatorState>({
    defaultValues: initialState,
  });

  const onSubmit = (data: ICreatorState) => {
    createBoard(data.title);

    onCancel();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" sx={{ fontFamily: 'Ubuntu', fontWeight: 500 }} align="center">
        {t('pages.mainPage.createBtn')}
      </Typography>
      <TextField
        label={t('pages.mainPage.fieldTitle')}
        variant="standard"
        sx={{ mb: 2, mt: 2 }}
        fullWidth
        {...register('title', { required: t('form.errors.noTitle') })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <Button type="submit" variant="contained" sx={{ width: '45%' }}>
        {t('actions.create')}
      </Button>
    </Box>
  );
}

export default BoardCreator;
