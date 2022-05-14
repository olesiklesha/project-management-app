import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IModalForm } from '../../models/models';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../store/reducers/boardsSlice';

interface IEditorState {
  name: string;
}

function BoardEditor({ onCancel }: IModalForm) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { target } = useAppSelector((state) => state.editModalSlice);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IEditorState>({
    defaultValues: {
      name: target ? target.title : '',
    },
  });

  const onSubmit = (data: IEditorState) => {
    if (!target) return;
    dispatch(boardsSlice.actions.editBoard({ title: data.name, id: target.id }));
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
        {t('pages.mainPage.editBoardTitle')}
      </Typography>
      <TextField
        label={t('pages.mainPage.fieldTitle')}
        variant="standard"
        fullWidth
        sx={{ mb: 2, mt: 2 }}
        {...register('name', { required: t('form.errors.noTitle') })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Button type="submit" variant="contained" sx={{ width: '45%' }}>
        {t('actions.edit')}
      </Button>
    </Box>
  );
}

export default BoardEditor;
