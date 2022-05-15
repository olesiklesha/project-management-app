import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../hooks/redux';
import { boardsSlice } from '../../store/reducers/boardsSlice';

interface IEditorState {
  title: string;
}

interface IEditorProps {
  id: string;
  title: string;
  onCancel: () => void;
}

function BoardEditor({ onCancel, id, title }: IEditorProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IEditorState>({
    defaultValues: {
      title,
    },
  });

  const onSubmit = (data: IEditorState) => {
    const { title } = data;
    dispatch(boardsSlice.actions.editBoard({ title, id }));
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
        {...register('title', { required: t('form.errors.noTitle') })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <Button type="submit" variant="contained" sx={{ width: '45%' }}>
        {t('actions.edit')}
      </Button>
    </Box>
  );
}

export default BoardEditor;
