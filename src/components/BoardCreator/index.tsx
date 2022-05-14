import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IModalForm } from '../../models/models';
import { useAppDispatch } from '../../hooks/redux';
import { boardsSlice } from '../../store/reducers/boardsSlice';

interface ICreatorState {
  name: string;
}

const initialState = {
  name: '',
};

function BoardCreator({ onCancel }: IModalForm) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreatorState>({
    defaultValues: initialState,
  });

  const onSubmit = (data: ICreatorState) => {
    const id = String(Date.now());
    dispatch(boardsSlice.actions.addBoard({ title: data.name, id }));
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
        Create board
      </Typography>
      <TextField
        label="name"
        variant="standard"
        sx={{ mb: 2, mt: 2 }}
        fullWidth
        {...register('name', { required: t('form.errors.noName') })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Button type="submit" variant="contained" sx={{ width: '45%' }}>
        Create
      </Button>
    </Box>
  );
}

export default BoardCreator;
