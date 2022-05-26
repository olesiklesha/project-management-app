import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Modal } from '..';
import { useCreateColumnMutation } from '../../services';

interface IFormData {
  title: string;
}

interface ICreateColumn {
  isOpened: boolean;
  toggleIsOpened: () => void;
}

function ColumnCreator({ isOpened, toggleIsOpened }: ICreateColumn) {
  const { id: idBoard } = useParams();

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

  const [createColumn] = useCreateColumnMutation();

  const { t } = useTranslation();

  const onSubmit = ({ title }: IFormData) => {
    toggleIsOpened();
    reset();
    createColumn({
      id: idBoard ?? '',
      body: { title },
    });
  };

  return (
    <Modal isOpened={isOpened} onCancel={toggleIsOpened}>
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
          {t('pages.boardPage.addColumn')}
        </Typography>
        <TextField
          {...register('title', { required: t('form.errors.noTitle') })}
          type="text"
          placeholder={t('pages.boardPage.columnCreatorPlaceholder')}
          fullWidth
          inputProps={{
            style: {
              fontSize: '1.25rem',
              fontWeight: 'bold',
              width: '100%',
            },
          }}
          error={!!errors.title}
          helperText={errors.title?.message}
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
      </Box>
    </Modal>
  );
}

export default ColumnCreator;
