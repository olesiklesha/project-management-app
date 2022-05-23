import React from 'react';
import { Box, TextField, Typography, Button, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEditBoardMutation } from '../../services';

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
  const [editBoard, { isLoading }] = useEditBoardMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IEditorState>({
    defaultValues: {
      title,
    },
  });

  const onSubmit = async (data: IEditorState) => {
    const { title } = data;
    await editBoard({ title, id, description: '' });
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
      <Button
        type="submit"
        variant="contained"
        sx={{ width: '75%' }}
        startIcon={isLoading && <CircularProgress color="secondary" size={20} />}
      >
        {t('actions.edit')}
      </Button>
    </Box>
  );
}

export default BoardEditor;
