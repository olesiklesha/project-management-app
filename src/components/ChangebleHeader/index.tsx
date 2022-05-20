import { TextField, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEditColumnMutation } from '../../services';
import { IColumn } from '../../store/reducers/board';

interface IFormData {
  name: string;
}

function EditableHeader({ title, id, order }: IColumn) {
  const [editColumn, {}] = useEditColumnMutation();
  const [isEditing, setIsEditing] = useState(false);
  const { id: idBoard } = useParams();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { name: title },
  });

  const onSubmit = async (data: IFormData) => {
    const res = data.name || title;
    setIsEditing(false);
    editColumn({
      boardId: String(idBoard),
      columnId: id,
      body: {
        title: res,
        order: order,
      },
    });
    setValue('name', res);
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
