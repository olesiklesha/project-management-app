import { TextField, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IRormData {
  name: string;
}

function EditableHeader() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, settitle] = useState('My main Task');

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { name: title },
  });

  const onSubmit = async (data: IRormData) => {
    const res = data.name !== '' ? data.name : title;
    setIsEditing(false);
    settitle(res);
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
            inputProps={{
              style: {
                padding: '10px 10px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              },
            }}
            autoFocus
          />
        </Box>
      ) : (
        <Typography
          onClick={() => setIsEditing(true)}
          sx={{ p: '10px 10px', fontWeight: 'bold', fontSize: '1.5rem' }}
        >
          {title}
        </Typography>
      )}
    </>
  );
}

export default EditableHeader;
