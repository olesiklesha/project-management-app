import { TextField, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import { boardSlice, IColumn } from '../../store/reducers/board';

interface IFormData {
  name: string;
}

function EditableHeader({ title, id, order, tasks }: IColumn) {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { name: title },
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: IFormData) => {
    const res = data.name !== '' ? data.name : title;
    setIsEditing(false);
    dispatch(boardSlice.actions.renameColumn({ id, order, title: res, tasks }));
    setValue('name', res);
    //request
  };

  return (
    <>
      {isEditing ? (
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          onBlur={handleSubmit(onSubmit)}
          sx={{ pt: '10px' }}
        >
          <TextField
            {...register('name')}
            type="text"
            defaultValue={title}
            size="small"
            inputProps={{
              style: {
                padding: '10px 10px',
                fontSize: '1.25rem',
                fontWeight: 'bold',
              },
            }}
            autoFocus
          />
        </Box>
      ) : (
        <Typography
          onClick={() => setIsEditing(true)}
          sx={{ p: '10px 10px', fontWeight: 'bold', fontSize: '1.25rem' }}
        >
          {title}
        </Typography>
      )}
    </>
  );
}

export default EditableHeader;
