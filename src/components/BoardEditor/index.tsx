import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEditBoardMutation } from '../../services';

interface IEditorState {
  title: string;
  description: string;
}

interface IEditorProps {
  id: string;
  title: string;
  description: string;
  onCancel: () => void;
}

function BoardEditor({ onCancel, id, title, description }: IEditorProps) {
  const { t } = useTranslation();
  const [editBoard] = useEditBoardMutation();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<IEditorState>({
    defaultValues: {
      title,
      description,
    },
    reValidateMode: 'onChange',
  });

  const onSubmit = ({ title, description }: IEditorState) => {
    reset();
    onCancel();
    editBoard({ title, id, description: description ?? ' ' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} maxWidth={500}>
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
        {t('actions.edit')}
      </Button>
    </Box>
  );
}

export default BoardEditor;
